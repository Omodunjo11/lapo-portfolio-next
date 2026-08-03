import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "War Room · Sign in",
  robots: { index: false, follow: false },
};

export default function WarRoomSignInPage() {
  return (
    <div className="wr-sign">
      <div>
        <p className="wr-eyebrow">Private</p>
        <h1 className="wr-title" style={{ marginBottom: 24 }}>
          Recruiting <span>War Room</span>
        </h1>
        <SignIn
          routing="path"
          path="/war-room/sign-in"
          forceRedirectUrl="/war-room"
        />
        <p className="wr-sign-note">
          Personal login only. Use your Clerk email/password (set in Clerk dashboard
          — never commit passwords to the repo).
        </p>
      </div>
    </div>
  );
}
