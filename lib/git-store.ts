const OWNER = "Omodunjo11";
const REPO = "lapo-portfolio-next";
const BRANCH = "main";

function apiBase(filePath: string) {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
}

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

/** Commit a JSON value to `filePath` on `main` via the GitHub Contents API. */
export async function commitJsonFile(
  filePath: string,
  next: unknown,
  message: string
): Promise<void> {
  const headers = githubHeaders();
  const base = apiBase(filePath);

  const shaRes = await fetch(`${base}?ref=${BRANCH}`, { headers });
  if (!shaRes.ok) {
    throw new Error(
      `Failed to read ${filePath} from GitHub: ${shaRes.status} ${await shaRes.text()}`
    );
  }
  const { sha } = (await shaRes.json()) as { sha: string };

  const content = Buffer.from(JSON.stringify(next, null, 2) + "\n").toString(
    "base64"
  );

  const putRes = await fetch(base, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ message, content, sha, branch: BRANCH }),
  });
  if (!putRes.ok) {
    throw new Error(
      `Failed to commit ${filePath}: ${putRes.status} ${await putRes.text()}`
    );
  }
}
