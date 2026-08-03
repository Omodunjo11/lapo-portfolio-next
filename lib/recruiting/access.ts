import { auth, currentUser } from "@clerk/nextjs/server";

/** Only these personal inboxes may use the war room. */
const DEFAULT_ALLOWED = [
  "odunjoonaolapo@gmail.com",
];

/** Hard reject — Kinage / work / shared clerk identity leakage. */
const DENIED_DOMAINS = [
  "kinage.com",
  "kinage.ai",
  "kinage.io",
  "getkinage.com",
];

export function allowedEmails(): string[] {
  const fromEnv = process.env.RECRUITING_ALLOWED_EMAILS;
  if (!fromEnv?.trim()) return DEFAULT_ALLOWED;
  return fromEnv
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function emailDenied(email: string | null | undefined): boolean {
  if (!email) return true;
  const lower = email.toLowerCase();
  const domain = lower.split("@")[1] || "";
  if (DENIED_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) {
    return true;
  }
  return false;
}

export function emailAllowed(email: string | null | undefined) {
  if (!email) return false;
  const lower = email.toLowerCase();
  if (emailDenied(lower)) return false;
  return allowedEmails().includes(lower);
}

export async function requireRecruitingAccess() {
  const session = await auth();
  if (!session.userId) {
    return { ok: false as const, reason: "signed_out" as const };
  }
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;
  if (!emailAllowed(email)) {
    return { ok: false as const, reason: "not_allowlisted" as const, email };
  }
  return { ok: true as const, userId: session.userId, email };
}
