/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.backblazeb2.com',
      },
    ],
  },
};

module.exports = nextConfig
