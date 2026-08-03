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

Edit each company in `recruiting-season/schema/pipeline.json`:

```json
"drive": {
  "folderUrl": "https://drive.google.com/drive/folders/...",
  "prepUrl": "https://docs.google.com/document/d/...",
  "note": ""
}
```

Then `npm run dogfood:pull` and redeploy.

## Ingest

Gmail ingest defaults to **interview-only** (not applications).
