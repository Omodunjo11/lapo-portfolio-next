"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";

/** Signs out non-allowlisted sessions so Kinage (or anyone else) can't linger. */
export default function ForceSignOut({ reason }: { reason?: string }) {
  const { signOut } = useClerk();

  useEffect(() => {
    void signOut({ redirectUrl: "/war-room/unauthorized" });
  }, [signOut]);

  return (
    <div className="wr-sign">
      <div>
        <h1 className="wr-title">
          Access <span>denied</span>
        </h1>
        <p className="wr-sign-note" style={{ maxWidth: 440 }}>
          {reason ||
            "This account is not allowed on Lapo's personal war room. Signing you out."}
        </p>
        <Link href="/" className="wr-btn" style={{ display: "inline-block", marginTop: 16 }}>
          Home
        </Link>
      </div>
    </div>
  );
}
