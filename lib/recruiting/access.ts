import { auth } from "@clerk/nextjs/server";

const DEFAULT_ALLOWED = [
  "odunjoonaolapo@gmail.com",
  "onaolapomichaelodunjo@gmail.com",
];

export function allowedEmails(): string[] {
  const fromEnv = process.env.RECRUITING_ALLOWED_EMAILS;
  if (!fromEnv) return DEFAULT_ALLOWED;
  return fromEnv.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export async function requireRecruitingAccess() {
  const session = await auth();
  if (!session.userId) {
    return { ok: false as const, reason: "signed_out" as const };
  }
  // Email check happens in the page via currentUser for richer error
  return { ok: true as const, userId: session.userId };
}

export function emailAllowed(email: string | null | undefined) {
  if (!email) return false;
  return allowedEmails().includes(email.toLowerCase());
}
