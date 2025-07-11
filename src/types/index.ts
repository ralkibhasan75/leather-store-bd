// src/types/index.ts
import { ReactNode } from "react";

export type Product = {
  slug: any;
  sizes?: string[]; // ✅ make it optional here
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
