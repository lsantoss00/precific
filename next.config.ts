import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  webpack(config, { dev }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!dev) {
      config.infrastructureLogging = { level: "error" };
    }

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "i.ytimg.com" },
      { hostname: "*.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },
  experimental: {
    globalNotFound: true,
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
