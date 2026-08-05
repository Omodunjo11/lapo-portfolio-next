# Foundation Health: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: AI / Product Manager. Living notes. Stage: Round 1 complete (Jack Leeming); Round 2 pending (Steve Charette).

When: Mon, Aug 3, 2026, 11:30 AM ET
With: Jack Leeming (1st conversation done; notes to follow)
Calendar: Onaolapo Michael Odunjo and Jack Leeming

## Goal for this conversation

Understand Foundation Health's AI deployment model, product constraints in healthcare, and where they see friction in scaling AI across their network. Signal that you ship under incomplete specs, own cost-to-serve, and translate field failures into product decisions. Leave Jack with confidence you can move fast without breaking trust or compliance.

## What they are testing

- Shipping velocity in a regulated environment: healthcare moves slower than SaaS; can you hold both speed and precision?
- Cost discipline: AI is expensive; do you think about unit economics and deployment efficiency?
- Field reality: do you listen to what breaks in production, or do you design from theory?
- Judgment under pressure: healthcare has real downside; do you protect the business and speak risk clearly?
- Team leverage: can you scale through others, or do you need to be the hero?

## Opening (~20 seconds)

"Thanks for taking the time, Jack. I've spent the last few years shipping AI into regulated environments,banks, mostly,where precision and cost-to-serve are non-negotiable. I'm curious how Foundation Health thinks about those same constraints in healthcare, and where you see the biggest friction in scaling AI across your network."

## Lines to land

1. At Kinage, I owned multi-account AI deployment end-to-end. We cut cost-to-serve by about 62 percent by rethinking how we staged rollouts and coached the technical teams on the ground. The leverage came from playbooks and ownership, not headcount.

2. In regulated work, eval gates and production quality bars aren't bureaucracy,they're how you catch field failures before they hit patients or compliance. I've built systems that feed production failures back into product decisions fast.

3. I ship incomplete specs. We cut scope, measure adoption, and iterate. The risk is not shipping; the risk is shipping the wrong thing at scale. Speed and precision aren't opposites if you're honest about what you don't know.

4. When I've had to push back on timelines or scope, I've always led with outcomes and risk, not emotion. Healthcare probably has the same dynamic: leadership wants speed, but the downside of a bad deployment is real.

5. I don't overclaim domain depth. I know regulated environments and AI deployment. I don't know healthcare reimbursement or clinical workflows in detail. I learn fast and ask good questions.

## Stories to have ready

### Kinage: Cost-to-serve and team leverage

Situation: We had deployed AI across 12 institutions. Each one had different infrastructure, different data pipelines, different operational maturity. Cost per account was high and not scaling.

Decision: Instead of building a one-size-fits-all platform, I mapped the failure modes in each deployment, coached the technical teams on the ground to own their own rollouts, and built playbooks that let them self-serve. I stayed in the loop on precision and compliance gates.

Result: Cost-to-serve dropped about 62 percent. Institutions moved faster because they owned the work. We scaled to 12 without adding proportional headcount.

### Bank work: Field failures into product

Situation: We had a precision gate that looked good in testing. First production deployment, a specific edge case in the data pipeline caused false positives. The field team caught it before it hit customers, but it was a close call.

Decision: I built a feedback loop: every production failure, no matter how small, came back to Product. We changed the eval gate to catch that edge case, and we added a staging step that let field teams test their specific data before full rollout.

Result: No repeat failures. The team trusted the gates because they saw us fix them fast. Compliance was tighter, not slower.

### Incomplete-info shipping

Situation: We had a spec for a new deployment workflow, but it was incomplete. We didn't have full clarity on how field teams would integrate it into their ops. Waiting for perfect specs meant a three-month delay.

Decision: I cut scope to the core workflow, shipped it, and measured adoption. The field teams told us what was missing in two weeks of real use.

Result: We iterated faster and built what they actually needed, not what we guessed they needed.

## Questions to ask

1. How do you think about the tradeoff between shipping speed and the precision bar in healthcare? Where does Foundation Health feel the most pressure?

2. When an AI deployment fails in the field,wrong prediction, integration issue, whatever,how does that feedback get back to Product? Who owns the loop?

3. What's the biggest friction point you see in scaling AI across your network right now? Is it technical, operational, or something else?

## Don't

- Overclaim healthcare domain knowledge. You don't have it. Say so.
- Use jargon to sound smart. Regulated environments are jargon-heavy; resist it.
- Promise speed without mentioning precision or risk. Healthcare has real downside.
- Talk about your MBA or credentials. Talk about what you shipped.
- Assume Foundation Health's constraints are the same as banking. Ask.
- Ramble on AI hype. They know what AI is. They want to know if you can deploy it.

## Loop map

Jack Leeming (1st round, done) -> Steve Charette (2nd round, pending) -> likely final round or offer signal.

## Prep bank

- Kinage: 0 to 12 institutions, 62 percent cost reduction, playbooks, team coaching.
- Bank: eval gates, precision, production quality bar, field failure loops.
- Incomplete-info shipping: cut scope, measure adoption, iterate.
- Judgment under pressure: calm, risk-forward, outcomes-focused.
- Honest gaps: healthcare reimbursement, clinical workflows, regulatory specifics beyond general regulated-environment experience.

## After the call

- Write down Jack's answers to your three questions. What's the real constraint? Where does the feedback loop break?
- Note any healthcare domain terms or workflows you don't know. Research them before Steve.
- If Jack mentions a specific deployment failure or friction point, ask Steve about it in round 2. Shows you listened.
- Assess: does Foundation Health move fast or slow? Do they listen to the field? Is the AI strategy clear, or are they still figuring it out?

## Action items

- Follow up with Jack within 24 hours. Thank him, confirm Steve's calendar.
- Before Steve's call, research Foundation Health's recent AI announcements or deployments.
- Prepare one more story about navigating a hard tradeoff between speed and risk. You'll need it.

This is a living document. Add new notes here after every Foundation Health conversation so the next round always has the full picture in one place.
