# Private recruiting war room

URL (after deploy + Clerk): https://lapoodunjo.com/war-room

## What it is

Kanban funnel: **Applied → 1st → 2nd → 3rd → 4th → Final**  
Data from `data/recruiting-pipeline.json` (synced from `~/projects/recruiting-season`).  
Each card can link to a Google Drive folder / prep doc.

## Clerk setup (you — do not put passwords in git)

1. Create app at [dashboard.clerk.com](https://dashboard.clerk.com)
2. Add paths: sign-in `/war-room/sign-in`, after sign-in `/war-room`
3. **Disable public sign-ups** (Settings → restrictions) so only you exist
4. Create your user with email `odunjoonaolapo@gmail.com` and set your password **in Clerk** (password manager)
5. Copy Publishable + Secret keys into:
   - `.env.local` locally
   - Vercel → lapo-portfolio-next → Environment Variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
RECRUITING_ALLOWED_EMAILS=odunjoonaolapo@gmail.com
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/war-room/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/war-room
```

**Security:** Never commit a password. If you typed a password in chat, rotate it in Clerk after setup.

## In-app editing (no more hand-editing JSON)

Each card on the board has an **Edit** button — stage, stage label, next
action, due date, and nudge date can be changed right from `/war-room`. Saving
commits the updated `data/recruiting-pipeline.json` straight to `main` via
the GitHub API, which kicks off a normal Vercel deploy — expect ~30-60s
before the change shows up (refresh the page after that).

Companies marked `passed` or `ghosted` drop out of the active funnel and
collect in a collapsible **Archived** section at the bottom of the board,
instead of disappearing. Anything with a `due` or `nudgeDate` on or before
today surfaces in a red **Needs attention today** banner at the top.

Requires one more env var beyond Clerk's:

```bash
GITHUB_PIPELINE_TOKEN=github_pat_...
```

Create a fine-grained GitHub PAT scoped to just this repo
(`Omodunjo11/lapo-portfolio-next`) with **Contents: Read and write**
permission, then add it to Vercel → lapo-portfolio-next → Environment
Variables. Without it, `/api/war-room/pipeline` returns a `commit_failed`
error and the Edit form's save button will show it inline.

## Sync pipeline → portfolio

From recruiting-season:

```bash
npm run dogfood:pull   # also copies to Desktop/lapo-portfolio-next/data/
```

Then commit + deploy the portfolio so Vercel gets the new JSON.

## Drive links

Root Recruiting Season folder:

```json
"driveRootUrl": "https://drive.google.com/drive/folders/..."
```

Optional per-company folders / prep docs in `recruiting-season/schema/pipeline.json`:

```json
"drive": {
  "folderUrl": "https://drive.google.com/drive/folders/...",
  "prepUrl": "https://docs.google.com/document/d/...",
  "note": ""
}
```

Then `npm run dogfood:pull` and redeploy. War Room cards fall back to `driveRootUrl` when a company has no `folderUrl`.

## Ingest (Gmail + Calendar in War Room)

War Room can scan your inbox from the site:

1. **Scan inbox** button on `/war-room`
2. **GitHub Actions** every **6 hours** (`.github/workflows/war-room-scan.yml`)
   — needs repo secret `CRON_SECRET` (same value as Vercel). Manual: **Actions → War Room Gmail scan → Run workflow**.
3. **Vercel Cron** daily backup at 08:00 America/New_York (`0 12 * * *` UTC)
   — Hobby plan only allows daily; the 6h cadence is via GitHub.
4. **Mac LaunchAgent** (local) still propose-scans every ~3h via
   `npm run schedule:install` in recruiting-season.

Interview / process signals (not applications). Matches tracked companies by alias.
Also searches **Gmail Spam** for tracked-company aliases (Hang Ten has landed there).
Process taxonomy is wide: **NDA**, next step/stage/round, move forward, HM/COO/exec,
onsite/loop/panel, take-home/work sample, reference/offer process, meet-the-team.

Each Gmail hit is fetched as **full message** and classified on subject + body
(not snippet alone). A second query pulls recent tracked-company mail by **company
name / domain** (not loose first-name aliases) so keyword OR gaps cannot hide
process notes. Short person aliases (e.g. Michal, Kelsey) only match the From header.

**Prep decks:** Scan stays fast (stubs + Drive map). Claude prep runs via
`POST /api/war-room/prep` — GitHub Actions calls it after each automatic scan for
up to 3 advance companies, and the War Room **Scan inbox** button requests
`claudePrep` for one advance inline when possible.
Set `ANTHROPIC_API_KEY` on Vercel. Optional: `ANTHROPIC_PREP_MODEL`
(default `claude-haiku-4-5-20251001`). Rich hand briefs are kept unless a new
interviewer name appears.

Scan cadence: button anytime; Actions ~every 6h; Vercel daily backup.

Behavior:
- Calendar high-confidence interviews → write event facts into the pipeline (due / next action). **Does not move funnel stage.**
- Gmail reject / schedule / advance → show as **Flags** you Accept or Dismiss.
- Stage moves only when you Accept a flag or drag/edit a card.
- Reject flags require hard close language. Bare "Unfortunately" is never enough. Scheduling conflicts that offer new times are schedule, not reject. See `recruiting-season/_shared/email-signal-rules.md`.

Requires (from local recruiting-season `.credentials/`):

```bash
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GMAIL_INGEST_DAYS=7
CRON_SECRET=long-random-string
ANTHROPIC_API_KEY=sk-ant-...
# optional:
# ANTHROPIC_PREP_MODEL=claude-haiku-4-5-20251001
```

Copy client id/secret from `google-client.json` and `refresh_token` from
`google-token.json` into Vercel env (Production + Preview). Never commit those files.
Also set `ANTHROPIC_API_KEY` on Vercel so Scan can LLM-write prep decks.

## Briefs (Now + Next)

Markdown briefs live in `data/briefs/` (synced from recruiting-season). Upcoming
rows link to `/war-room/brief/<slug>`. Each brief has a **Now** layer (this
interview) and a **Next** layer (loop map + prep bank).

## Debrief

Use **Debrief** on an upcoming/recent call. Saves `data/debriefs/<company>-<date>.md`,
marks the event done, and updates next action. Refresh after deploy (~30–60s).

## Chase queue

`chase[]` in the pipeline powers the dated nudge list with copyable drafts.

## Drive + auto prep decks

Root folder: `driveRootUrl` on the pipeline.

On each **Scan inbox** (and ~6h / daily automatic scans):

1. Lists company subfolders under the Recruiting Season Drive root
2. Maps them onto `companies[].drive.folderUrl`
3. For every **scheduled** interview missing rich prep, Claude writes a Now+Next
   deck (stub fallback) → local brief + Google Doc (`prepUrl`, updated in place when possible)
4. For **advance** emails (next steps / NDA / HM), also writes `data/briefs/next-<company>.md`
   even when the calendar invite is not on file yet

Requires Google OAuth with **Drive** scope (plus existing Gmail + Calendar).
Re-auth locally:

```bash
cd ~/projects/recruiting-season
npm run gmail:auth   # consent to Drive when prompted
```

Then copy the new `refresh_token` from `.credentials/google-token.json` into
Vercel `GOOGLE_REFRESH_TOKEN` and redeploy. Enable **Google Drive API** on the
GCP project if create fails.

## Sync from recruiting-season

```bash
npm run portfolio:sync   # merges season → portfolio (keeps extra companies) + copies briefs
```

Local Mac LaunchAgent ingest remains optional; the site no longer depends on it.
