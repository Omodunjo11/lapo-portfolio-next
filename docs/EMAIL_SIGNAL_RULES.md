# Email signal rules (never false-reject live loops)

Incident: Aug 4, 2026. Invisible Kate Alvarico wrote that they could not confirm a time with Ranjani in Lapo's offered windows and asked about Aug 7. War Room classified this as reject because the email started with "Unfortunately".

Truth: scheduling conflict / reschedule. Lapo accepted Aug 7. Kate confirmed Ranjani at 10:30am ET and said invite would follow. Process is alive.

## Hard rules for humans and agents

1. Read the full thread (and full body when the scanner has it), not one keyword.
2. Bare "Unfortunately" is never a reject by itself.
3. If the email offers new times, asks for availability, names an interviewer, or promises an invite, classify as schedule, never reject.
4. Reject only on hard close language: not moving forward, other candidates selected, position filled, no longer under consideration, will not be advancing.
5. Pipeline stage never auto-moves to passed. Flags require Accept. If a reject flag looks wrong, Dismiss it and fix the classifier if needed.
6. Scheduling conflict language often includes soft apology words. Prefer process outcome over tone.
7. **Same-round logistics are not stage advances.** Calendar invites, interview confirmations, updated invitations, and reminders that only name a COO / hiring manager / panel are `schedule` (or ignored for stage flags). Stage-advance flags require explicit progression language (`next steps`, `next round`, `move forward`, NDA, take-home, offer, etc.).
8. **Re-scan is not re-advance.** Stage-move flags are only created when Scan discovers a *new* message/thread. They live in `pendingFlags` until Accept/Dismiss. Reloading the page or re-scanning the same inbox must not rebuild “→ next round” from old Gmail.

## Classifier ownership

- Portfolio War Room: `lapo-portfolio-next/lib/recruiting/gmail/classify.ts`
- Process taxonomy (next-step vocabulary): `lib/recruiting/gmail/taxonomy.ts`
- Season ingest mirror: `recruiting-season/scripts/gmail/lib.mjs`
Keep classify + season mirror in sync when changing reject/schedule rules.
Expand next-step vocabulary in `taxonomy.ts` first.

## When scanning email manually

Before telling Lapo a company is rejected, answer all four:

1. Does the email close the candidacy, or only fail a time window?
2. Is there an ask for new times, a named next interviewer, or an upcoming invite?
3. Did Lapo already reply keeping the loop open?
4. Quote the exact close sentence before changing stage to passed.

If any of 1-3 point to continuity, status stays live.
