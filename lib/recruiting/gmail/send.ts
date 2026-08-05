import { getGmailClient } from "./client";

function toBase64Url(raw: string) {
  return Buffer.from(raw)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Send a plain-text email from the configured Gmail account to itself or another address. */
export async function sendPlainEmail(opts: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const gmail = getGmailClient();
  const raw = toBase64Url(
    [
      `To: ${opts.to}`,
      `Subject: ${opts.subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "MIME-Version: 1.0",
      "",
      opts.text,
    ].join("\r\n")
  );
  await gmail.users.messages.send({ userId: "me", requestBody: { raw } });
}
