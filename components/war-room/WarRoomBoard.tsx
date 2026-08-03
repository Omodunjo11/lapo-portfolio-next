"use client";

import { useState } from "react";
import type { Company, PipelineEvent } from "@/lib/recruiting/types";
import { EDITABLE_STAGES } from "@/lib/recruiting/types";

type Col = { id: string; label: string };

type EditableFields = Pick<
  Company,
  "stage" | "stageLabel" | "nextAction" | "due" | "nudgeDate"
>;

function CompanyCard({ c }: { c: Company }) {
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
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article key={c.id} className={`wr-card pri-${c.priority}`}>
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
      <div className="wr-card-actions">
        {c.drive?.folderUrl ? (
          <a href={c.drive.folderUrl} target="_blank" rel="noopener noreferrer">
            Drive folder
          </a>
        ) : null}
        {c.drive?.prepUrl ? (
          <a href={c.drive.prepUrl} target="_blank" rel="noopener noreferrer">
            Prep doc
          </a>
        ) : null}
        {!c.drive?.folderUrl && !c.drive?.prepUrl ? (
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

      {saved && !editing ? <p className="wr-saved">Saved — rebuilding, refresh in ~30-60s</p> : null}

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
  byStage,
  upcoming,
  companies,
  focus,
  archived,
  attention,
  today,
}: {
  columns: Col[];
  byStage: Record<string, Company[]>;
  upcoming: PipelineEvent[];
  companies: Company[];
  focus: { companyId: string; detail: string }[];
  archived: Company[];
  attention: Company[];
  today: string;
}) {
  const nameOf = (id: string) =>
    companies.find((c) => c.id === id)?.name || id;

  return (
    <div className="wr-grid">
      {attention.length > 0 ? (
        <section className="wr-panel wr-attention">
          <h2>Needs attention today ({today})</h2>
          <ul>
            {attention.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong>
                <span>
                  {c.due && c.due <= today ? `Due ${c.due}` : ""}
                  {c.nudgeDate && c.nudgeDate <= today
                    ? `${c.due && c.due <= today ? " · " : ""}Nudge by ${c.nudgeDate}`
                    : ""}
                  {" · "}
                  {c.nextAction}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="wr-panel wr-focus">
        <h2>Today&apos;s focus</h2>
        <ul>
          {focus.map((f) => (
            <li key={f.companyId}>
              <strong>{nameOf(f.companyId)}</strong>
              <span>{f.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wr-panel">
        <h2>Upcoming interviews</h2>
        <ul className="wr-upcoming">
          {upcoming.length === 0 && <li className="wr-muted">None scheduled</li>}
          {upcoming.map((e) => {
            const co = companies.find((c) => c.id === e.companyId);
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
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wr-panel wr-board">
        <h2>Pipeline funnel</h2>
        <div className="wr-columns">
          {columns.map((col) => (
            <div key={col.id} className="wr-col">
              <div className="wr-col-head">
                {col.label}
                <span>{byStage[col.id]?.length ?? 0}</span>
              </div>
              <div className="wr-col-body">
                {(byStage[col.id] || []).map((c) => (
                  <CompanyCard key={c.id} c={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {archived.length > 0 ? (
        <details className="wr-panel wr-archive">
          <summary>Archived ({archived.length})</summary>
          <div className="wr-col-body">
            {archived.map((c) => (
              <CompanyCard key={c.id} c={c} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
