import type { Product } from "@/components/shared/ProductCard";

export type ProductWithMeta = Product & {
  images?: string[];
  category: string; // category id from categories.ts
  createdAt: string; // ISO date
  popularity: number; // arbitrary score
};

export const PRODUCTS: ProductWithMeta[] = [
  {
    id: "ring-sol",
    name: "Solitaire Diamond Ring",
    price: 1290,
    image:
      "https://images.pexels.com/photos/10799227/pexels-photo-10799227.jpeg",
    images: [
      "https://images.pexels.com/photos/10799227/pexels-photo-10799227.jpeg",
      "https://images.pexels.com/photos/8891950/pexels-photo-8891950.jpeg",
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg",
    ],
    tag: "new",
    category: "rings",
    createdAt: "2025-02-10",
    popularity: 95,
  },
  {
    id: "ring-eternal",
    name: "Eternal Band",
    price: 680,
    image: "https://images.pexels.com/photos/8891950/pexels-photo-8891950.jpeg",
    images: [
      "https://images.pexels.com/photos/8891950/pexels-photo-8891950.jpeg",
      "https://images.pexels.com/photos/10799227/pexels-photo-10799227.jpeg",
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg",
    ],
    category: "rings",
    createdAt: "2025-01-22",
    popularity: 72,
  },
  {
    id: "ear-etoile",
    name: "Étoile Hoop Earrings",
    price: 420,
    image:
      "https://images.pexels.com/photos/20943477/pexels-photo-20943477.jpeg",
    images: [
      "https://images.pexels.com/photos/20943477/pexels-photo-20943477.jpeg",
      "https://images.pexels.com/photos/33582778/pexels-photo-33582778.jpeg",
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
    ],
    category: "earrings",
    createdAt: "2024-12-15",
    popularity: 83,
  },
  {
    id: "ear-drop-pearl",
    name: "Lustre Pearl Drops",
    price: 390,
    image:
      "https://images.pexels.com/photos/33582778/pexels-photo-33582778.jpeg",
    images: [
      "https://images.pexels.com/photos/33582778/pexels-photo-33582778.jpeg",
      "https://images.pexels.com/photos/20943477/pexels-photo-20943477.jpeg",
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
    ],
    category: "earrings",
    createdAt: "2024-11-10",
    popularity: 70,
  },
  {
    id: "neck-aurora",
    name: "Aurora Pendant Necklace",
    price: 56,
    image:
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
    images: [
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
    ],
    category: "necklaces",
    createdAt: "2025-02-01",
    popularity: 88,
  },
  {
    id: "neck-chain",
    name: "Fine Link Chain",
    price: 310,
    image:
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
    images: [
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
    ],
    category: "necklaces",
    createdAt: "2024-10-02",
    popularity: 65,
  },
  {
    id: "brace-satin",
    name: "Satin Gold Bracelet",
    price: 460,
    image:
      "https://images.pexels.com/photos/28985978/pexels-photo-28985978.jpeg",
    images: [
      "https://images.pexels.com/photos/28985978/pexels-photo-28985978.jpeg",
      "https://images.pexels.com/photos/8891958/pexels-photo-8891958.jpeg",
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
    ],
    category: "bracelets",
    createdAt: "2024-12-01",
    popularity: 77,
  },
  {
    id: "bangle-celeste",
    name: "Celeste Bangle",
    price: 520,
    image: "https://images.pexels.com/photos/8891958/pexels-photo-8891958.jpeg",
    images: [
      "https://images.pexels.com/photos/8891958/pexels-photo-8891958.jpeg",
      "https://images.pexels.com/photos/28985978/pexels-photo-28985978.jpeg",
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
    ],
    category: "bangles",
    createdAt: "2025-01-05",
    popularity: 81,
  },
  {
    id: "pend-rose",
    name: "Rose Medallion Pendant",
    price: 350,
    image:
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
    images: [
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
    ],
    category: "pendants",
    createdAt: "2024-09-28",
    popularity: 74,
  },
  {
    id: "charm-mina",
    name: "Mina Charm",
    price: 120,
    image: "https://images.pexels.com/photos/6666403/pexels-photo-6666403.jpeg",
    images: [
      "https://images.pexels.com/photos/6666403/pexels-photo-6666403.jpeg",
      "https://images.pexels.com/photos/29193428/pexels-photo-29193428.jpeg",
      "https://images.pexels.com/photos/14111392/pexels-photo-14111392.jpeg",
    ],
    category: "charms",
    createdAt: "2024-08-14",
    popularity: 55,
  },
  {
    id: "bridal-luxe",
    name: "Luxe Bridal Set",
    price: 2190,
    image: "https://images.pexels.com/photos/8306531/pexels-photo-8306531.jpeg",
    images: [
      "https://images.pexels.com/photos/8306531/pexels-photo-8306531.jpeg",
      "https://images.pexels.com/photos/10799227/pexels-photo-10799227.jpeg",
    ],
    category: "bridal",
    createdAt: "2024-12-22",
    popularity: 60,
  },
  {
    id: "mens-steel",
    name: "Men’s Signet Ring",
    price: 440,
    image: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg",
    images: [
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg",
      "https://images.pexels.com/photos/10799227/pexels-photo-10799227.jpeg",
      "https://images.pexels.com/photos/8891950/pexels-photo-8891950.jpeg",
    ],
    category: "mens",
    createdAt: "2024-07-21",
    popularity: 50,
  },
];
