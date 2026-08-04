/**
 * One-shot: map Recruiting Season Drive folders → pipeline.drive.folderUrl
 * and create missing Google Doc prep decks for scheduled interviews.
 *
 * Usage (from portfolio root, with env loaded):
 *   node --env-file=.env.local --import tsx lib/...  (or call via API)
 *
 * Prefer War Room "Scan inbox" after GOOGLE_REFRESH_TOKEN includes Drive scope.
 */
console.log(
  "Use War Room Scan inbox after re-auth with Drive scope. Local helper: npm run gmail:auth in recruiting-season."
);
