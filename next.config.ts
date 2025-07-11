/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    // ✅ Prevent Next.js from modifying your tsconfig
    tsconfigPath: "./tsconfig.json",
  },
};

module.exports = nextConfig;
