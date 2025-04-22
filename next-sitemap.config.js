// next-sitemap.config.js
const path = require('path');

module.exports = {
  siteUrl: 'https://www.fullness-safety.com',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*', // Exclure toutes les pages d'admin
    '/page.tsx', // Exclure les fichiers techniques
    '/*\\*' // Exclure les chemins avec backslashes
  ],
  transform: async (config, path) => {
    // Normalise les chemins (remplace \ par /)
    const normalizedPath = path.replace(/\\/g, '/').replace('/page.tsx', '');
    
    // Exclut les routes non désirées
    if (normalizedPath.includes('admin') || normalizedPath === '') return null;
    
    return {
      loc: normalizedPath === '/' ? '/' : `/${normalizedPath}`,
      changefreq: 'weekly',
      priority: normalizedPath === '/' ? 1.0 : 0.7,
    };
  }
};