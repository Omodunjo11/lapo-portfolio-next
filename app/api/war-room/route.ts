import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { emailAllowed } from "@/lib/recruiting/access";
import {
  EMPTY_BOARD_PREFS,
  type BoardPrefs,
} from "@/lib/recruiting/board";
import { allSuggestions } from "@/lib/recruiting/flags";
import {
  mergeHandledKeys,
} from "@/lib/recruiting/inbox";
import {
  getRecruitingInbox,
  commitRecruitingInbox,
} from "@/lib/recruiting/inbox-store";
import {
  getRecruitingPipeline,
  loadWritablePipeline,
  applyArchiveHygiene,
} from "@/lib/recruiting/pipeline";
import { commitPipeline } from "@/lib/recruiting/store";
import type { FunnelStage } from "@/lib/recruiting/types";
import { EDITABLE_STAGES } from "@/lib/recruiting/types";

async function rememberHandled(keys: string[]) {
  if (!keys.length) return;
  const inbox = getRecruitingInbox();
  const handledKeys = mergeHandledKeys(inbox.handledKeys, keys);
  const keySet = new Set(keys);
  const pendingFlags = (inbox.pendingFlags || []).filter(
    (f) => !keySet.has(f.key) && !keySet.has(f.id)
  );
  await commitRecruitingInbox(
    {
      ...inbox,
      handledKeys,
      pendingFlags,
    },
    `War room: remember ${keys.length} handled inbox flag(s)`
  );
}

const STAGE_LABELS: Record<string, string> = {
  applied: "Applied",
  first: "1st",
  second: "2nd",
  third: "3rd",
  fourth: "4th",
  final: "Final",
  offered: "Offer",
  passed: "Passed",
  ghosted: "Ghosted",
};

async function requireLapo() {
  const session = await auth();
  if (!session.userId) {
    return { error: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  }
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;
  if (!emailAllowed(email)) {
    return { error: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  }
  return { userId: session.userId, user };
}

function readPrefs(
  user: NonNullable<Awaited<ReturnType<typeof currentUser>>>
): BoardPrefs {
  const meta = (user.privateMetadata?.recruitingBoard || {}) as Partial<BoardPrefs>;
  return {
    dismissedSuggestionIds: meta.dismissedSuggestionIds || [],
  };
}

async function savePrefs(
  userId: string,
  user: NonNullable<Awaited<ReturnType<typeof currentUser>>>,
  prefs: BoardPrefs
) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      ...user.privateMetadata,
      recruitingBoard: prefs,
    },
  });
}

export async function GET() {
  const gate = await requireLapo();
  if ("error" in gate && gate.error) return gate.error;

  const user = gate.user!;
  const prefs = readPrefs(user);
  const pipeline = await loadWritablePipeline().catch(() =>
    getRecruitingPipeline()
  );
  const suggestions = allSuggestions(pipeline, prefs.dismissedSuggestionIds);

  return NextResponse.json({ pipeline, prefs, suggestions });
}

export async function POST(req: Request) {
  const gate = await requireLapo();
  if ("error" in gate && gate.error) return gate.error;

  const user = gate.user!;
  const userId = gate.userId!;
  let body: {
    action?: string;
    id?: string;
    companyId?: string;
    stage?: FunnelStage;
    stageLabel?: string;
    toStage?: FunnelStage;
    key?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const prefs = readPrefs(user);
  const pipeline = await loadWritablePipeline();

  try {
    if (body.action === "move") {
      const companyId = String(body.companyId || "");
      const stage = body.stage as FunnelStage;
      if (
        !companyId ||
        !(EDITABLE_STAGES as readonly string[]).includes(stage)
      ) {
        return NextResponse.json({ error: "invalid move" }, { status: 400 });
      }
      const company = pipeline.companies.find((c) => c.id === companyId);
      if (!company) {
        return NextResponse.json({ error: "company_not_found" }, { status: 404 });
      }
      company.stage = stage;
      company.stageLabel =
        typeof body.stageLabel === "string" && body.stageLabel
          ? body.stageLabel
          : STAGE_LABELS[stage] || stage;
      applyArchiveHygiene(pipeline, companyId, stage);
      pipeline.updated = new Date().toISOString().slice(0, 10);
      await commitPipeline(pipeline, `War room: move ${companyId} → ${stage}`);
    } else if (body.action === "dismiss_suggestion") {
      const id = String(body.id || "");
      if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
      if (!prefs.dismissedSuggestionIds.includes(id)) {
        prefs.dismissedSuggestionIds.push(id);
      }
      const key = typeof body.key === "string" ? body.key : "";
      if (key && !prefs.dismissedSuggestionIds.includes(key)) {
        prefs.dismissedSuggestionIds.push(key);
      }
      await savePrefs(userId, user, prefs);
      await rememberHandled([id, key].filter(Boolean));
    } else if (body.action === "accept_suggestion") {
      const id = String(body.id || "");
      if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

      const suggestions = allSuggestions(pipeline, prefs.dismissedSuggestionIds);
      let sug = suggestions.find((s) => s.id === id);

      if (
        !sug &&
        body.companyId &&
        body.toStage &&
        (EDITABLE_STAGES as readonly string[]).includes(body.toStage)
      ) {
        const companyHint = pipeline.companies.find(
          (c) => c.id === body.companyId
        );
        if (companyHint) {
          sug = {
            id,
            companyId: body.companyId,
            fromStage: companyHint.stage,
            toStage: body.toStage,
            reason: "client accept",
            status: "pending",
            key: typeof body.key === "string" ? body.key : undefined,
          };
        }
      }

      if (!sug) {
        return NextResponse.json(
          { error: "unknown suggestion", detail: `No pending flag ${id}` },
          { status: 404 }
        );
      }
      const company = pipeline.companies.find((c) => c.id === sug!.companyId);
      if (!company) {
        return NextResponse.json({ error: "company_not_found" }, { status: 404 });
      }
      company.stage = sug.toStage;
      company.stageLabel = STAGE_LABELS[sug.toStage] || sug.toStage;
      applyArchiveHygiene(pipeline, company.id, sug.toStage);
      pipeline.updated = new Date().toISOString().slice(0, 10);
      if (!prefs.dismissedSuggestionIds.includes(id)) {
        prefs.dismissedSuggestionIds.push(id);
      }
      if (sug.key && !prefs.dismissedSuggestionIds.includes(sug.key)) {
        prefs.dismissedSuggestionIds.push(sug.key);
      }
      await savePrefs(userId, user, prefs);
      await rememberHandled([id, sug.key].filter(Boolean) as string[]);
      // No-op stage (e.g. Spam acknowledge) still dismisses the flag; only
      // commit pipeline when the stage actually changes.
      if (sug.fromStage !== sug.toStage) {
        await commitPipeline(
          pipeline,
          `War room: accept flag ${id} → ${sug.toStage}`
        );
      }
    } else {
      return NextResponse.json({ error: "unknown action" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: "commit_failed",
        detail: (err as Error).message || "accept_failed",
      },
      { status: 502 }
    );
  }

  const suggestions = allSuggestions(pipeline, prefs.dismissedSuggestionIds);
  return NextResponse.json({
    ok: true,
    pipeline,
    prefs,
    suggestions,
  });
}

void EMPTY_BOARD_PREFS;
