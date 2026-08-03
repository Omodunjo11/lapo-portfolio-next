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
