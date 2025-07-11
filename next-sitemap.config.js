module.exports = {
  siteUrl: "https://leatherstorebd.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://leatherstorebd.com/sitemap-products.xml", // <-- Include dynamic sitemap
    ],
  },
  exclude: [
    "/dashboard/*",
    "/admin/*",
    "/checkout",
    "/thank-you",
    "/login",
    "/register",
    "/forgot-password",
    "/unauthorized",
  ],
  transform: async (config, path) => {
    if (
      path.includes("/api") ||
      path.includes("/_next") ||
      path.includes("[") ||
      path === "/404"
    ) {
      return null;
    }

    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
