import { apiGet } from '@/services/base/api-client';
import type { Product } from '@/types/cart.types';

export async function getProduct(productId: string): Promise<Product> {
  return apiGet<Product>(`/api/products/${productId}`);
}
