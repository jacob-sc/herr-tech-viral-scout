import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["apify-client", "better-sqlite3"],
  // Allow Cloudflare Tunnel + LAN access during dev-mode demos.
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "192.168.178.43",
  ],
};

export default nextConfig;
