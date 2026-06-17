// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
  /* config options here */
// };

// export default nextConfig;


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
    ],
  },
};

export default nextConfig;