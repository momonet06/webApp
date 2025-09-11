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
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/:path*",
          destination: process.env.NEXT_PUBLIC_BASE_URL + "/api/:path*",
        },
        {
          source: "/uploads/:path*",
          destination: process.env.NEXT_PUBLIC_BASE_URL + "/uploads/:path*",
        },
      ],
    };
  },
};

export default withRspack(nextConfig);
