import Anthropic from "@anthropic-ai/sdk";

export function anthropicConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
}

export function getAnthropic() {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY");
  return new Anthropic({ apiKey, timeout: 45_000 });
}

/** Fast enough for scan path; prep writing defaults to Sonnet for Brain Co quality. */
export function prepModel() {
  return (
    process.env.ANTHROPIC_PREP_MODEL?.trim() || "claude-sonnet-4-5-20250929"
  );
}
