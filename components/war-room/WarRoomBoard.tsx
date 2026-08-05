"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import type { Company, FunnelStage, PipelineEvent } from "@/lib/recruiting/types";
import { EDITABLE_STAGES } from "@/lib/recruiting/types";
import type { Suggestion } from "@/lib/recruiting/board";
import { nextFunnelStage, prevFunnelStage } from "@/lib/recruiting/board";

type Col = { id: string; label: string };
type ChaseItem = {
  companyId: string;
  due: string;
  detail: string;
  draft?: string;
};

function briefHref(briefPath?: string | null) {
  if (!briefPath) return null;
  const slug = briefPath.split("/").pop()?.replace(/\.md$/i, "");
  return slug ? `/war-room/brief/${slug}` : null;
}

const CHASE_DRAFTS: Record<string, string> = {
  "soft-nudge": `Subject: Checking in, [Company]

[Name], circling back briefly. Still very interested in [role / next step]. Happy to work around the team's calendar whenever it's useful.

Thanks,
Lapo`,
  "schedule-confirm": `Subject: Next step, [Company]

[Name], thanks again for [call]. Wanted to confirm next steps: I understand it's [Round X with Y]. I'm flexible on timing, happy to take the next open slot on your calendar.

Looking forward to it.
Lapo`,
  "invisible-rounds": `Subject: Next round logistics

Kate / Derek, thanks for looping me in. Quick clarifying ask so I can prep well: roughly how many rounds remain, and what type should I expect (product, technical, panel, etc.)?

Appreciate it,
Lapo`,
};

type EditableFields = Pick<
  Company,
  "stage" | "stageLabel" | "nextAction" | "due" | "nudgeDate"
>;

const FUNNEL: FunnelStage[] = [
  "applied",
  "first",
  "second",
  "third",
  "fourth",
  "final",
];

