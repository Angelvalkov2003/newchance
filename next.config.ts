import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Без 2048/3840 – на телефони с висок DPR иначе се теглят огромни файлове и Android зависва
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
