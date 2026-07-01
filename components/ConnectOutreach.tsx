import { INTRO_FOR_NETWORK, LINKEDIN_HEADLINE } from "@/lib/positioning"

export default function ConnectOutreach() {
  return (
    <div className="connect-outreach">
      <p className="connect-outreach__eyebrow">For intros &amp; LinkedIn</p>
      <div className="connect-outreach__grid">
        <div className="connect-outreach__card">
          <p className="connect-outreach__label">LinkedIn headline</p>
          <p className="connect-outreach__copy">{LINKEDIN_HEADLINE}</p>
        </div>
        <div className="connect-outreach__card">
          <p className="connect-outreach__label">When someone asks how you know me</p>
          <p className="connect-outreach__copy">{INTRO_FOR_NETWORK}</p>
        </div>
      </div>
    </div>
  )
}
