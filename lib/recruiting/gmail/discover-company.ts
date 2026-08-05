import type { Company, Pipeline } from "../types";
import type { IngestProposal } from "./classify";

const NOISE_NAMES = new Set(
  [
    "me",
    "you",
    "us",
    "them",
    "the team",
    "our team",
    "hiring manager",
    "recruiter",
    "unknown sender",
    "calendar",
    "google meet",
    "zoom",
    "teams",
  ].map((s) => s.toLowerCase())
);

const PERSON_TITLE_RE =
  /\b(coo|cto|ceo|cfo|vp|vice president|head of|director|manager|partner|recruiter|talent|people)\b/i;

function cleanName(raw: string): string | null {
  let name = (raw || "")
    .replace(/\s+/g, " ")
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .replace(/\s*[–—-]\s*(video|phone|zoom|google meet|interview).*$/i, "")
    .trim();
  if (!name || name.length < 2 || name.length > 60) return null;
  if (NOISE_NAMES.has(name.toLowerCase())) return null;
  // Reject bare first names / "First Last" with a job title suffix.
  if (PERSON_TITLE_RE.test(name) && /,/.test(name)) return null;
  if (/^(?:mr|ms|mrs|dr)\.?\s/i.test(name)) return null;
  return name;
}

/**
 * Pull a company name from calendar / invite subjects such as:
 * - "Interview with Northslope"
 * - "Invitation: Video Interview with Sahil | Regal @ Fri …"
 * - "Your video interview is confirmed with Regal!"
 */
