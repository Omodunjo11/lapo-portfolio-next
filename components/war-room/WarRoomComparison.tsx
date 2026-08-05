import type {
  RankedComparisonRow,
  ComparisonFile,
  JoinedComparison,
} from "@/lib/recruiting/comparison";

function CompareTable({
  rows,
  formula,
  muted,
}: {
  rows: RankedComparisonRow[];
  formula: string;
  muted?: boolean;
}) {
  if (rows.length === 0) return null;

  const name = (r: RankedComparisonRow) =>
    r.company?.name || r.companyId;

  return (
    <div className={`wr-compare-scroll${muted ? " wr-compare-archived" : ""}`}>
      <table className="wr-compare-table">
        <thead>
          <tr>
            <th>Company</th>
            <th title="Live pipeline stage">Live stage</th>
            <th title="Track">Track</th>
            <th title="Fit score">Fit</th>
            <th title="Compound growth potential">Cmp.</th>
            <th title="Company outcome optionality (liquidity / brand / path clarity)">
              Exit
            </th>
            <th title="How keen they seem to advance you (1–10)">Excited</th>
            <th title={formula}>Rank</th>
            <th>Docs</th>
            <th>Why / watch</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const prep = r.company?.drive?.prepUrl;
            const folder = r.company?.drive?.folderUrl;
            const hot = !muted && r.excited >= 8;
            const cool = !muted && r.excited <= 4;
            return (
              <tr
                key={r.companyId}
                className={
                  muted
                    ? "wr-compare-row-archived"
                    : hot
                      ? "wr-compare-row-hot"
                      : cool
                        ? "wr-compare-row-cool"
                        : undefined
                }
              >
                <td className="wr-compare-company">
                  <strong>{name(r)}</strong>
                  <div className="wr-muted wr-compare-role">
                    {r.company?.role || "—"}
                  </div>
                </td>
                <td data-label="Stage">
                  {r.company?.stageLabel || r.company?.stage || "—"}
                </td>
                <td data-label="Track">{r.track}</td>
                <td data-label="Fit">{r.fit}</td>
                <td data-label="Compound">{r.compound}</td>
                <td data-label="Exit">{r.exit}</td>
                <td data-label="Excited" className="wr-compare-excited-cell">
                  <span
                    className={
                      hot
                        ? "wr-excited wr-excited-hot"
                        : cool
                          ? "wr-excited wr-excited-cool"
                          : "wr-excited"
                    }
                  >
                    {r.excited}
                  </span>
                  <div className="wr-muted wr-compare-excited-why">
                    {r.excitedWhy}
                  </div>
                </td>
                <td data-label="Rank">
                  <span className="wr-compare-rank">{r.rank}</span>
                </td>
                <td data-label="Docs" className="wr-compare-docs">
                  <span className="wr-compare-docs-links">
                    {prep ? (
                      <a href={prep} target="_blank" rel="noopener noreferrer">
                        Prep
                      </a>
                    ) : null}
                    {folder ? (
                      <a
                        href={folder}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Folder
                      </a>
                    ) : null}
                    {!prep && !folder ? (
                      <span className="wr-muted">—</span>
                    ) : null}
                  </span>
                </td>
                <td className="wr-compare-why">
                  <div className="wr-compare-why-line">{r.why}</div>
                  <div className="wr-muted wr-compare-why-line">{r.watch}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function WarRoomComparison({
  comparison,
  rows,
}: {
  comparison: ComparisonFile;
  rows: JoinedComparison;
}) {
  if (rows.active.length === 0 && rows.archived.length === 0) return null;

  return (
    <section className="wr-panel wr-compare" id="fit-comparison">
      <div className="wr-board-head">
        <h2>Fit comparison</h2>
        <span className="wr-muted">as of {comparison.updated}</span>
      </div>
      <p className="wr-muted wr-compare-note">
        Linked to the live pipeline (stage + Drive). Passed and ghosted drop out
        of the ranking and land in Archived below. Scores refresh when you rebuild
        comparison. Excited = how keen they seem to advance you. Exit = company
        outcome optionality. Rank = {comparison.formula}.
      </p>

      <CompareTable rows={rows.active} formula={comparison.formula} />

      {rows.archived.length > 0 ? (
        <details className="wr-compare-archive">
          <summary>
            Archived ({rows.archived.length}) — Passed / ghosted, not in rank
          </summary>
          <CompareTable
            rows={rows.archived}
            formula={comparison.formula}
            muted
          />
        </details>
      ) : null}

      <p className="wr-compare-memo">{comparison.memo.summary}</p>
      <p className="wr-muted">
        Offer-pressure: {comparison.memo.offerPressure}
      </p>
    </section>
  );
}
