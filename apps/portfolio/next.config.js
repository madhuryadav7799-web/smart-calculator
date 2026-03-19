/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  pageExtensions: ['ts', 'tsx'],
  poweredByHeader: false,
};

module.exports = nextConfig;
