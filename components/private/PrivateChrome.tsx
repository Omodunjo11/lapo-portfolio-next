"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export type PrivateArea = "hub" | "war-room";

const SEGMENTS: {
  id: "home" | PrivateArea;
  href: string;
  label: string;
  hint: string;
}[] = [
  { id: "home", href: "/", label: "Home", hint: "Site" },
  { id: "hub", href: "/hub", label: "Hub", hint: "Life OS" },
  { id: "war-room", href: "/war-room", label: "War Room", hint: "Recruiting" },
];

export default function PrivateChrome({ active }: { active: PrivateArea }) {
  return (
    <header className={`priv-chrome priv-chrome--${active}`}>
      <div className="priv-chrome-left">
        <p className="priv-chrome-mark">
          {active === "hub" ? "Personal OS" : "Recruiting"}
        </p>
        <nav className="priv-seg" aria-label="Personal areas">
          {SEGMENTS.map((s) => {
            const current = s.id === active;
            return (
              <Link
                key={s.id}
                href={s.href}
                className={`priv-seg-item${current ? " is-active" : ""}`}
                aria-current={current ? "page" : undefined}
                title={s.hint}
              >
                <span className="priv-seg-label">{s.label}</span>
                <span className="priv-seg-hint">{s.hint}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="priv-chrome-actions">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button type="button" className="wr-btn">
              Sign in
            </button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
