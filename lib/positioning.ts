/** Target hiring lanes — FDPM / AI PM / Staff, not community or campus GTM. */
export const TARGET_ROLES =
  "Open to Forward Deployed PM, AI Product Manager, and Staff PM roles where production adoption is the job."

export const LINKEDIN_HEADLINE =
  "Forward Deployed PM · AI Product · Regulated Systems | Kinage, KOVA, Amazon, TD Bank | Wharton MBA"

/** One sentence for mutual contacts, cold intros, or “how do you know Lapo?” */
export const INTRO_FOR_NETWORK =
  "Lapo builds and deploys AI in regulated production—compliance, credit, care—not campus programs or community GTM. He's looking for FDPM, AI PM, or Staff PM roles."

export const HERO_OPERATOR_LINE =
  "Operator dossier: case studies, production metrics, and how I think about trust under scrutiny."

export const CONNECT_INTENT =
  "I'm looking for FDPM, AI PM, or Staff PM roles where the hard problem is production adoption after the pilot—not another demo. That's been Kinage, TD, and the hospital work. If you're building in regulated AI, fintech, or care, I'd like to talk."

export const ROLE_META =
  "Forward Deployed PM and AI product leader building trust systems in regulated production. Kinage · KOVA · Amazon · TD Bank · Wharton MBA."

export const OPEN_TO_ROLES = [
  {
    role: "Forward Deployed PM",
    desc: "Embedded with operators in regulated healthcare and fintech. Map live workflows, ship agentic systems, own adoption and override loops after launch.",
  },
  {
    role: "AI Product Manager",
    desc: "0→1 and 1→N for trust systems: eval gates, confidence routing, human-in-the-loop, and the product layer around LLMs where wrong answers have real cost.",
  },
  {
    role: "Staff PM · AI Systems",
    desc: "Cross-team technical PM for compound AI architectures, evaluation infrastructure, and deployment in compliance, credit, and care environments.",
  },
] as const
