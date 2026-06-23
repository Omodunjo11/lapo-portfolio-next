import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/kinage-gtm", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/kinage-intelligence", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/kinage-ai-layer", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/kinage-notifications", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/glean-regulatory", destination: "/projects/regulatory-compliance-cockpit", permanent: true },
    ];
  },
};

export default nextConfig;
