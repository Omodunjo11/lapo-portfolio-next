"use client";

import { useMemo, useState, useTransition } from "react";
import type { Company, FunnelStage, PipelineEvent } from "@/lib/recruiting/types";
import { EDITABLE_STAGES } from "@/lib/recruiting/types";
import type { Suggestion } from "@/lib/recruiting/board";
import { nextFunnelStage, prevFunnelStage } from "@/lib/recruiting/board";

type Col = { id: string; label: string };

type EditableFields = Pick<
  Company,
  "stage" | "stageLabel" | "nextAction" | "due" | "nudgeDate"
>;

const FUNNEL: FunnelStage[] = [
  "applied",
  "first",
  "second",
  "third",
  "fourth",
  "final",
];

function CompanyCard({
  c,
  pending,
  onMove,
}: {
  c: Company;
  pending: boolean;
  onMove: (companyId: string, stage: FunnelStage) => void;
}) {
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

  const prev = prevFunnelStage(c.stage);
  const next = nextFunnelStage(c.stage);

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
      if (fields.stage !== c.stage) {
        onMove(c.id, fields.stage);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article
      className={`wr-card pri-${c.priority}`}
      draggable={!editing}
      onDragStart={(e) => {
        if (editing) return;
        e.dataTransfer.setData("text/companyId", c.id);
      }}
    >
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

      <div className="wr-move">
        <button
          type="button"
          disabled={!prev || pending || editing}
          onClick={() => prev && onMove(c.id, prev)}
          title="Move left"
        >
          ←
        </button>
        <select
          value={FUNNEL.includes(c.stage) ? c.stage : c.stage}
          disabled={pending || editing}
          onChange={(e) => onMove(c.id, e.target.value as FunnelStage)}
          aria-label={`Stage for ${c.name}`}
        >
          {EDITABLE_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={!next || pending || editing}
          onClick={() => next && onMove(c.id, next)}
          title="Move right"
        >
          →
        </button>
      </div>

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

      {saved && !editing ? (
        <p className="wr-saved">Saved — rebuilding, refresh in ~30-60s</p>
      ) : null}

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
  initialCompanies,
  upcoming,
  focus,
  archived: initialArchived,
  attention: initialAttention,
  today,
  initialSuggestions,
  gmailReady = false,
  lastScanAt = null,
}: {
  columns: Col[];
  initialCompanies: Company[];
  upcoming: PipelineEvent[];
  focus: { companyId: string; detail: string }[];
  archived: Company[];
  attention: Company[];
  today: string;
  initialSuggestions: Suggestion[];
  gmailReady?: boolean;
  lastScanAt?: string | null;
}) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [pending, startTransition] = useTransition();
  const [scanning, setScanning] = useState(false);
  const [scanNote, setScanNote] = useState<string | null>(
    lastScanAt
      ? `Last inbox scan ${new Date(lastScanAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}`
      : null
  );
  const [error, setError] = useState<string | null>(null);

  const byStage = useMemo(() => {
    const map: Record<string, Company[]> = {};
    for (const col of columns) map[col.id] = [];
    for (const c of companies) {
      if (c.stage === "passed" || c.stage === "ghosted") continue;
      if (c.stage === "offered") map.final?.push(c);
      else if (map[c.stage]) map[c.stage].push(c);
    }
    return map;
  }, [companies, columns]);

  const archived = useMemo(
    () =>
      companies.filter(
        (c) => c.stage === "passed" || c.stage === "ghosted"
      ),
    [companies]
  );

  const attention = useMemo(() => {
    const ids = new Set(initialAttention.map((c) => c.id));
    return companies.filter((c) => {
      if (!ids.has(c.id) && !(c.due && c.due <= today) && !(c.nudgeDate && c.nudgeDate <= today)) {
        return false;
      }
      if (c.stage === "passed" || c.stage === "ghosted") return false;
      return Boolean(
        (c.due && c.due <= today) || (c.nudgeDate && c.nudgeDate <= today)
      );
    });
  }, [companies, initialAttention, today]);

  const nameOf = (id: string) =>
    companies.find((c) => c.id === id)?.name || id;

  async function post(body: Record<string, unknown>) {
    setError(null);
    const res = await fetch("/api/war-room", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || data.detail || "Request failed");
      return;
    }
    if (data.pipeline?.companies) setCompanies(data.pipeline.companies);
    if (data.suggestions) setSuggestions(data.suggestions);
  }

  function move(companyId: string, stage: FunnelStage) {
    // Optimistic UI
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId
          ? { ...c, stage, stageLabel: stage }
          : c
      )
    );
    startTransition(() => {
      void post({ action: "move", companyId, stage });
    });
  }

  function accept(id: string) {
    startTransition(() => {
      void post({ action: "accept_suggestion", id });
    });
  }

  function dismiss(id: string) {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    startTransition(() => {
      void post({ action: "dismiss_suggestion", id });
    });
  }

  async function scanGmail() {
    setScanning(true);
    setError(null);
    try {
      const res = await fetch("/api/war-room/gmail/scan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ applyCalendar: true, persist: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || data.error || "scan_failed");
      }
      setScanNote(
        `Scanned · ${data.gmailMatched ?? 0} mail · ${data.calendarMatched ?? 0} cal · ${data.proposals?.length ?? 0} signals` +
          (data.appliedCalendar
            ? ` · ${data.appliedCalendar} calendar fact(s) saved`
            : "")
      );
      if (Array.isArray(data.flags)) {
        const inboxFlags: Suggestion[] = data.flags.map(
          (f: {
            id: string;
            companyId: string;
            fromStage: FunnelStage;
            toStage: FunnelStage;
            reason: string;
          }) => ({
            id: f.id,
            companyId: f.companyId,
            fromStage: f.fromStage,
            toStage: f.toStage,
            reason: f.reason,
            status: "pending" as const,
          })
        );
        setSuggestions((prev) => {
          const keep = prev.filter((s) => !s.id.startsWith("inbox-"));
          const seen = new Set(keep.map((s) => s.id));
          return [...keep, ...inboxFlags.filter((s) => !seen.has(s.id))];
        });
      }
      // Refresh page data after git commit / rebuild lag
      if (data.appliedCalendar > 0) {
        setScanNote((n) => `${n || ""} · refresh in ~30–60s for calendar facts`);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setScanning(false);
    }
  }

  return (
    <div className="wr-grid">
      <section className="wr-panel wr-scan">
        <div className="wr-board-head">
          <div>
            <h2>Inbox scan</h2>
            <p className="wr-muted" style={{ margin: "6px 0 0" }}>
              Interview-only Gmail + Calendar. Stages never auto-move.
            </p>
          </div>
          <button
            type="button"
            className="wr-btn"
            disabled={!gmailReady || scanning || pending}
            onClick={() => void scanGmail()}
            title={
              gmailReady
                ? "Scan Gmail and Calendar now"
                : "Add Google OAuth env vars on Vercel"
            }
          >
            {scanning ? "Scanning…" : "Scan inbox"}
          </button>
        </div>
        {scanNote ? <p className="wr-muted">{scanNote}</p> : null}
        {!gmailReady ? (
          <p className="wr-error">
            Gmail not configured — set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
            GOOGLE_REFRESH_TOKEN on Vercel.
          </p>
        ) : null}
      </section>

      {suggestions.length > 0 && (
        <section className="wr-panel wr-flags">
          <h2>Flags — you decide</h2>
          <p className="wr-muted" style={{ marginBottom: 12 }}>
            From Gmail/Calendar and pipeline events. Accept to move, or dismiss.
          </p>
          <ul className="wr-flag-list">
            {suggestions.map((s) => (
              <li key={s.id}>
                <div>
                  <strong>{nameOf(s.companyId)}</strong>
                  <span>
                    {s.fromStage} → {s.toStage}: {s.reason}
                  </span>
                </div>
                <div className="wr-flag-actions">
                  <button
                    type="button"
                    className="wr-btn"
                    disabled={pending}
                    onClick={() => accept(s.id)}
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="wr-btn wr-btn-ghost"
                    disabled={pending}
                    onClick={() => dismiss(s.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

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
        <div className="wr-board-head">
          <h2>Pipeline funnel</h2>
          <span className="wr-muted">
            Drag, ← →, or dropdown {pending ? "· saving…" : ""}
          </span>
        </div>
        {error && <p className="wr-error">{error}</p>}
        <div className="wr-columns">
          {columns.map((col) => (
            <div
              key={col.id}
              className="wr-col"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const companyId = e.dataTransfer.getData("text/companyId");
                if (companyId) move(companyId, col.id as FunnelStage);
              }}
            >
              <div className="wr-col-head">
                {col.label}
                <span>{byStage[col.id]?.length ?? 0}</span>
              </div>
              <div className="wr-col-body">
                {(byStage[col.id] || []).map((c) => (
                  <CompanyCard
                    key={c.id}
                    c={c}
                    pending={pending}
                    onMove={move}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {(archived.length > 0 || initialArchived.length > 0) ? (
        <details className="wr-panel wr-archive">
          <summary>Archived ({archived.length})</summary>
          <div className="wr-col-body">
            {archived.map((c) => (
              <CompanyCard key={c.id} c={c} pending={pending} onMove={move} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}
