/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3001',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [],

  // ✅ Dynamically include all products by slug
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },

  // ✅ Manually add product slugs from backend
  additionalPaths: async (config) => {
    const res = await fetch('http://localhost:3001/api/products/all');
    const data = await res.json();

    return data.products.map((product) => ({
      loc: `/products/${product.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
    }));
  }
};
