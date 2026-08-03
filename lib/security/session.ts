import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function secretOrThrow(): string {
  const secret = process.env.HUB_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "HUB_SESSION_SECRET is not set — add a long random string to Vercel env vars."
    );
  }
  return secret;
}

export function makeSessionToken(): string {
  const secret = secretOrThrow();
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = String(expires);
  return `${payload}.${sign(payload, secret)}`;
}

function verifySessionToken(token: string): boolean {
  const secret = process.env.HUB_SESSION_SECRET;
  if (!secret) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload, secret);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expected);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;
  const expires = Number(payload);
  return Number.isFinite(expires) && expires > Date.now() / 1000;
}

export const HUB_COOKIE = "hub_auth";
export const HUB_COOKIE_MAX_AGE = MAX_AGE_SECONDS;

export async function hasHubSession(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(HUB_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
