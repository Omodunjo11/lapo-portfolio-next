"use client"
import Link from "next/link"
import PageHero from "@/components/PageHero"

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
  border: "1px solid color-mix(in srgb, var(--terra) 35%, transparent)",
  padding: "3px 10px",
  borderRadius: 2,
  display: "inline-block",
  marginBottom: 14,
}

const principles = [
  {
    n: "01",
    tag: "Systems Thinking",
    title: "The model is not the product. The system around it is.",
    body: "Most AI teams get this wrong. They pick a model, write a prompt, and call it a product. What they have actually built is a demo. A real AI product has inputs, retrieval, reasoning, confidence checks, routing, human review, evaluation, and feedback loops. The prompt is one layer. The system is everything.\n\nWeak AI product: send data to the model, get an answer. Strong AI product: normalize the input, retrieve the right context, constrain the model's task, check confidence, cite sources, route uncertainty, collect feedback, improve over time. That distinction is the difference between a prototype and something that survives production. Most AI product failures I have seen are not model failures. They are system failures: bad input structure, wrong retrieval context, missing escalation paths, evaluation criteria defined after the feature shipped.",
  },
  {
    n: "02",
    tag: "Workflow First",
    title: "Stop thinking in features. Start thinking in workflows.",
    body: "When someone says we need an AI tool, the wrong instinct is to jump to model selection. The right instinct is to ask: what enters the system? What needs to be cleaned? What context is missing? What decision needs to be made? Who trusts the output? What happens when the system is unsure? What feedback improves the next version?\n\nThat workflow lens applies everywhere, fraud detection, sales enablement, legal review, compliance, credit infrastructure. The reusable architecture is almost always the same: Ingest, Retrieve, Analyze, Recommend, Escalate or Execute, Learn. Once you can see that pattern, you can design around it. Once you can design around it, you can build something that works outside a controlled demo environment.",
  },
  {
    n: "03",
    tag: "Input Quality",
    title: "Object design precedes model design.",
    body: "Messy inputs create bad AI outputs. Before the model can reason well, the system needs clean objects. Notes need founder, date, meeting type, topics, numbers, and commitments. Bills need vendor, amount, due date, status, and source. Customer data needs identity resolution, event definitions, timestamps, and behavioral context.\n\nThis is why so much real AI product work happens before the model is involved. The question is rarely which model should we use. It is almost always what object is the model reasoning over, and is that object clean enough to reason over reliably. That is a major AI systems concept that most product specs skip entirely. Skipping it is why so many AI products fail at scale rather than in testing.",
  },
  {
    n: "04",
    tag: "Retrieval Quality",
    title: "Confident wrongness is the worst kind of AI failure.",
    body: "RAG matters because a model does not inherently know your internal notes, contracts, customer history, or operational data. Retrieval brings the right external context into the model's working environment. But retrieval alone is not enough. You have to evaluate retrieval quality before reasoning. If the system retrieves the wrong context, the model may still sound confident. That is confident wrongness, and it is harder to detect than a blank error.\n\nA serious AI product needs retrieval scoring, source citations, reranking, freshness checks, and defined behavior for not enough evidence. Semantic search finds meaning. Keyword search finds exact terms. Hybrid retrieval covers both. Choosing between them is a product decision, not just an engineering one, and it should be driven by the cost of the failure mode you are most trying to avoid.",
  },
  {
    n: "05",
    tag: "State and Time",
    title: "Most AI failures are time and state failures, not model failures.",
    body: "A lot of AI systems treat information as flat. But real-world data changes. A churn rate shifts between March and June. A legal template gets updated six months later. A bill status moves from upcoming to paid. A customer's risk profile changes after a behavioral event. A fraud pattern evolves with a new attack vector.\n\nThe system has to understand sequence, freshness, and versioning. It needs to know not only what the data says but when it was true. This is a recurring root cause in AI production incidents: the model was not wrong, it was reasoning from stale state. Building for temporal coherence is one of the things that separates people who have shipped AI products from people who have demoed them.",
  },
  {
    n: "06",
    tag: "Confidence Routing",
    title: "Confidence is operational. It controls what happens next.",
    body: "Confidence should determine what the system does next in the workflow, not just what gets shown to the user. High confidence proceeds. Medium confidence triggers another retrieval pass, a clarification request, or human review. Low confidence escalates or refuses to answer.\n\nA confidence score sitting inert in a tooltip is waste. A confidence threshold that routes a decision to a human reviewer is infrastructure. The architecture question is never should we show confidence. It is what should the system do at each confidence level. Getting that right is what converts uncertainty from a product liability into a product feature.",
  },
  {
    n: "07",
    tag: "Productive Refusal",
    title: "A system that knows when not to answer is more valuable than one that always does.",
    body: "This is one of the clearest maturity markers in AI product design. A weak AI system always answers. A strong AI system says: I do not have enough evidence. This is based on one partial source. These records conflict. This recommendation needs human review. That is not a failure state. That is trustworthy design.\n\nIn most real products, especially regulated ones, the cost of a wrong answer is higher than the cost of a non-answer. Refusal, escalation, and surfaced uncertainty are part of the product experience. Building them in from the start is what separates a system that earns long-term trust from one that erodes it slowly through confident errors that users eventually stop reporting because they have already stopped trusting.",
  },
  {
    n: "08",
    tag: "Human-in-the-Loop",
    title: "Human review is not anti-AI. It is how AI earns trust in high-stakes domains.",
    body: "The goal of a human-in-the-loop system is not to add a human as a rubber stamp on AI outputs. It is to route decisions to the right decision-maker at the right moment, using automation to handle what is routine so humans can focus on what is genuinely ambiguous. In early versions, human review creates safety and generates training data. Over time, the system can loosen gates only where evidence shows it is reliable.\n\nThe right question is not how do we remove humans. The right question is where does human judgment create the most value, and where can the system safely reduce human effort. I design override mechanisms and escalation flows before I design the automation layer. The override design tells you more about what the system actually believes than the happy path does.",
  },
  {
    n: "09",
    tag: "Evaluation",
    title: "Accuracy is not enough. The metric depends on the cost of being wrong.",
    body: "Real AI evaluation is business-specific. A legal contract system cares deeply about false negatives, a missed clause creates liability. A fraud system cares about precision, too many false alarms destroy analyst trust and investigation throughput. A churn system cares about retained revenue and whether users actually changed behavior. The severity of the error determines the evaluation criteria, not the other way around.\n\nBeyond accuracy: retrieval relevance, confidence calibration, override rate, edit rate, acceptance rate, time saved, escalation rate, downstream business outcome. And online evaluation often beats static benchmarks. When users accept, edit, or override AI output, they are generating the most honest signal about system quality. At Kinage, analyst corrections moved precision from 22% to 50%. That feedback loop was the product.",
  },
  {
    n: "10",
    tag: "Version Strategy",
    title: "V1 proves the loop. V2 earns trust. V3 scales the economics.",
    body: "V1 should be deliberately constrained. Build the simplest loop that tests the riskiest assumption: can we get the right data in, can we retrieve the right context, does the model produce useful output, do users trust it enough to return. Prove that loop manually, with human review, before adding automation or scale.\n\nV2 is about reliability: confidence gates, source citations, human review rules, error taxonomies, contradiction detection, model calibration. Trust is its own product layer and you cannot bolt it on later. V3 is economics: route simple tasks to cheaper models, cache repeated queries, invalidate stale answers, batch non-urgent work, instrument cost per decision not just cost per API call. The order matters. Optimizing cost before reliability is dangerous. You only optimize aggressively after you know exactly what quality you must preserve.",
  },
  {
    n: "11",
    tag: "Tradeoffs",
    title: "Strong AI PMs speak in tradeoffs, not answers.",
    body: "Speed versus reliability. Automation versus human review. Cost versus accuracy. Small model versus large model. Semantic search versus hybrid search. Real-time ingestion versus batch. Precision versus recall. False positives versus false negatives. Vendor speed versus infrastructure control. These are not engineering questions. They are product questions, and the right answer changes depending on the business context, the cost of error, and the current maturity of the system.\n\nStrong AI PMs do not present one perfect answer. They explain why they chose a particular tradeoff given what they know about the domain, the users, and the consequences of failure. That explanation is how you demonstrate that you understand deployment, not just demos. Anyone can pick a model. Knowing which tradeoffs are acceptable in which context is what makes an AI PM worth hiring.",
  },
]

