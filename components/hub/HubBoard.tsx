"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  STAGES,
  STAGE_LABELS,
  type HubItem,
} from "@/lib/hub/types";

type EditableFields = Pick<
  HubItem,
  "category" | "title" | "detail" | "stage" | "priority" | "due"
>;

function toFields(i: HubItem): EditableFields {
  return {
    category: i.category,
    title: i.title,
    detail: i.detail || "",
    stage: i.stage,
    priority: i.priority,
    due: i.due || "",
  };
}

function ItemCard({ item, onChanged }: { item: HubItem; onChanged: () => void }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<EditableFields>(toFields(item));

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/hub/board", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          patch: { ...fields, due: fields.due || null },
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "save_failed");
      setEditing(false);
      onChanged();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm(`Delete "${item.title}"?`)) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/hub/board", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "delete_failed");
      onChanged();
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  }

  return (
    <article className={`wr-card hub-card${item.priority ? ` pri-${item.priority}` : ""}`}>
      <header>
        <h3>{item.title}</h3>
        <em className="hub-badge">{CATEGORY_LABELS[item.category]}</em>
      </header>
      {item.detail ? <p className="wr-next">{item.detail}</p> : null}
      {item.due ? <p className="wr-stage">Due {item.due}</p> : null}
      {item.link ? (
        <p className="wr-card-actions">
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </p>
      ) : null}

      <div className="wr-card-actions">
        <button type="button" className="wr-edit-toggle" onClick={() => setEditing((v) => !v)}>
          {editing ? "Cancel" : "Edit"}
        </button>
        <button type="button" className="wr-edit-toggle" onClick={remove} disabled={saving}>
          Delete
        </button>
      </div>

      {error ? <p className="wr-error">{error}</p> : null}

      {editing ? (
        <div className="wr-edit-form">
          <label>
            Category
            <select
              value={fields.category}
              onChange={(e) =>
                setFields((f) => ({ ...f, category: e.target.value as HubItem["category"] }))
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Stage
            <select
              value={fields.stage}
              onChange={(e) =>
                setFields((f) => ({ ...f, stage: e.target.value as HubItem["stage"] }))
              }
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
          <label>
            Title
            <input
              value={fields.title}
              onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
            />
          </label>
          <label>
            Detail
            <input
              value={fields.detail}
              onChange={(e) => setFields((f) => ({ ...f, detail: e.target.value }))}
            />
          </label>
          <label>
            Due
            <input
              type="date"
              value={fields.due || ""}
              onChange={(e) => setFields((f) => ({ ...f, due: e.target.value }))}
            />
          </label>
          <label>
            Priority
            <select
              value={fields.priority || ""}
              onChange={(e) =>
                setFields((f) => ({
                  ...f,
                  priority: (e.target.value || undefined) as HubItem["priority"],
                }))
              }
            >
              <option value="">None</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </label>
          <button type="button" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      ) : null}
    </article>
  );
}

function NewItemForm({ onChanged }: { onChanged: () => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<EditableFields>({
    category: "other",
    title: "",
    detail: "",
    stage: "backlog",
    priority: undefined,
    due: "",
  });

  async function save() {
    if (!fields.title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/hub/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, due: fields.due || null }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "save_failed");
      setFields({
        category: "other",
        title: "",
        detail: "",
        stage: "backlog",
        priority: undefined,
        due: "",
      });
      setOpen(false);
      onChanged();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="wr-btn-ghost hub-new-toggle" onClick={() => setOpen(true)}>
        + New item
      </button>
    );
  }

  return (
    <div className="wr-edit-form hub-new-form">
      <label>
        Category
        <select
          value={fields.category}
          onChange={(e) =>
            setFields((f) => ({ ...f, category: e.target.value as HubItem["category"] }))
          }
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Title
        <input
          value={fields.title}
          onChange={(e) => setFields((f) => ({ ...f, title: e.target.value }))}
          placeholder="What is it?"
        />
      </label>
      <label>
        Detail
        <input
          value={fields.detail}
          onChange={(e) => setFields((f) => ({ ...f, detail: e.target.value }))}
        />
      </label>
      <label>
        Due
        <input
          type="date"
          value={fields.due || ""}
          onChange={(e) => setFields((f) => ({ ...f, due: e.target.value }))}
        />
      </label>
      {error ? <p className="wr-error">{error}</p> : null}
      <div className="wr-card-actions">
        <button type="button" onClick={save} disabled={saving}>
          {saving ? "Adding…" : "Add"}
        </button>
        <button type="button" className="wr-edit-toggle" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function HubBoard({
  itemsByStage,
  attention,
  today,
}: {
  itemsByStage: Record<string, HubItem[]>;
  attention: HubItem[];
  today: string;
}) {
  const router = useRouter();
  const refresh = () => router.refresh();

  async function logout() {
    await fetch("/api/hub/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="wr-grid">
      <div className="hub-topbar">
        <NewItemForm onChanged={refresh} />
        <button type="button" className="wr-btn-ghost" onClick={logout}>
          Sign out
        </button>
      </div>

      {attention.length > 0 ? (
        <section className="wr-panel wr-attention">
          <h2>Needs attention today ({today})</h2>
          <ul>
            {attention.map((i) => (
              <li key={i.id}>
                <strong>{i.title}</strong>
                <span>
                  {CATEGORY_LABELS[i.category]} · Due {i.due}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="wr-panel wr-board">
        <h2>Board</h2>
        <div className="wr-columns hub-columns">
          {STAGES.map((stage) => (
            <div key={stage} className="wr-col">
              <div className="wr-col-head">
                {STAGE_LABELS[stage]}
                <span>{itemsByStage[stage]?.length ?? 0}</span>
              </div>
              <div className="wr-col-body">
                {(itemsByStage[stage] || []).map((item) => (
                  <ItemCard key={item.id} item={item} onChanged={refresh} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
