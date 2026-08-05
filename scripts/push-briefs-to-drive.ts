/**
 * Push local data/briefs/next-*.md (and dated siblings) into existing Drive prep docs.
 * Usage: npx tsx --env-file=.env.regen scripts/push-briefs-to-drive.ts
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getRecruitingPipeline } from "../lib/recruiting/pipeline";
import {
  createPrepDoc,
  docIdFromUrl,
  folderIdFromUrl,
  listChildFolders,
  mapCompanyFolders,
  updatePrepDoc,
} from "../lib/recruiting/drive";

async function main() {
  let pipeline = getRecruitingPipeline();
  const folders = await listChildFolders();
  const mapped = mapCompanyFolders(pipeline, folders);
  pipeline = mapped.pipeline;
  console.log("Mapped folders:", mapped.mapped);

  for (const company of pipeline.companies) {
    const nextPath = join(process.cwd(), "data", "briefs", `next-${company.id}.md`);
    if (!existsSync(nextPath)) {
      console.log(`skip ${company.id}: no next brief`);
      continue;
    }
    const text = readFileSync(nextPath, "utf8");
    const folderId = folderIdFromUrl(company.drive?.folderUrl);
    if (!folderId) {
      console.log(`skip ${company.id}: no folder`);
      continue;
    }
    const existingId = docIdFromUrl(company.drive?.prepUrl);
    if (existingId) {
      await updatePrepDoc({ docId: existingId, plainText: text });
      console.log(`updated Drive ${company.id}`);
      continue;
    }
    const doc = await createPrepDoc({
      folderId,
      title: `Interview notes: ${company.name}`,
      plainText: text,
    });
    company.drive = {
      ...(company.drive || {}),
      folderUrl: company.drive?.folderUrl,
      prepUrl: doc.webViewLink,
      note: "Living-notes prep",
    };
    console.log(`created Drive ${company.id}`);
  }

  const { writeFileSync } = await import("node:fs");
  writeFileSync(
    join(process.cwd(), "data", "recruiting-pipeline.json"),
    `${JSON.stringify(pipeline, null, 2)}\n`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
