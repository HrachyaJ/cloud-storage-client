// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["antd"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7777",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
