/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.filestackcontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
