import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Serve AVIF first, then WebP (Framer only served WebP)
    formats: ["image/avif", "image/webp"],
  },
  // Framer served this page as /trade-validator/gold/ — keep the trailing slash so URLs don't change.
  trailingSlash: true,
  async redirects() {
    // Only the Gold validator exists; send the bare domain there.
    return [{ source: "/", destination: "/trade-validator/gold/", permanent: false }];
  },
};

export default nextConfig;
