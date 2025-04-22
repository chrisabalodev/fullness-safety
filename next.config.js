/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'example.com', 
      'fullness-safety.com',
      'www.fullness-safety.com',
      'images.unsplash.com',
      's02.swdrive.fr'
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;