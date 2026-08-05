import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { gmailConfigured } from "@/lib/recruiting/gmail/client";
import { sendPlainEmail } from "@/lib/recruiting/gmail/send";
import { buildDigest, formatDigestEmail } from "@/lib/recruiting/digest";
import { loadWritablePipeline } from "@/lib/recruiting/pipeline";

export const runtime = "nodejs";
export const maxDuration = 30;

/** Personal recruiting War Room, single-user tool: always sends here. */
const DIGEST_RECIPIENT = "odunjoonaolapo@gmail.com";

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

async function runDigest() {
  if (!gmailConfigured()) {
    return {
      error: NextResponse.json(
        {
          error: "gmail_not_configured",
          detail:
            "Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN on Vercel",
        },
        { status: 503 }
      ),
    };
  }

  const pipeline = await loadWritablePipeline();
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: pipeline.timezone || "America/New_York",
  }).format(new Date());

  const data = buildDigest(pipeline, today, Date.now());
  const { subject, text } = formatDigestEmail(
    data,
    pipeline.timezone || "America/New_York"
  );

  try {
    await sendPlainEmail({ to: DIGEST_RECIPIENT, subject, text });
  } catch (err) {
    return {
      error: NextResponse.json(
        {
          error: "send_failed",
          detail: (err as Error).message,
          hint:
            "Gmail send needs the gmail.send scope. Re-run `npm run gmail:auth` in recruiting-season after adding it, then update GOOGLE_REFRESH_TOKEN on Vercel.",
        },
        { status: 502 }
      ),
    };
  }

  return {
    ok: NextResponse.json({
      ok: true,
      sentTo: DIGEST_RECIPIENT,
      subject,
      counts: {
        upcoming: data.upcoming.length,
        yourMove: data.yourMove.length,
        nudgesDue: data.nudgesDue.length,
        ghostRisk: data.ghostRisk.length,
        debriefNeeded: data.debriefNeeded.length,
        storyGaps: data.storyGaps.length,
      },
    }),
  };
}

export async function GET(req: NextRequest) {
  if (!cronAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const result = await runDigest();
  return "error" in result && result.error ? result.error : result.ok!;
}

/** Manual trigger from the signed-in War Room UI, for testing without waiting on cron. */
export async function POST() {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 403 });
  }
  const result = await runDigest();
  return "error" in result && result.error ? result.error : result.ok!;
}
