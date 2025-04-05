// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
//   experimental: {
//     serverActions: true
//   }
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: [], // Add any external image domains here
  },
  // Enable if you need trailing slashes for o2switch's server config
  // trailingSlash: true,
  experimental: {
    serverActions: false // Disable if using static export
  },
  // Add if deploying to subdirectory (e.g., /blog)
  // basePath: '/subdirectory',
  typescript: {
    ignoreBuildErrors: true, // Ignore les erreurs de type pendant le build
  },
};

module.exports = nextConfig;