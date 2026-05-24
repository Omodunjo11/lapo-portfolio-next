"use client"
import Link from "next/link"

const SECTION_STYLE = {
  padding: "64px clamp(20px,6vw,80px)",
  borderBottom: "1px solid var(--border)",
}

const H2_STYLE = {
  fontFamily: "var(--font-playfair),serif",
  fontWeight: 900,
  fontSize: "clamp(22px,3vw,34px)",
  letterSpacing: "-.02em",
  lineHeight: 1.15,
  color: "var(--ink)",
  marginBottom: 16,
  marginTop: 0,
}

const BODY_STYLE = {
  fontSize: "clamp(14px,1.5vw,16px)",
  lineHeight: 1.9,
  color: "var(--mid)",
  maxWidth: 720,
}

const TAG_STYLE = {
  fontFamily: "var(--font-dm-mono),monospace",
  fontSize: 8,
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
  color: "var(--terra)",
  border: "1px solid rgba(125,211,252,.6)",
  padding: "3px 10px",
  borderRadius: 2,
  display: "inline-block",
  marginBottom: 14,
}

const principles = [
  {
    n: "01",
    tag: "Evaluation First",
    title: "Ship the eval harness before the feature.",
    body: "Most teams build the feature, then figure out how to measure it. I do the opposite. Before any model integration goes into production I define what good looks like, which queries should return what kinds of outputs, what failure modes are acceptable and which ones aren't, and what the severity threshold is for regulated vs. consumer contexts. The evaluation suite is a first-class product artifact, version-controlled and treated as seriously as the code it tests.\n\nIn regulated environments, a silent model failure isn't just a product bug, it's a compliance incident. The difference is whether you find out from a user report or from a regression test you wrote three weeks before launch.",
  },
  {
    n: "02",
    tag: "Trust Calibration",
    title: "Confidence without calibration is the most dangerous thing in AI.",
    body: "An AI system that says 'I don't know' when it doesn't know is more valuable than one that answers fluently and incorrectly. Calibrating model confidence, understanding when to show uncertainty, when to escalate to a human, when to refuse, is a product design problem, not an engineering one.\n\nI design explicit escalation paths for every AI system I build. If the model's confidence score drops below a defined threshold on a high-stakes query, the system surfaces that uncertainty visibly rather than smoothing it away. In financial and regulatory contexts, the cost of false confidence is asymmetric and severe. The design should reflect that.",
  },
  {
    n: "03",
    tag: "Human-in-the-Loop",
    title: "Automation should expand human judgment, not replace it.",
    body: "The goal of a human-in-the-loop system isn't to add a human as a rubber stamp on AI outputs. It's to route decisions to the right decision-maker at the right moment, using automation to handle what's routine so humans can focus on what's genuinely ambiguous.\n\nI design override mechanisms and escalation flows before I design the automation layer. That means deciding: which outputs can ship without review, which need a human checkpoint, and which should never be automated at all. The override design tells you more about what the system believes than the happy path does.",
  },
  {
    n: "04",
    tag: "Model vs System",
    title: "The model is not the product. The system around it is.",
    body: "Most AI product failures I've seen aren't model failures. They're system failures, bad prompt architecture, no fallback logic, missing telemetry, evaluation criteria defined too late, retrieval layers that degrade silently at scale. The model is a component. The product is the orchestration, constraints, and feedback loops that make that component reliable.\n\nThis is why I build evaluation infrastructure, contract-first API boundaries, and modular classification pipelines, not because I want the engineering complexity, but because the alternative is a system where changing one thing breaks something invisible three layers down.",
  },
  {
    n: "05",
    tag: "Latency & Tradeoffs",
    title: "Every architecture decision is a tradeoff, not a best practice.",
    body: "RAG is not always the right retrieval strategy. A larger model is not always the right model. Real-time inference is not always the right serving pattern. I built a C++ retrieval engine from scratch not to be an infrastructure engineer, but to have concrete numbers in my head when the engineering team says 'this won't scale.'\n\nThe PMs who make the best architecture calls are the ones who can reason about latency surfaces, context window tradeoffs, and inference cost curves, not because they'll implement it, but because they'll know when to push back, when to ask the right question, and when to stop trading accuracy for speed.",
  },
  {
    n: "06",
    tag: "Telemetry & Feedback",
    title: "If you can't observe it, you can't improve it.",
    body: "Every AI system I build has three things wired in from day one: structured logging on inputs and outputs, a mechanism to capture negative signals (explicit or implicit), and a regular review cadence on the evaluation suite. Not because these are nice to have, because they're the only way to know if the system is degrading between deployments.\n\nModel drift is real, prompt sensitivity is real, and distribution shift in production data is real. Telemetry doesn't prevent these things. It makes them visible before they become user-facing incidents.",
  },
  {
    n: "07",
    tag: "Regulated Environments",
    title: "Low-trust environments require different design instincts.",
    body: "I work primarily in regulated industries, financial services, compliance infrastructure, private capital. These environments share a common constraint: the cost of a wrong answer is not a bad user experience, it's an audit finding, a regulatory action, or a missed investment decision worth millions.\n\nThat changes how I think about AI design: hallucination is a liability, not just a UX problem; audit trails are a product requirement, not an ops afterthought; and 'good enough' accuracy from a demo does not transfer to production at regulated-institution tolerances. Building for this context is a specific skill, and most AI product frameworks don't account for it.",
  },
  {
    n: "08",
    tag: "What I've Learned Building",
    title: "The hard lessons don't come from the models.",
    body: "The most expensive mistakes I've seen in AI product development are not technical. They're communication failures: unclear contracts between the AI layer and the product interface, evaluation criteria defined after the feature shipped, human-override flows that nobody tested under pressure, prompt changes that broke downstream assumptions nobody documented.\n\nThe best AI PM I've found is one who treats the system design, the contracts, the constraints, the escalation paths, as seriously as the model selection. That's what I try to do.",
  },
]

