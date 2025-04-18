/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,  // Désactive la vérification ESLint pendant le build
  },
  /* images: {
    disableStaticImages: true, // Désactive les avertissements sur l'utilisation de <img>
  }, */
  typescript: {
    // Désactive la vérification des types pour le build
    ignoreBuildErrors: true,
  },
};
 
module.exports = nextConfig;
