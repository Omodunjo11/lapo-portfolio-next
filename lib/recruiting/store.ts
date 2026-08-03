import type { Pipeline } from "./types";

const OWNER = "Omodunjo11";
const REPO = "lapo-portfolio-next";
const BRANCH = "main";
const FILE_PATH = "data/recruiting-pipeline.json";

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;

function githubHeaders() {
  const token = process.env.GITHUB_PIPELINE_TOKEN;
  if (!token) {
    throw new Error(
      "GITHUB_PIPELINE_TOKEN is not set — add a fine-grained PAT with contents:write on this repo to Vercel env vars."
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

/** Commit an updated pipeline back to data/recruiting-pipeline.json on `main`. */
export async function commitPipeline(
  next: Pipeline,
  message: string
): Promise<void> {
  const headers = githubHeaders();

  const shaRes = await fetch(`${API_BASE}?ref=${BRANCH}`, { headers });
  if (!shaRes.ok) {
    throw new Error(
      `Failed to read current pipeline file from GitHub: ${shaRes.status} ${await shaRes.text()}`
    );
  }
  const { sha } = (await shaRes.json()) as { sha: string };

  const content = Buffer.from(JSON.stringify(next, null, 2) + "\n").toString(
    "base64"
  );

  const putRes = await fetch(API_BASE, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ message, content, sha, branch: BRANCH }),
  });
  if (!putRes.ok) {
    throw new Error(
      `Failed to commit pipeline update: ${putRes.status} ${await putRes.text()}`
    );
  }
}
