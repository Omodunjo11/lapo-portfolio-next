/** First segment of a project role line, e.g. "Co-Founder" from "Co-Founder · …". */
export function projectRoleLead(role: string): string {
  const lead = role.split("·")[0]?.trim()
  return lead || role
}
