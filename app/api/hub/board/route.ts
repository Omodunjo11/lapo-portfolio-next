import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { getHubBoard } from "@/lib/hub/board";
import { commitHubBoard } from "@/lib/hub/store";
import { CATEGORIES, STAGES, type HubItem } from "@/lib/hub/types";

const EDITABLE_KEYS = [
  "category",
  "title",
  "detail",
  "stage",
  "priority",
  "due",
  "link",
] as const satisfies readonly (keyof HubItem)[];

type EditableFields = Partial<Pick<HubItem, (typeof EDITABLE_KEYS)[number]>>;

function sanitizeFields(input: unknown): EditableFields | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const out: EditableFields = {};
  for (const key of Object.keys(raw)) {
    if (!EDITABLE_KEYS.includes(key as (typeof EDITABLE_KEYS)[number])) {
      return null;
    }
  }
  if ("category" in raw) {
    if (!(CATEGORIES as readonly string[]).includes(raw.category as string)) {
      return null;
    }
    out.category = raw.category as HubItem["category"];
  }
  if ("stage" in raw) {
    if (!(STAGES as readonly string[]).includes(raw.stage as string)) {
      return null;
    }
    out.stage = raw.stage as HubItem["stage"];
  }
  if ("title" in raw) {
    if (typeof raw.title !== "string" || !raw.title.trim()) return null;
    out.title = raw.title;
  }
  if ("detail" in raw) out.detail = String(raw.detail ?? "");
  if ("priority" in raw) out.priority = raw.priority as HubItem["priority"];
  if ("due" in raw) out.due = (raw.due as string) || null;
  if ("link" in raw) out.link = String(raw.link ?? "");
  return out;
}

async function assertSession() {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 401 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const denied = await assertSession();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  const fields = sanitizeFields(body);
  if (!fields || !fields.title || !fields.category) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const board = getHubBoard();
  const item: HubItem = {
    id: randomUUID(),
    category: fields.category,
    title: fields.title,
    detail: fields.detail || undefined,
    stage: fields.stage || "backlog",
    priority: fields.priority,
    due: fields.due || null,
    link: fields.link || undefined,
  };
  board.items.push(item);
  board.updated = new Date().toISOString().slice(0, 10);

  try {
    await commitHubBoard(board, `Hub: add "${item.title}"`);
  } catch (err) {
    return NextResponse.json(
      { error: "commit_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true, item });
}

export async function PATCH(req: NextRequest) {
  const denied = await assertSession();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const fields = sanitizeFields(body.patch);
  if (!fields) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const board = getHubBoard();
  const item = board.items.find((i) => i.id === body.id);
  if (!item) {
    return NextResponse.json({ error: "item_not_found" }, { status: 404 });
  }
  Object.assign(item, fields);
  board.updated = new Date().toISOString().slice(0, 10);

  try {
    await commitHubBoard(board, `Hub: update "${item.title}"`);
  } catch (err) {
    return NextResponse.json(
      { error: "commit_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const denied = await assertSession();
  if (denied) return denied;

  const body = await req.json().catch(() => null);
  if (!body || typeof body.id !== "string") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const board = getHubBoard();
  const idx = board.items.findIndex((i) => i.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "item_not_found" }, { status: 404 });
  }
  const [removed] = board.items.splice(idx, 1);
  board.updated = new Date().toISOString().slice(0, 10);

  try {
    await commitHubBoard(board, `Hub: remove "${removed.title}"`);
  } catch (err) {
    return NextResponse.json(
      { error: "commit_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
