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

export type GithubFile = {
  sha: string;
  content: string;
};

/** Read a utf8 file from `main`. Returns null if missing. */
export async function readTextFileFromGitHub(
  filePath: string
): Promise<GithubFile | null> {
  const headers = githubHeaders();
  const res = await fetch(`${apiBase(filePath)}?ref=${BRANCH}`, { headers });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `Failed to read ${filePath} from GitHub: ${res.status} ${await res.text()}`
    );
  }
  const data = (await res.json()) as { sha: string; content: string; encoding?: string };
  const content = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString(
    "utf8"
  );
  return { sha: data.sha, content };
}

export async function readJsonFileFromGitHub<T>(
  filePath: string
): Promise<{ sha: string; data: T } | null> {
  const file = await readTextFileFromGitHub(filePath);
  if (!file) return null;
  return { sha: file.sha, data: JSON.parse(file.content) as T };
}

/** Commit a JSON value to `filePath` on `main` via the GitHub Contents API. */
export async function commitJsonFile(
  filePath: string,
  next: unknown,
  message: string
): Promise<void> {
  await commitTextFile(
    filePath,
    JSON.stringify(next, null, 2) + "\n",
    message
  );
}

/** Commit utf8 text (markdown, etc.) to `filePath` on `main`. Retries on SHA conflicts. */
export async function commitTextFile(
  filePath: string,
  text: string,
  message: string
): Promise<void> {
  const headers = githubHeaders();
  const base = apiBase(filePath);
  const content = Buffer.from(text, "utf8").toString("base64");

  let lastErr = "";
  for (let attempt = 0; attempt < 4; attempt++) {
    const shaRes = await fetch(`${base}?ref=${BRANCH}`, { headers });
    let sha: string | undefined;
    if (shaRes.ok) {
      sha = ((await shaRes.json()) as { sha: string }).sha;
    } else if (shaRes.status !== 404) {
      throw new Error(
        `Failed to read ${filePath} from GitHub: ${shaRes.status} ${await shaRes.text()}`
      );
    }

    const putRes = await fetch(base, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content,
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });

    if (putRes.ok) return;

    lastErr = `${putRes.status} ${await putRes.text()}`;
    // 409 = someone else committed; refetch sha and retry.
    if (putRes.status === 409 || putRes.status === 422) {
      await new Promise((r) => setTimeout(r, 150 * (attempt + 1)));
      continue;
    }
    throw new Error(`Failed to commit ${filePath}: ${lastErr}`);
  }

  throw new Error(`Failed to commit ${filePath} after retries: ${lastErr}`);
}
