// src/types/index.ts
export type Product = {
  thumbnail: string;
  brand: ReactNode;
  model: ReactNode;
  discount: number;
  tags: any;
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
};
