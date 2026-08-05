import Anthropic from "@anthropic-ai/sdk";

export function anthropicConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export function getAnthropic(timeoutMs = 35_000) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  // Keep under Vercel function budgets; update model should finish much faster.
  return new Anthropic({ apiKey, timeout: timeoutMs });
}

/** Full living-notes drafts stay on Sonnet; in-place Updates use a faster model. */
export function prepModel(mode: "full" | "update" = "full") {
  if (mode === "update") {
    return (
      process.env.ANTHROPIC_PREP_UPDATE_MODEL?.trim() ||
      process.env.ANTHROPIC_PREP_MODEL?.trim() ||
      "claude-haiku-4-5-20251001"
    );
  }
  return (
    process.env.ANTHROPIC_PREP_MODEL?.trim() || "claude-sonnet-4-5-20250929"
  );
}
