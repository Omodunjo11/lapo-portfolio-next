# The Hub (private, password-gated)

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

## Auth: password, not Clerk

Unlike `/war-room`, `/hub` doesn't use Clerk — it's a single shared
password, hashed and checked server-side, backing a signed session cookie.
No new accounts, no sign-up flow, nothing tied to your email.

Two env vars, on top of the `GITHUB_PIPELINE_TOKEN` you already set up for
the war room:

```bash
HUB_PASSWORD_HASH=scrypt$...
HUB_SESSION_SECRET=<random hex string>
```

**Generate them locally — never paste the plaintext password into chat or a
commit.** Run this on your machine:

```bash
node -e "
const { randomBytes, scryptSync } = require('crypto');
const password = process.argv[1];
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log('scrypt\$' + salt.toString('hex') + '\$' + hash.toString('hex'));
" "your-password-here"
```

Copy the `scrypt$...` output into `HUB_PASSWORD_HASH`. Then generate the
session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add both to Vercel → lapo-portfolio-next → Environment Variables, then
redeploy. Until `HUB_PASSWORD_HASH` is set, the login form shows "Hub
password isn't set up yet" instead of accepting anything.

The session cookie (`hub_auth`) lasts 30 days and is HttpOnly + Secure.
"Sign out" on the board clears it immediately.

## Notes

- Same 30-60s lag as the war room's edit forms: a save commits to `main`
  and Vercel rebuilds before the change shows up. Refresh after a bit.
- Categories and stages are fixed (`lib/hub/types.ts`) — add a category by
  extending `CATEGORIES` there, not per-item.
