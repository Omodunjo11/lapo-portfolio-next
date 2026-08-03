import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyPassword } from "@/lib/security/password";
import { HUB_COOKIE, HUB_COOKIE_MAX_AGE, makeSessionToken } from "@/lib/security/session";

export async function POST(req: NextRequest) {
  const hash = process.env.HUB_PASSWORD_HASH;
  if (!hash) {
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const password = body && typeof body.password === "string" ? body.password : "";
  if (!password || !verifyPassword(password, hash)) {
    return NextResponse.json({ error: "invalid_password" }, { status: 401 });
  }

  const store = await cookies();
  store.set(HUB_COOKIE, makeSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: HUB_COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