export default function HowIBuild() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{
        ...SECTION_STYLE,
        paddingTop: "clamp(80px,12vh,140px)",
        borderBottom: "1px solid var(--border)",
        maxWidth: 900,
      }}>
        <div style={TAG_STYLE}>Product Philosophy</div>
        <h1 style={{
          fontFamily: "var(--font-playfair),serif",
          fontWeight: 900,
          fontSize: "clamp(36px,6vw,72px)",
          letterSpacing: "-.03em",
          lineHeight: .95,
          color: "var(--ink)",
          marginBottom: 28,
          marginTop: 0,
        }}>
          How I Build<br />
          <em style={{ color: "var(--terra)", fontStyle: "italic" }}>AI Products.</em>
        </h1>
        <p style={{ ...BODY_STYLE, fontSize: "clamp(15px,1.6vw,18px)", marginBottom: 32 }}>
          Eight principles I actually follow when building AI systems, on evaluation, trust calibration, human-in-the-loop design, and the things most teams get wrong.
        </p>
        <p style={{ ...BODY_STYLE, color: "var(--muted)", fontSize: 13 }}>
          These are not best practices borrowed from a framework. They come from building AI systems in production for regulated industries, running evals, watching systems fail in interesting ways, and rebuilding with better constraints the second time.
        </p>
      </div>

      {/* ── Principles ── */}
      {principles.map((p, i) => (
        <div key={p.n} style={{
          ...SECTION_STYLE,
          display: "grid",
          gridTemplateColumns: "clamp(48px,6vw,80px) 1fr",
          gap: "clamp(24px,4vw,56px)",
          alignItems: "start",
          background: i % 2 === 1 ? "rgba(186,230,253,0.08)" : "var(--paper)",
        }}>
          {/* Number */}
          <div style={{
            fontFamily: "var(--font-playfair),serif",
            fontWeight: 900,
            fontSize: "clamp(28px,4vw,52px)",
            color: "rgba(125,211,252,0.4)",
            lineHeight: 1,
            paddingTop: 4,
          }}>{p.n}</div>

          {/* Content */}
          <div>
            <div style={TAG_STYLE}>{p.tag}</div>
            <h2 style={H2_STYLE}>{p.title}</h2>
            <div style={BODY_STYLE}>
              {p.body.split("\n\n").map((para, j) => (
                <p key={j} style={{ marginBottom: 16, marginTop: 0 }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── Selected thinking prompts ── */}
      <div style={{ ...SECTION_STYLE, background: "var(--ink)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ ...TAG_STYLE, color: "rgba(186,230,253,.7)", borderColor: "rgba(125,211,252,.25)" }}>
            Selected Product Thinking
          </div>
          <h2 style={{ ...H2_STYLE, color: "var(--paper)", marginBottom: 40 }}>
            Questions I keep coming back to.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {[
              "Why most AI copilots fail retention after week two.",
              "Why trust calibration matters more than raw accuracy in regulated contexts.",
              "What PMs misunderstand about agent UX and oversight.",
              "Building AI systems for environments where users don't trust the model by default.",
              "Why evaluation infrastructure is the real competitive moat in AI products.",
              "The difference between 'AI-powered' and 'AI-reliable' as a product property.",
            ].map((q, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(125,211,252,0.15)",
                padding: "20px 22px",
                borderRadius: 2,
              }}>
                <div style={{
                  fontFamily: "var(--font-playfair),serif",
                  fontStyle: "italic",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "rgba(248,250,252,0.85)",
                }}>"{q}"</div>
              </div>
            ))}
          </div>
          <p style={{
            fontFamily: "var(--font-dm-mono),monospace",
            fontSize: 9,
            letterSpacing: ".12em",
            color: "rgba(186,230,253,.4)",
            marginTop: 40,
          }}>
            These are the essays I'm writing. If any of these are live, they'll be in Writing ↗
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        ...SECTION_STYLE,
        borderBottom: "none",
        textAlign: "center",
        paddingTop: "clamp(48px,8vh,96px)",
        paddingBottom: "clamp(48px,8vh,96px)",
      }}>
        <h2 style={{ ...H2_STYLE, textAlign: "center" }}>Want to go deeper?</h2>
        <p style={{ ...BODY_STYLE, margin: "0 auto 36px", textAlign: "center" }}>
          See the systems I've actually built, or start a conversation.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/projects"
            style={{
              fontFamily: "var(--font-syne),sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
              background: "var(--terra)", color: "white",
              padding: "14px 32px", borderRadius: 2,
              textDecoration: "none", transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0284C7")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--terra)")}
          >
            View Projects →
          </Link>
          <Link href="/#contact"
            style={{
              fontFamily: "var(--font-syne),sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase",
              border: "1px solid var(--border)", color: "var(--ink)",
              padding: "14px 32px", borderRadius: 2,
              textDecoration: "none", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "white" }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)" }}
          >
            Start a Conversation →
          </Link>
        </div>
      </div>

    </main>
  )
}
