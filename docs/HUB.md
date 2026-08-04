# The Hub (private, Clerk-gated)

URL: https://lapoodunjo.com/hub

## What it is

One combined board for everything that isn't recruiting — habits, side
projects, writing ideas, life admin, reading — instead of a separate board
per category. Three columns: **Backlog → Active → Done**, each item tagged
with a category badge. Same "needs attention today" pattern as the war room:
anything with a `due` date today or earlier surfaces in a banner at the top.

Data lives in `data/hub.json`. Editing (add/edit/delete items) happens
in-app and commits straight to that file via the GitHub API — same
mechanism as the war room's `/war-room` edit forms, just pointed at a
different file (see `lib/git-store.ts`, shared by both).

It is **not** linked from anywhere on the public site and is `noindex`.

## Auth: same session as War Room

`/hub` uses the exact same Clerk session and allowlist as `/war-room`
(`requireRecruitingAccess()` / `emailAllowed()` in `lib/recruiting/access.ts`)
— no separate password, no separate sign-in. Sign in once on either page and
both are open; the middleware protects `/hub(.*)` the same way it protects
`/war-room(.*)`.

No extra env vars beyond what Clerk already needs
(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) and what the write
API needs (`GITHUB_PIPELINE_TOKEN` — see `docs/WAR_ROOM.md`).

Cross-links: once signed in, War Room's header has a "Hub" link and Hub's
header has a "War Room" link, so you don't have to remember both URLs.

## Notes

- Same 30-60s lag as the war room's edit forms: a save commits to `main`
  and Vercel rebuilds before the change shows up. Refresh after a bit.
- Categories and stages are fixed (`lib/hub/types.ts`) — add a category by
  extending `CATEGORIES` there, not per-item.