const principleProof: Record<string, { href: string; label: string }> = {
  "01": { href: "/projects/gtm-intelligence-platform", label: "GTM Intelligence Platform →" },
  "02": { href: "/projects/transcript-intelligence", label: "Transcript Intelligence pipeline →" },
  "03": { href: "/projects/kova-bot", label: "Kova credit infrastructure →" },
  "04": { href: "/projects/ai-retrieval-core", label: "AI Retrieval Core →" },
  "05": { href: "/projects/regulatory-compliance-cockpit", label: "Regulatory Compliance Cockpit →" },
  "06": { href: "/projects/llm-reliability", label: "LLM System Reliability →" },
  "07": { href: "/projects/llm-reliability", label: "LLM System Reliability →" },
  "08": { href: "/projects/regulatory-compliance-cockpit", label: "Regulatory Compliance Cockpit →" },
  "09": { href: "/experience", label: "Kinage metrics on Experience →" },
  "10": { href: "/projects/kova-bot", label: "Kova version strategy →" },
  "11": { href: "/projects", label: "All builds and tradeoffs →" },
}

export default function HowIBuild() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>

      <PageHero
        narrow
        size="compact"
        eyebrow="Product Philosophy"
        title={
          <>
            How I Build<br />
            <em>AI Products.</em>
          </>
        }
        description="Eleven principles from building production AI systems, on systems thinking, retrieval quality, confidence routing, evaluation, and the version strategy most teams get backwards."
      >
        <p className="page-hero-desc" style={{ marginTop: 16 }}>
          These are not best practices borrowed from a framework. They come from shipping AI in regulated financial environments, watching systems fail in production, running evals, and rebuilding with better constraints. The through-line: the real product is not the model. The real product is the decision system around it.
        </p>
      </PageHero>

      {/* ── Principles ── */}
      {principles.map((p, i) => (
        <div key={p.n} style={{
          ...SECTION_STYLE,
          display: "grid",
          gridTemplateColumns: "clamp(48px,6vw,80px) 1fr",
          gap: "clamp(24px,4vw,56px)",
          alignItems: "start",
          background: i % 2 === 1 ? "var(--bg2)" : "var(--paper)",
        }}>
          {/* Number */}
          <div style={{
            fontFamily: "var(--font-playfair),serif",
            fontWeight: 900,
            fontSize: "clamp(28px,4vw,52px)",
            color: "color-mix(in srgb, var(--terra) 35%, transparent)",
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
            {principleProof[p.n] && (
              <Link
                href={principleProof[p.n].href}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: 10,
                  letterSpacing: ".08em",
                  color: "var(--terra)",
                  textDecoration: "none",
                }}
              >
                {principleProof[p.n].label}
              </Link>
            )}
          </div>
        </div>
      ))}

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
          See the systems I&apos;ve actually built, or start a conversation.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/projects" className="btn btn--terra">
            View Projects →
          </Link>
          <Link href="/connect" className="btn btn--outline">
            Start a Conversation →
          </Link>
        </div>
      </div>

    </div>
  )
}
