import { apiGet, apiPost, apiPut } from '@/services/base/api-client';
import type {
  AddCartItemBody,
  CartResponse,
  PatchCartItemBody
} from '@/types/cart.types';

export const CART_API_BASE = '/api/cart';

export async function getCart(): Promise<CartResponse> {
  return apiGet<CartResponse>(CART_API_BASE);
}

export async function putItemQuantity(
  id: string,
  quantity: number
): Promise<CartResponse> {
  const body: PatchCartItemBody = { quantity };
  return apiPut<CartResponse>(`${CART_API_BASE}/items/${id}`, body);
}

export async function addCartItem(productId: string): Promise<CartResponse> {
  const body: AddCartItemBody = { productId };
  return apiPost<CartResponse>(`${CART_API_BASE}/items`, body);
}

export async function toggleSimulateFailure(): Promise<{ failRate: number }> {
  return apiPost<{ failRate: number }>(`${CART_API_BASE}/simulate`);
}
