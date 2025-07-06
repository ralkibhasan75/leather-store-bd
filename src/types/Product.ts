export type ProductType = {
  _id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  category: string;
  stock: number;
  discount: number;
  couponCode: string;
  tags: string[];
  thumbnail: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  sizes?: string[]; // ✅ make it optional here
};
