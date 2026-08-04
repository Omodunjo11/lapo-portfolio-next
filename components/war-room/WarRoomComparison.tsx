import type { RankedComparisonRow, ComparisonFile } from "@/lib/recruiting/comparison";

export default function WarRoomComparison({
  comparison,
  rows,
}: {
  comparison: ComparisonFile;
  rows: RankedComparisonRow[];
}) {
  if (rows.length === 0) return null;

  const name = (r: RankedComparisonRow) =>
    r.company?.name || r.companyId;

  return (
    <section className="wr-panel wr-compare">
      <div className="wr-board-head">
        <h2>Fit comparison</h2>
        <span className="wr-muted">as of {comparison.updated}</span>
      </div>
      <p className="wr-muted wr-compare-note">
        Linked to live War Room companies (stage + Drive update with the
        pipeline). Scores refresh when you rebuild comparison — not on every
        scan. Excited = how keen they seem to advance you. Exit = company
        outcome optionality (liquidity / brand / path clarity). Rank ={" "}
        {comparison.formula}.
      </p>

      <div className="wr-compare-stats">
        {comparison.memo.topDeploy.slice(0, 3).map((id, i) => {
          const row = rows.find((r) => r.companyId === id);
          return (
            <div key={id} className="wr-stat">
              <div className="wr-stat-label">#{i + 1} deploy</div>
              <div className="wr-stat-value wr-stat-value-sm">
                {row ? name(row) : id}
              </div>
              {row ? (
                <div className="wr-muted">rank {row.rank}</div>
              ) : null}
            </div>
          );
        })}
        <div className="wr-stat">
          <div className="wr-stat-label">Best CoS</div>
          <div className="wr-stat-value wr-stat-value-sm">
            {(() => {
              const cos = rows.find(
                (r) => r.companyId === comparison.memo.bestCoS
              );
              return cos ? name(cos) : comparison.memo.bestCoS;
            })()}
          </div>
        </div>
      </div>

      <div className="wr-compare-scroll">
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
              <th title={comparison.formula}>Rank</th>
              <th>Docs</th>
              <th>Why / watch</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const prep = r.company?.drive?.prepUrl;
              const folder = r.company?.drive?.folderUrl;
              const hot = r.excited >= 8;
              const cool = r.excited <= 4;
              return (
                <tr
                  key={r.companyId}
                  className={
                    r.rank >= 55
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
                    <div className="wr-muted wr-compare-why-line">
                      {r.watch}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="wr-compare-memo">{comparison.memo.summary}</p>
      <p className="wr-muted">
        Offer-pressure: {comparison.memo.offerPressure}
      </p>
    </section>
  );
}
