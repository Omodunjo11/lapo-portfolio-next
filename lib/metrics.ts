import { projects } from "./projects"

/** Total shipped products (portfolio + additional builds not listed individually). */
export const PORTFOLIO_BUILD_COUNT = 11

/** Case studies documented in the portfolio archive. */
export const PORTFOLIO_CASE_STUDY_COUNT = projects.length

export const PORTFOLIO_BUILD_FOOTNOTE = `${PORTFOLIO_BUILD_COUNT} production builds · ${PORTFOLIO_CASE_STUDY_COUNT} documented case studies`

/** Homepage proof metrics, sourced from experience page, verified figures only. */
export const PROOF_METRICS = [
  {
    metric: "$500M+",
    label: "Enterprise data platform · TD Bank",
  },
  {
    metric: "$148M",
    label: "Prime subscription ARR · Amazon",
  },
  {
    metric: "$270M",
    label: "Enterprise API platform · Capital One",
  },
  {
    metric: "$600K",
    label: "Annual savings, top 10 U.S. bank · Kinage",
  },
  {
    metric: "5K+",
    label: "KOVA tester-phase customers · 2 months",
  },
  {
    metric: String(PORTFOLIO_BUILD_COUNT),
    label: `AI products shipped · ${PORTFOLIO_CASE_STUDY_COUNT} case studies documented`,
  },
]
