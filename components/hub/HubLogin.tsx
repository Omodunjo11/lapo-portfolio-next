"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HubLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/hub/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error === "not_configured"
            ? "Hub password isn't set up yet — add HUB_PASSWORD_HASH in Vercel env vars."
            : "Wrong password"
        );
      }
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wr-sign">
      <form onSubmit={submit}>
        <p className="wr-eyebrow">Private</p>
        <h1 className="wr-title">
          The <span>Hub</span>
        </h1>
        <p className="wr-sign-note">Password-protected. Not linked from anywhere public.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="hub-login-input"
        />
        {error ? <p className="wr-error">{error}</p> : null}
        <button type="submit" className="wr-btn" disabled={loading} style={{ marginTop: 16 }}>
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
