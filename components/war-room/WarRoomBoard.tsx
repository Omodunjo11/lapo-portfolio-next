"use client";

import type { Company, PipelineEvent } from "@/lib/recruiting/types";

type Col = { id: string; label: string };

export default function WarRoomBoard({
  columns,
  byStage,
  upcoming,
  companies,
  focus,
}: {
  columns: Col[];
  byStage: Record<string, Company[]>;
  upcoming: PipelineEvent[];
  companies: Company[];
  focus: { companyId: string; detail: string }[];
}) {
  const nameOf = (id: string) =>
    companies.find((c) => c.id === id)?.name || id;

  return (
    <div className="wr-grid">
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
                  <article key={c.id} className={`wr-card pri-${c.priority}`}>
                    <header>
                      <h3>{c.name}</h3>
                      <em className={`wr-ball ${c.ball}`}>{c.ball}</em>
                    </header>
                    <p className="wr-role">{c.role}</p>
                    <p className="wr-stage">{c.stageLabel || c.stage}</p>
                    <p className="wr-next">{c.nextAction}</p>
                    <div className="wr-card-actions">
                      {c.drive?.folderUrl ? (
                        <a
                          href={c.drive.folderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Drive folder
                        </a>
                      ) : null}
                      {c.drive?.prepUrl ? (
                        <a
                          href={c.drive.prepUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Prep doc
                        </a>
                      ) : null}
                      {!c.drive?.folderUrl && !c.drive?.prepUrl ? (
                        <span className="wr-muted">
                          {c.drive?.note || "Add Drive link in pipeline"}
                        </span>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
