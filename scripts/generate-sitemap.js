const { writeFileSync, readFileSync } = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { connectDB } = require("../src/lib/db");
const Product = require("../src/lib/models/Product");

const siteUrl = "https://leatherstorebd.com";

(async () => {
  await connectDB();

  const products = await Product.find({ isActive: true }, "slug");

  const productUrls = products.map((product) => {
    return `
<url>
  <loc>${siteUrl}/products/${product.slug}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${productUrls.join("\n")}
</urlset>`;

  writeFileSync("public/sitemap-products.xml", xml.trim());
  console.log("✅ Dynamic product sitemap saved to public/sitemap-products.xml");
})();
