import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-expect-error - Cette option existe bien mais les types TS ne sont pas à jour
    allowedDevOrigins: ["localhost:3000", "192.168.1.3:3000"],
  },
};

export default nextConfig;