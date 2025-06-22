/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ allow cloudinary image host
  },
};

module.exports = nextConfig;
