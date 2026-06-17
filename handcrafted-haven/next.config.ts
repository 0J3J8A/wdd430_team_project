// next.config.ts
// Configuration for Next.js with image optimization

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "burnishjewelry.com",
      },
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
      },
      {
        protocol: "https",
        hostname: "forgeandlumber.com",
      },
      {
        protocol: "https",
        hostname: "graceandashes.co.uk",
      },
      {
        protocol: "https",
        hostname: "nataliawillmott.co.uk",
      },
      // Required for Unsplash images used in ProductDetailClient
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Required for Google OAuth avatars
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Remove experimental features that cause conflicts
};

export default nextConfig;