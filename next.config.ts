import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:1337/uploads/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:1337/api/:path*",
      },
    ];
  },
};

export default nextConfig;