export function extractCompanyNameFromInterviewTitle(
  text: string
): string | null {
  const s = (text || "").replace(/\s+/g, " ").trim();
  if (!s) return null;

  // Prefer explicit company after a pipe (common Google Calendar invite shape).
  const pipe = s.match(
    /\|\s*([^@|]+?)\s*(?:@|\(|$)/i
  );
  if (pipe) {
    const fromPipe = cleanName(pipe[1]);
    if (fromPipe) return fromPipe;
  }

  const confirmed = s.match(
    /\b(?:video\s+)?interview\s+is\s+confirmed\s+with\s+([^!.\n]+)/i
  );
  if (confirmed) {
    const n = cleanName(confirmed[1]);
    if (n) return n;
  }

  const withM = s.match(
    /\b(?:video\s+|phone\s+|zoom\s+)?interview\s+with\s+([^@|–—\n(]+?)(?:\s*[@|–—]|\s*\(|\s*$|\s*!)/i
  );
  if (withM) {
    const candidate = cleanName(withM[1]);
    if (candidate && !PERSON_TITLE_RE.test(candidate)) return candidate;
    // "Interview with Sahil Mehta, COO | Company @ …" — pipe already tried;
    // if we only got a person, bail.
  }

  return null;
}

export function looksLikeInterviewTitle(text: string): boolean {
  const s = text || "";
  return (
    /\binterview\b/i.test(s) ||
    /\binvitation\s*:/i.test(s) ||
    /\bcalendly\b/i.test(s) ||
    /\bphone screen\b/i.test(s)
  );
}

export function companySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function findCompanyByName(pipeline: Pipeline, name: string): Company | null {
  const needle = name.toLowerCase().trim();
  for (const c of pipeline.companies) {
    if (c.name.toLowerCase() === needle) return c;
    if ((c.aliases || []).some((a) => String(a).toLowerCase() === needle)) {
      return c;
    }
  }
  return null;
}

function domainFromFrom(from?: string | null): string | null {
  const m = (from || "").match(/@([a-z0-9.-]+\.[a-z]{2,})/i);
  if (!m) return null;
  const host = m[1].toLowerCase();
  if (
    /gmail\.com|google\.com|linkedin\.com|calendly\.com|outlook\.com|yahoo\.com|icloud\.com/.test(
      host
    )
  ) {
    return null;
  }
  return host;
}

function longerBrandName(proposals: IngestProposal[], shortName: string): string {
  const needle = shortName.toLowerCase();
  for (const p of proposals) {
    const blob = `${p.subject || ""} ${p.summary || ""} ${p.snippet || ""}`;
    const m = blob.match(
      new RegExp(`\\b(${shortName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s+Technologies|\\s+Tech|\\s+Inc\\.?|\\s+Labs?)?)\\b`, "i")
    );
    if (m && m[1].length > shortName.length) return m[1].trim();
    // e.g. "opportunity at Northslope Technologies"
    const at = blob.match(
      new RegExp(
        `\\bat\\s+(${shortName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\\n.!|]{0,40})`,
        "i"
      )
    );
    if (at) {
      const cleaned = cleanName(at[1].split(/[-–—|]/)[0] || "");
      if (cleaned && cleaned.toLowerCase().includes(needle) && cleaned.length > shortName.length) {
        return cleaned;
      }
    }
  }
  return shortName;
}

/**
 * Create pipeline companies for high-confidence untracked interview
 * proposals/calendar events. Updates proposals in place with companyId.
 */
export function ensureDiscoveredCompanies(
  pipeline: Pipeline,
  proposals: IngestProposal[]
): { pipeline: Pipeline; added: Company[] } {
  const data: Pipeline = {
    ...pipeline,
    companies: [...pipeline.companies],
    events: pipeline.events.map((e) => ({ ...e })),
    chase: (pipeline.chase || []).map((c) => ({ ...c })),
    focus: (pipeline.focus || []).map((f) => ({ ...f })),
  };
  const added: Company[] = [];

  for (const p of proposals) {
    if (p.companyId) continue;
    if (p.signal === "noise" || p.signal === "reject") continue;
    const rawName = (p.companyName || "").trim();
    if (!rawName || rawName === "noise") continue;

    // Only auto-add from clear interview/scheduling signals.
    if (p.signal !== "schedule" && p.signal !== "advance" && p.signal !== "wait") {
      continue;
    }
    const title = p.subject || p.summary || "";
    if (!looksLikeInterviewTitle(title) && p.source !== "calendar") continue;

    const name = longerBrandName(proposals, rawName);
    let company = findCompanyByName(data, name) || findCompanyByName(data, rawName);
    if (!company) {
      let id = companySlug(name) || `company-${Date.now()}`;
      if (data.companies.some((c) => c.id === id)) {
        id = `${id}-${String(p.id).slice(0, 6)}`;
      }
      const domain = domainFromFrom(p.from);
      const aliases = Array.from(
        new Set([name, rawName, domain].filter(Boolean) as string[])
      );
      const due =
        (p.start || "").slice(0, 10) ||
        // Gmail invite subjects often embed "@ Thu Aug 6, 2026"
        "";
      company = {
        id,
        name,
        role: "",
        stage: p.signal === "schedule" || p.source === "calendar" ? "first" : "applied",
        ball: "you",
        priority: "P0",
        nextAction:
          p.signal === "schedule" || p.source === "calendar"
            ? `Attend: ${title.replace(/^Invitation from an unknown sender:\s*/i, "").replace(/\s*\([^)]*@[^)]*\)\s*$/, "").trim() || `${name} interview`}`
            : `Review: ${title || name}`,
        due,
        aliases,
      };
      data.companies.push(company);
      added.push(company);
    } else {
      // Enrich aliases if we already had a stub.
      const domain = domainFromFrom(p.from);
      const nextAliases = new Set(company.aliases || [company.name]);
      nextAliases.add(name);
      nextAliases.add(rawName);
      if (domain) nextAliases.add(domain);
      company.aliases = Array.from(nextAliases);
    }

    p.companyId = company.id;
    p.companyName = company.name;
  }

  if (added.length > 0) {
    data.updated = new Date().toISOString().slice(0, 10);
  }

  return { pipeline: data, added };
}
