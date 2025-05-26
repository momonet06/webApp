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
        destination:
          "https://automatic-power-afee843d76.strapiapp.com/uploads/:path*",
      },
      {
        source: "/api/:path*",
        destination:
          "https://automatic-power-afee843d76.strapiapp.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
