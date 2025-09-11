import withRspack from "next-rspack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typedRoutes: true,
  transpilePackages: ["lucide-react"],
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    reactCompiler: true,
    optimizeRouterScrolling: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "*",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    qualities: [25, 50, 75, 80, 90, 100],
  },
};

export default withRspack(nextConfig);
