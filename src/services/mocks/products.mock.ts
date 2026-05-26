import type { Product } from '@/types/cart.types';

export const PRODUCT_CATALOG: Product[] = [
  {
    id: 'prod_101',
    title: 'Wireless Noise-Canceling Headphones',
    price: 49.99,
    thumbnailUrl: 'https://placehold.co/150x150/png?text=Headphones',
    description: 'Over-ear wireless headphones with active noise cancellation.'
  },
  {
    id: 'prod_202',
    title: 'Ergonomic Mouse',
    price: 50.0,
    thumbnailUrl: 'https://placehold.co/150x150/png?text=Mouse',
    description: 'Comfortable ergonomic mouse for long work sessions.'
  },
  {
    id: 'prod_789',
    title: 'Premium Mechanical Keyboard',
    price: 129.99,
    description:
      'Tactile, responsive, and built for speed. Features customizable RGB lighting and hot-swappable switches.',
    thumbnailUrl: 'https://placehold.co/150x150/png?text=Keyboard',
    highResImageUrl: 'https://placehold.co/1200x800/png?text=High+Res+Keyboard'
  },
  {
    id: 'prod_303',
    title: 'USB-C Hub',
    price: 39.99,
    thumbnailUrl: 'https://placehold.co/150x150/png?text=Hub',
    description: '7-in-1 USB-C hub with HDMI and SD card reader.'
  },
  {
    id: 'prod_404',
    title: '4K Webcam',
    price: 89.99,
    thumbnailUrl: 'https://placehold.co/150x150/png?text=Webcam',
    description: 'Sharp 4K webcam with auto-framing and dual mics.'
  },
  {
    id: 'prod_505',
    title: 'Desk Lamp',
    price: 34.99,
    thumbnailUrl: 'https://placehold.co/150x150/png?text=Lamp',
    description: 'Adjustable LED desk lamp with warm and cool modes.'
  }
];

const catalog = Object.fromEntries(
  PRODUCT_CATALOG.map((product) => [product.id, product])
) as Record<string, Product>;

export function getCatalogProducts(): Product[] {
  return PRODUCT_CATALOG.map((p) => ({ ...p }));
}

export function getProductById(productId: string): Product | null {
  const product = catalog[productId];
  return product ? { ...product } : null;
}