function CompanyCard({
  c,
  pending,
  onMove,
  driveRootUrl,
}: {
  c: Company;
  pending: boolean;
  onMove: (companyId: string, stage: FunnelStage) => void;
  driveRootUrl?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<EditableFields>({
    stage: c.stage,
    stageLabel: c.stageLabel || "",
    nextAction: c.nextAction,
    due: c.due,
    nudgeDate: c.nudgeDate || "",
  });

  const prev = prevFunnelStage(c.stage);
  const next = nextFunnelStage(c.stage);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/war-room/pipeline", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: c.id,
          patch: { ...fields, nudgeDate: fields.nudgeDate || null },
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "save_failed");
      setSaved(true);
      setEditing(false);
      if (fields.stage !== c.stage) {
        onMove(c.id, fields.stage);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article
      className={`wr-card pri-${c.priority}`}
      draggable={!editing}
      onDragStart={(e) => {
        if (editing) return;
        e.dataTransfer.setData("text/companyId", c.id);
      }}
    >
      <header>
        <h3>{c.name}</h3>
        <em className={`wr-ball ${c.ball}`}>{c.ball}</em>
      </header>
      <p className="wr-role">{c.role}</p>
      <p className="wr-stage">{c.stageLabel || c.stage}</p>
      <p className="wr-next">{c.nextAction}</p>
      {c.paths?.journal ? (
        <p className="wr-journal">📓 {c.paths.journal}</p>
      ) : null}

      <div className="wr-move">
        <button
          type="button"
          disabled={!prev || pending || editing}
          onClick={() => prev && onMove(c.id, prev)}
          title="Move left"
        >
          ←
        </button>
        <select
          value={FUNNEL.includes(c.stage) ? c.stage : c.stage}
          disabled={pending || editing}
          onChange={(e) => onMove(c.id, e.target.value as FunnelStage)}
          aria-label={`Stage for ${c.name}`}
        >
          {EDITABLE_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={!next || pending || editing}
          onClick={() => next && onMove(c.id, next)}
          title="Move right"
        >
          →
        </button>
      </div>

      <div className="wr-card-actions">
        {c.drive?.folderUrl ? (
          <a href={c.drive.folderUrl} target="_blank" rel="noopener noreferrer">
            Drive folder
          </a>
        ) : driveRootUrl ? (
          <a href={driveRootUrl} target="_blank" rel="noopener noreferrer">
            Drive root
          </a>
        ) : null}
        {c.drive?.prepUrl ? (
          <a href={c.drive.prepUrl} target="_blank" rel="noopener noreferrer">
            Prep deck
          </a>
        ) : null}
        {!c.drive?.folderUrl && !c.drive?.prepUrl && !driveRootUrl ? (
          <span className="wr-muted">
            {c.drive?.note || "Add Drive link in pipeline"}
          </span>
        ) : null}
        <button
          type="button"
          className="wr-edit-toggle"
          onClick={() => {
            setEditing((v) => !v);
            setSaved(false);
          }}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {saved && !editing ? (
        <p className="wr-saved">Saved — rebuilding, refresh in ~30-60s</p>
      ) : null}

      {editing ? (
        <div className="wr-edit-form">
          <label>
            Stage
            <select
              value={fields.stage}
              onChange={(e) =>
                setFields((f) => ({
                  ...f,
                  stage: e.target.value as Company["stage"],
                }))
              }
            >
              {EDITABLE_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Stage label
            <input
              value={fields.stageLabel}
              onChange={(e) =>
                setFields((f) => ({ ...f, stageLabel: e.target.value }))
              }
            />
          </label>
          <label>
            Next action
            <input
              value={fields.nextAction}
              onChange={(e) =>
                setFields((f) => ({ ...f, nextAction: e.target.value }))
              }
            />
          </label>
          <label>
            Due
            <input
              type="date"
              value={fields.due}
              onChange={(e) =>
                setFields((f) => ({ ...f, due: e.target.value }))
              }
            />
          </label>
          <label>
            Nudge date
            <input
              type="date"
              value={fields.nudgeDate || ""}
              onChange={(e) =>
                setFields((f) => ({ ...f, nudgeDate: e.target.value }))
              }
            />
          </label>
          {error ? <p className="wr-error">{error}</p> : null}
          <button type="button" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      ) : null}
    </article>
  );
}

export default function WarRoomBoard({
  columns,
  initialCompanies,
  upcoming,
  chase = [],
  archived: initialArchived,
  today,
  initialSuggestions,
  gmailReady = false,
  lastScanAt = null,
  recentEvents = [],
  driveRootUrl,
}: {
  columns: Col[];
  initialCompanies: Company[];
  upcoming: PipelineEvent[];
  chase?: ChaseItem[];
  archived: Company[];
  today: string;
  initialSuggestions: Suggestion[];
  gmailReady?: boolean;
  lastScanAt?: string | null;
  recentEvents?: PipelineEvent[];
  driveRootUrl?: string;
}) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [pending, startTransition] = useTransition();
  const [scanning, setScanning] = useState(false);
  const [scanNote, setScanNote] = useState<string | null>(
    lastScanAt
      ? `Last inbox scan ${new Date(lastScanAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}`
      : null
  );
  const [error, setError] = useState<string | null>(null);
  const [debriefFor, setDebriefFor] = useState<PipelineEvent | null>(null);
  const [debriefSaving, setDebriefSaving] = useState(false);
  const [debriefNote, setDebriefNote] = useState<string | null>(null);
  const [draftOpen, setDraftOpen] = useState<string | null>(null);
  const [debriefForm, setDebriefForm] = useState({
    energy: "4",
    theirPull: "3",
    stageOutcome: "advancing",
    whatTheyCareAbout: "",
    landed: "",
    fix: "",
    nextStep: "",
    timeline: "",
    peopleMentioned: "",
    loopNext: "",
    loopUnknown: "",
    prepNext: "",
  });

  const activeCompanies = useMemo(
    () =>
      [...companies]
        .filter((c) => !["passed", "rejected", "ghosted", "accepted"].includes(c.stage))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [companies]
  );
  const [notesCompanyId, setNotesCompanyId] = useState(
    () =>
      upcoming[0]?.companyId ||
      initialCompanies.find((c) => c.priority === "P0")?.id ||
      initialCompanies[0]?.id ||
      ""
  );
  const [prepNotes, setPrepNotes] = useState("");
  const [notesLog, setNotesLog] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesUpdating, setNotesUpdating] = useState(false);
  const [notesStatus, setNotesStatus] = useState<string | null>(null);

  const chaseSorted = useMemo(
    () => [...chase].sort((a, b) => a.due.localeCompare(b.due)),
    [chase]
  );
  const chaseDueToday = useMemo(
    () => chaseSorted.filter((item) => item.due <= today),
    [chaseSorted, today]
  );
  const chaseLater = useMemo(
    () => chaseSorted.filter((item) => item.due > today),
    [chaseSorted, today]
  );
  const doneRecent = useMemo(
    () => recentEvents.filter((e) => e.status === "done").slice(0, 5),
    [recentEvents]
  );
  const laterCount = chaseLater.length + doneRecent.length;

  useEffect(() => {
    if (!notesCompanyId) return;
    let cancelled = false;
    setNotesLoading(true);
    setNotesStatus(null);
    setPrepNotes("");
    void fetch(
      `/api/war-room/prep-notes?companyId=${encodeURIComponent(notesCompanyId)}`
    )
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "load_failed");
        if (!cancelled) {
          setNotesLog(typeof data.notes === "string" ? data.notes : "");
        }
      })
      .catch((e) => {
        if (!cancelled) setNotesStatus((e as Error).message);
      })
      .finally(() => {
        if (!cancelled) setNotesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [notesCompanyId]);

  async function savePrepNotesOnly() {
    if (!notesCompanyId || !prepNotes.trim()) return;
    setNotesSaving(true);
    setNotesStatus(null);
    try {
      const res = await fetch("/api/war-room/prep-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: notesCompanyId,
          notes: prepNotes,
          mode: "append",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "save_failed");
      setNotesLog(typeof data.notes === "string" ? data.notes : "");
      setPrepNotes("");
      setNotesStatus(
        data.persisted === false
          ? `Feedback added (local)${data.warn ? ` (${data.warn})` : ""}`
          : "Feedback added. Prior notes kept."
      );
    } catch (e) {
      setNotesStatus((e as Error).message);
    } finally {
      setNotesSaving(false);
    }
  }

  async function updateNextRoundDoc() {
    if (!notesCompanyId) return;
    if (!prepNotes.trim() && !notesLog.trim()) return;
    setNotesUpdating(true);
    setNotesStatus(null);
    try {
      let fullLog = notesLog;
      if (prepNotes.trim()) {
        const saveRes = await fetch("/api/war-room/prep-notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: notesCompanyId,
            notes: prepNotes,
            mode: "append",
          }),
        });
        const saveData = await saveRes.json();
        if (!saveRes.ok) {
          throw new Error(saveData.detail || saveData.error || "save_failed");
        }
        fullLog =
          typeof saveData.notes === "string" ? saveData.notes : notesLog;
        setNotesLog(fullLog);
        setPrepNotes("");
      }

      const co = companies.find((c) => c.id === notesCompanyId);
      const upcomingForCo = upcoming.find(
        (e) => e.companyId === notesCompanyId
      );
      const prepRes = await fetch("/api/war-room/prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: notesCompanyId,
          // Full accumulated log — regen keeps history and refreshes next-step tab
          userUpdate: fullLog,
          subject: upcomingForCo
            ? `Next: ${upcomingForCo.with || "round"} @ ${co?.name || notesCompanyId}`
            : `Next-round prep notes for ${co?.name || notesCompanyId}`,
          snippet: fullLog.slice(0, 1500),
          from: "war-room@notes",
          force: true,
        }),
      });
      const prep = await prepRes.json();
      if (!prepRes.ok) {
        throw new Error(prep.detail || prep.error || "prep_failed");
      }

      try {
        await fetch("/api/war-room/drive-sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId: notesCompanyId,
            persist: false,
          }),
        });
      } catch {
        /* optional */
      }

      setNotesStatus(
        `Next-step prep refreshed from all feedback${
          prep.claudeDecks ? " (Claude)" : ""
        }. Prior notes kept.`
      );
    } catch (e) {
      setNotesStatus((e as Error).message);
    } finally {
      setNotesUpdating(false);
    }
  }

  const byStage = useMemo(() => {
    const map: Record<string, Company[]> = {};
    for (const col of columns) map[col.id] = [];
    for (const c of companies) {
      if (c.stage === "passed" || c.stage === "ghosted") continue;
      if (c.stage === "offered") map.final?.push(c);
      else if (map[c.stage]) map[c.stage].push(c);
    }
    return map;
  }, [companies, columns]);

  const archived = useMemo(
    () =>
      companies.filter(
        (c) => c.stage === "passed" || c.stage === "ghosted"
      ),
    [companies]
  );

  const nameOf = (id: string) =>
    companies.find((c) => c.id === id)?.name || id;

  async function post(body: Record<string, unknown>) {
    setError(null);
    const res = await fetch("/api/war-room", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const detail =
        typeof data.detail === "string"
          ? data.detail
          : typeof data.error === "string"
            ? data.error
            : "Request failed";
      setError(detail);
      return false;
    }
    if (data.pipeline?.companies) setCompanies(data.pipeline.companies);
    if (data.suggestions) setSuggestions(data.suggestions);
    return true;
  }

  function move(companyId: string, stage: FunnelStage) {
    // Optimistic UI
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId
          ? { ...c, stage, stageLabel: stage }
          : c
      )
    );
    startTransition(() => {
      void post({ action: "move", companyId, stage });
    });
  }

  function accept(id: string) {
    const sug = suggestions.find((s) => s.id === id);
    const prior = sug
      ? companies.find((c) => c.id === sug.companyId)
      : undefined;
    // Optimistic: drop flag + move card immediately
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    if (sug) {
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === sug.companyId
            ? {
                ...c,
                stage: sug.toStage,
                stageLabel: `${sug.toStage} (accepted flag)`,
              }
            : c
        )
      );
    }
    startTransition(() => {
      void post({
        action: "accept_suggestion",
        id,
        companyId: sug?.companyId,
        toStage: sug?.toStage,
        key: sug?.key,
      }).then((ok) => {
        if (!ok && sug) {
          setSuggestions((prev) =>
            prev.some((s) => s.id === id) ? prev : [...prev, sug]
          );
          if (prior) {
            setCompanies((prev) =>
              prev.map((c) => (c.id === prior.id ? prior : c))
            );
          }
        }
      });
    });
  }

  function dismiss(id: string) {
    const sug = suggestions.find((s) => s.id === id);
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => {
      void post({ action: "dismiss_suggestion", id, key: sug?.key });
    });
  }

  async function scanGmail() {
    setScanning(true);
    setError(null);
    try {
      const res = await fetch("/api/war-room/gmail/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ applyCalendar: true, persist: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || data.error || "scan_failed");
      }

      let claudeN = 0;
      const advances = (data.proposals || []).filter(
        (p: { signal?: string; source?: string; companyId?: string }) =>
          p.signal === "advance" && p.source === "gmail" && p.companyId
      ) as {
        companyId: string;
        subject?: string;
        snippet?: string;
        from?: string;
      }[];
      const seen = new Set<string>();
      for (const p of advances) {
        if (seen.has(p.companyId) || seen.size >= 2) continue;
        seen.add(p.companyId);
        try {
          const prepRes = await fetch("/api/war-room/prep", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              companyId: p.companyId,
              subject: p.subject || "",
              snippet: p.snippet || "",
              from: p.from || "",
              persist: true,
            }),
          });
          const prep = await prepRes.json();
          if (prepRes.ok && (prep.claudeDecks || 0) > 0) claudeN += 1;
        } catch {
          /* prep is best-effort after scan */
        }
      }

      setScanNote(
        `Scanned · ${data.gmailMatched ?? 0} mail · ${data.calendarMatched ?? 0} cal · ${data.proposals?.length ?? 0} signals` +
          (data.spamMatched
            ? ` · ${data.spamMatched} in Spam`
            : "") +
          (data.appliedCalendar
            ? ` · ${data.appliedCalendar} calendar fact(s) saved`
            : "") +
          (claudeN ? ` · Claude prep ×${claudeN}` : "")
      );
      if (Array.isArray(data.flags)) {
        const inboxFlags: Suggestion[] = data.flags.map(
          (f: {
            id: string;
            companyId: string;
            fromStage: FunnelStage;
            toStage: FunnelStage;
            reason: string;
            key?: string;
          }) => ({
            id: f.id,
            companyId: f.companyId,
            fromStage: f.fromStage,
            toStage: f.toStage,
            reason: f.reason,
            status: "pending" as const,
            key: f.key,
          })
        );
        setSuggestions((prev) => {
          const keep = prev.filter((s) => !s.id.startsWith("inbox-"));
          // Server already dedupes by company; belt-and-suspenders on the client.
          const seenCompany = new Set(keep.map((s) => s.companyId));
          const next: Suggestion[] = [...keep];
          for (const f of inboxFlags) {
            if (seenCompany.has(f.companyId)) continue;
            seenCompany.add(f.companyId);
            next.push(f);
          }
          return next;
        });
      }
      if (data.appliedCalendar > 0) {
        setScanNote((n) => `${n || ""} · refresh in ~30–60s for calendar facts`);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setScanning(false);
    }
  }

  async function submitDebrief() {
    if (!debriefFor) return;
    setDebriefSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/war-room/debrief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventId: debriefFor.id,
          companyId: debriefFor.companyId,
          energy: Number(debriefForm.energy) || undefined,
          theirPull: Number(debriefForm.theirPull) || undefined,
          stageOutcome: debriefForm.stageOutcome,
          whatTheyCareAbout: debriefForm.whatTheyCareAbout,
          landed: debriefForm.landed,
          fix: debriefForm.fix,
          nextStep: debriefForm.nextStep,
          timeline: debriefForm.timeline,
          peopleMentioned: debriefForm.peopleMentioned,
          loopNext: debriefForm.loopNext,
          loopUnknown: debriefForm.loopUnknown,
          prepNext: debriefForm.prepNext,
          markEventDone: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "debrief_failed");
      if (data.pipeline?.companies) setCompanies(data.pipeline.companies);
      setDebriefNote(
        `Debrief saved${data.debriefPath ? ` → ${data.debriefPath}` : ""}. Refresh in ~30–60s.`
      );
      setDebriefFor(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDebriefSaving(false);
    }
  }

  return (
    <div className="wr-grid">
      <section className="wr-panel wr-today">
        <div className="wr-board-head">
          <h2>Today</h2>
          <button
            type="button"
            className="wr-btn"
            disabled={!gmailReady || scanning || pending}
            onClick={() => void scanGmail()}
            title={
              gmailReady
                ? "Scan Gmail and Calendar now"
                : "Add Google OAuth env vars on Vercel"
            }
          >
            {scanning ? "Scanning…" : "Scan inbox"}
          </button>
        </div>
        {scanNote ? <p className="wr-muted wr-today-meta">{scanNote}</p> : null}
        {!gmailReady ? (
          <p className="wr-error">
            Gmail not configured — set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
            GOOGLE_REFRESH_TOKEN on Vercel.
          </p>
        ) : null}
        {debriefNote ? <p className="wr-saved">{debriefNote}</p> : null}

        {suggestions.length > 0 ? (
          <ul className="wr-flag-list wr-today-flags">
            {suggestions.map((s) => (
              <li key={s.id}>
                <div>
                  <strong>{nameOf(s.companyId)}</strong>
                  <span>
                    {s.fromStage} → {s.toStage}: {s.reason}
                  </span>
                </div>
                <div className="wr-flag-actions">
                  <button
                    type="button"
                    className="wr-btn"
                    disabled={pending}
                    onClick={() => accept(s.id)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="wr-btn wr-btn-ghost"
                    disabled={pending}
                    onClick={() => dismiss(s.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="wr-upcoming">
          {upcoming.length === 0 && chaseDueToday.length === 0 ? (
            <li className="wr-muted">Nothing scheduled or due today</li>
          ) : null}
          {upcoming.map((e) => {
            const co = companies.find((c) => c.id === e.companyId);
            const href = briefHref(e.briefPath);
            return (
              <li key={e.id}>
                <strong>{co?.name || e.companyId}</strong>
                <span>
                  {new Date(e.start).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {e.with ? ` · ${e.with}` : ""}
                </span>
                <div className="wr-card-actions">
                  {href ? (
                    <Link href={href}>Brief</Link>
                  ) : (
                    <span className="wr-muted">No brief</span>
                  )}
                  <button
                    type="button"
                    className="wr-edit-toggle"
                    onClick={() => setDebriefFor(e)}
                  >
                    Debrief
                  </button>
                </div>
              </li>
            );
          })}
          {chaseDueToday.map((item) => {
            const draftKey = `${item.companyId}-${item.due}`;
            return (
              <li key={draftKey} className="wr-today-chase">
                <strong>{nameOf(item.companyId)}</strong>
                <span>{item.detail}</span>
                <div className="wr-card-actions">
                  <button
                    type="button"
                    className="wr-edit-toggle"
                    onClick={() =>
                      setDraftOpen((cur) => (cur === draftKey ? null : draftKey))
                    }
                  >
                    Draft
                  </button>
                </div>
                {draftOpen === draftKey ? (
                  <pre className="wr-chase-draft">
                    {CHASE_DRAFTS[item.draft || "soft-nudge"] ||
                      CHASE_DRAFTS["soft-nudge"]}
                  </pre>
                ) : null}
              </li>
            );
          })}
        </ul>

        {laterCount > 0 ? (
          <details className="wr-later">
            <summary>
              Later ({laterCount}) — upcoming nudges
              {doneRecent.length ? ` · recent calls` : ""}
            </summary>
            {chaseLater.length > 0 ? (
              <ul className="wr-flag-list">
                {chaseLater.map((item) => {
                  const draftKey = `${item.companyId}-${item.due}`;
                  return (
                    <li key={draftKey}>
                      <div>
                        <strong>{nameOf(item.companyId)}</strong>
                        <span>
                          By {item.due} — {item.detail}
                        </span>
                      </div>
                      <div className="wr-flag-actions">
                        <button
                          type="button"
                          className="wr-btn wr-btn-ghost"
                          onClick={() =>
                            setDraftOpen((cur) =>
                              cur === draftKey ? null : draftKey
                            )
                          }
                        >
                          Draft
                        </button>
                      </div>
                      {draftOpen === draftKey ? (
                        <pre className="wr-chase-draft">
                          {CHASE_DRAFTS[item.draft || "soft-nudge"] ||
                            CHASE_DRAFTS["soft-nudge"]}
                        </pre>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : null}
            {doneRecent.length > 0 ? (
              <ul className="wr-upcoming" style={{ marginTop: 10 }}>
                {doneRecent.map((e) => {
                  const co = companies.find((c) => c.id === e.companyId);
                  return (
                    <li key={e.id}>
                      <strong>{co?.name || e.companyId}</strong>
                      <span>
                        {e.title}
                        {e.start ? ` · ${e.start.slice(0, 10)}` : ""}
                      </span>
                      <div className="wr-card-actions">
                        <button
                          type="button"
                          className="wr-edit-toggle"
                          onClick={() => setDebriefFor(e)}
                        >
                          Debrief
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </details>
        ) : null}
      </section>

      <section className="wr-panel wr-prep-notes">
        <h2>Next-round notes</h2>
        <p className="wr-muted">
          Add new feedback here. Saving appends it. Updating the doc keeps all
          old feedback and refreshes only the next-step prep section so it uses
          everything so far.
        </p>
        <div className="wr-edit-form wr-prep-notes-form">
          <label>
            Company
            <select
              value={notesCompanyId}
              onChange={(e) => setNotesCompanyId(e.target.value)}
            >
              {activeCompanies.length === 0 ? (
                <option value="">No active companies</option>
              ) : null}
              {activeCompanies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.stageLabel || c.stage})
                </option>
              ))}
            </select>
          </label>
          <label>
            New feedback to add
            <textarea
              rows={6}
              value={prepNotes}
              disabled={notesLoading || !notesCompanyId}
              placeholder={
                notesLoading
                  ? "Loading…"
                  : "New signal only. Ex: Sahil email says COO deep-dive on enterprise delivery. Keep Kinage cost-to-serve ready."
              }
              onChange={(e) => setPrepNotes(e.target.value)}
            />
          </label>
          {notesLog.trim() ? (
            <details className="wr-prep-notes-log">
              <summary>Accumulated feedback (kept on every update)</summary>
              <pre>{notesLog}</pre>
            </details>
          ) : (
            <p className="wr-muted">No saved feedback yet for this company.</p>
          )}
          <div className="wr-prep-notes-actions">
            <button
              type="button"
              className="wr-btn wr-btn-ghost"
              disabled={
                notesSaving ||
                notesUpdating ||
                notesLoading ||
                !notesCompanyId ||
                !prepNotes.trim()
              }
              onClick={() => void savePrepNotesOnly()}
            >
              {notesSaving ? "Saving…" : "Add feedback"}
            </button>
            <button
              type="button"
              className="wr-btn"
              disabled={
                notesSaving ||
                notesUpdating ||
                notesLoading ||
                !notesCompanyId ||
                (!prepNotes.trim() && !notesLog.trim())
              }
              onClick={() => void updateNextRoundDoc()}
            >
              {notesUpdating ? "Updating doc…" : "Update next-step prep"}
            </button>
          </div>
          {notesStatus ? <p className="wr-saved">{notesStatus}</p> : null}
        </div>
      </section>

      {debriefFor ? (
        <section className="wr-panel wr-debrief">
          <div className="wr-board-head">
            <h2>
              Debrief — {nameOf(debriefFor.companyId)}
            </h2>
            <button
              type="button"
              className="wr-btn-ghost"
              onClick={() => setDebriefFor(null)}
            >
              Cancel
            </button>
          </div>
          <p className="wr-muted" style={{ marginBottom: 12 }}>
            Captures loop updates and marks the event done. Commits to the repo.
          </p>
          <div className="wr-edit-form">
            <label>
              Your energy
              <select
                value={debriefForm.energy}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, energy: e.target.value }))
                }
              >
                {["1", "2", "3", "4", "5"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Their excitement (to advance you)
              <select
                value={debriefForm.theirPull}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, theirPull: e.target.value }))
                }
              >
                {["1", "2", "3", "4", "5"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Stage outcome
              <select
                value={debriefForm.stageOutcome}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, stageOutcome: e.target.value }))
                }
              >
                <option value="advancing">advancing</option>
                <option value="unclear">unclear</option>
                <option value="pass signal">pass signal</option>
                <option value="ghost risk">ghost risk</option>
              </select>
            </label>
            <label>
              What they cared about
              <input
                value={debriefForm.whatTheyCareAbout}
                onChange={(e) =>
                  setDebriefForm((f) => ({
                    ...f,
                    whatTheyCareAbout: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              What landed
              <input
                value={debriefForm.landed}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, landed: e.target.value }))
                }
              />
            </label>
            <label>
              What to fix
              <input
                value={debriefForm.fix}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, fix: e.target.value }))
                }
              />
            </label>
            <label>
              Next step
              <input
                value={debriefForm.nextStep}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, nextStep: e.target.value }))
                }
              />
            </label>
            <label>
              Loop — confirmed next round
              <input
                value={debriefForm.loopNext}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, loopNext: e.target.value }))
                }
                placeholder="Who / format / what they test"
              />
            </label>
            <label>
              Loop — still unknown
              <input
                value={debriefForm.loopUnknown}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, loopUnknown: e.target.value }))
                }
              />
            </label>
            <label>
              Prep to start now for next round
              <input
                value={debriefForm.prepNext}
                onChange={(e) =>
                  setDebriefForm((f) => ({ ...f, prepNext: e.target.value }))
                }
              />
            </label>
            <button
              type="button"
              className="wr-btn"
              disabled={debriefSaving}
              onClick={() => void submitDebrief()}
            >
              {debriefSaving ? "Saving…" : "Save debrief"}
            </button>
          </div>
        </section>
      ) : null}

      <section className="wr-panel wr-board">
        <div className="wr-board-head">
          <h2>Pipeline</h2>
          <span className="wr-muted">
            Drag, ← →, or dropdown {pending ? "· saving…" : ""}
          </span>
        </div>
        {error && <p className="wr-error">{error}</p>}
        <div className="wr-columns">
          {columns.map((col) => (
            <div
              key={col.id}
              className="wr-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const companyId = e.dataTransfer.getData("text/companyId");
                if (companyId) move(companyId, col.id as FunnelStage);
              }}
            >
              <div className="wr-col-head">
                {col.label}
                <span>{byStage[col.id]?.length ?? 0}</span>
              </div>
              <div className="wr-col-body">
                {(byStage[col.id] || []).map((c) => (
                  <CompanyCard
                    key={c.id}
                    c={c}
                    pending={pending}
                    onMove={move}
                    driveRootUrl={driveRootUrl}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {(archived.length > 0 || initialArchived.length > 0) ? (
        <details className="wr-panel wr-archive">
          <summary>Archived ({archived.length})</summary>
          <div className="wr-col-body">
            {archived.map((c) => (
              <CompanyCard
                key={c.id}
                c={c}
                pending={pending}
                onMove={move}
                driveRootUrl={driveRootUrl}
              />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
