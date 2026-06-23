import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lapo-portfolio-next.vercel.app" }],
        destination: "https://lapoodunjo.com/:path*",
        permanent: true,
      },
      { source: "/projects/kinage-gtm", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/kinage-intelligence", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/kinage-ai-layer", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/kinage-notifications", destination: "/projects/gtm-intelligence-platform", permanent: true },
      { source: "/projects/glean-regulatory", destination: "/projects/regulatory-compliance-cockpit", permanent: true },
    ];
  },
};

export default nextConfig;
