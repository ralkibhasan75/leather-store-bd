import mongoose from "mongoose";
import slugify from "slugify";
import shortid from "shortid";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: String,
    price: Number,
    brand: String,
    model: String,
    category: String,
    stock: Number,
    discount: Number,
    couponCode: String,
    tags: [String],
    thumbnail: String,
    images: [String],
    isFeatured: Boolean,
    isActive: Boolean,
    sizes: [String],
  },
  {
    timestamps: true,
  }
);

// Safe slug generator
ProductSchema.pre("save", async function (next) {
  if (this.slug) return next();

  const baseSlug = slugify(this.title ?? "", { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 0;

  while (await mongoose.models.Product.findOne({ slug })) {
    counter++;
    slug = `${baseSlug}-${shortid().slice(0, 4)}-${counter}`; // ✅ Correct usage
  }

  this.slug = slug;
  next();
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
