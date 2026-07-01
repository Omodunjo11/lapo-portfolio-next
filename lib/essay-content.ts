export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "pull"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string }

export const ESSAY_CONTENT: Record<string, EssayBlock[]> = {
  "the-bottleneck-was-never-the-model": [
    {
      type: "p",
      text: "At Wharton I once walked into a classroom holding two nameplates: one folded paper tent that said Onaolapo Odunjo, one black desk plate that said Michael Odunjo. Same person. Different rooms expect different versions of you. I thought about that a lot while shipping Kinage in production and writing MBA papers in the same semester. I did not sleep enough. I also did not stop being the kid from Lagos who reads systems before reading the room.",
    },
    {
      type: "figure",
      src: "/images/personal/wharton-nameplates.jpg",
      alt: "Lapo holding Wharton nameplates for Onaolapo and Michael Odunjo",
      caption: "Onaolapo on paper, Michael on the desk, Lapo in real life.",
    },
    {
      type: "p",
      text: "The first time I watched a hospital nurse ignore an AI recommendation, I assumed the model was wrong. I pulled the logs. I checked the confidence scores. I compared the output to the ground truth the clinical team had agreed on weeks earlier. The model was right. The nurse overrode it anyway, quickly and without drama, the way you dismiss a notification you have learned not to trust.",
    },
    {
      type: "p",
      text: "That was the moment I stopped thinking about AI product work as an accuracy problem.",
    },
    {
      type: "h2",
      text: "The room has a memory",
    },
    {
      type: "p",
      text: "I grew up in Lagos reading systems before I had language for them: why the power cut at certain hours, which market vendors would extend credit and which would not, how ajo groups kept score without a spreadsheet. Bradford taught me a different lesson: being the only one in the room who looks like you means you learn to watch what people do, not just what they say. Philadelphia taught me you can ship production AI and write MBA papers in the same semester if you accept you will not sleep enough.",
    },
    {
      type: "p",
      text: "None of that shows up in a benchmark. All of it shows up when you try to get a regulated institution to act on what your system outputs.",
    },
    {
      type: "pull",
      text: "The bottleneck is never the model. It is whether the person in the room will stake their judgment on what the system says.",
    },
    {
      type: "h2",
      text: "Overrides are data, not failure",
    },
    {
      type: "p",
      text: "At a top-ten U.S. bank, we moved analyst precision on agentic compliance workflows from 22% to 50%. The number that mattered more was override rate: how often experienced analysts rejected the system's recommendation and why. Every override was a signal: ambiguous policy language, a edge case the training set had never seen, a workflow step that added friction without adding trust.",
    },
    {
      type: "p",
      text: "We did not treat overrides as model failures to punish. We treated them as product requirements. Analysts who had spent a decade in that institution knew things the model did not. The job was not to replace that judgment. It was to make the system's recommendations legible enough that judgment could engage with them instead of bypass them.",
    },
    {
      type: "p",
      text: "That is a design problem, a workflow problem, and, if you are honest, a political problem inside the org. Accuracy alone does not solve any of those.",
    },
    {
      type: "h2",
      text: "Adoption is the metric that survives the pilot",
    },
    {
      type: "p",
      text: "I have seen the same pattern in hospitals, banks, and the informal credit systems I studied before co-founding KOVA. The technology that lasts is not the one that demos best. It is the one that fits how people already decide, escalate, and cover their own risk.",
    },
    {
      type: "p",
      text: "In Lagos, credit does not flow because someone built a better risk score. It flows because someone vouches, because repayment history is visible in social context banks cannot see, because the cost of default is reputational before it is financial. Banks pretend credit is math. Markets know it is trust with a ledger attached.",
    },
    {
      type: "p",
      text: "Regulated AI is the same shape in a different costume. A compliance officer overriding your agent is not irrational. They are doing their job: protecting the institution from a system they did not choose, trained on data they do not fully control, making recommendations they will be accountable for.",
    },
    {
      type: "h2",
      text: "What I actually build",
    },
    {
      type: "p",
      text: "When I say I build trust systems, I mean the layer around the model: confidence routing that controls what happens next, not just what gets displayed; productive refusal when the cost of being wrong is asymmetric; evaluation frameworks where the metric depends on who bears the downside.",
    },
    {
      type: "p",
      text: "The nurse who ignored the recommendation was not the enemy of the product. She was the user we had not finished designing for. The analyst who overrode the compliance agent was not blocking progress. She was telling us where the policy was ambiguous and where the UI was asking her to bet her reputation on a black box.",
    },
    {
      type: "p",
      text: "I am not looking for rooms where AI has to sound impressive in a steering committee deck. I am looking for rooms where the hard problem starts after the pilot: when someone has to own adoption, when overrides are the most honest feedback you will ever get, when the model is good enough and the institution still will not move. I want to be the person in the room who can hold both truths: the model is good, and the nurse still will not trust it yet. That is not a failure of engineering. That is the job.",
    },
    {
      type: "p",
      text: "On weekends I am at a Columbia game in a Bleach shirt, or on a ski slope giving a thumbs up after eating snow, or arguing about whether Dembélé and Mbappé are the most exciting forward line in football. None of that is on the résumé. All of it is why I care whether the systems I build get used by real people in real rooms.",
    },
    {
      type: "pull",
      text: "That is the work I want. The bottleneck was never the model.",
    },
  ],
}
