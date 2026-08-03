import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { HUB_COOKIE } from "@/lib/security/session";

export async function POST() {
  const store = await cookies();
  store.delete(HUB_COOKIE);
  return NextResponse.json({ ok: true });
}
