import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Live /_next/image връща 500 на Vercel – Samsung/Android виждат празен/забит екран.
    // Снимките вече са компресирани JPEG (~150–300KB), затова ги сервираме директно.
    unoptimized: true,
  },
};

export default nextConfig;
