import { getProductById } from '@/services/mocks/products.mock';
import type { CartLineItem, CartResponse } from '@/types/cart.types';
import { computeCartTotals } from '@/utils/cart-totals';

const CART_ID = 'cart_88492';

const SEED_ITEMS: CartLineItem[] = [
  {
    id: 'item_1',
    quantity: 2,
    product: {
      id: 'prod_101',
      title: 'Wireless Noise-Canceling Headphones',
      price: 49.99,
      thumbnailUrl: 'https://placehold.co/150x150/png?text=Headphones'
    }
  },
  {
    id: 'item_2',
    quantity: 1,
    product: {
      id: 'prod_202',
      title: 'Ergonomic Mouse',
      price: 50.0,
      thumbnailUrl: 'https://placehold.co/150x150/png?text=Mouse'
    }
  }
];

let items: CartLineItem[] = SEED_ITEMS.map((item) => ({
  ...item,
  product: { ...item.product }
}));

let failRate = 0;

function buildResponse(): CartResponse {
  const { totalItems, totalPrice, amount } = computeCartTotals(items);
  return {
    cartId: CART_ID,
    totalItems,
    totalPrice,
    amount,
    currency: 'USD',
    items: items.map((item) => ({
      ...item,
      product: { ...item.product }
    }))
  };
}

export function getCart(): CartResponse {
  return buildResponse();
}

export function getFailRate(): number {
  return failRate;
}

export function setFailRate(rate: number): number {
  failRate = Math.max(0, Math.min(1, rate));
  return failRate;
}

export function shouldFail(): boolean {
  return Math.random() < failRate;
}

export function updateItemQuantity(
  id: string,
  quantity: number
): CartResponse | null {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;

  if (quantity <= 0) {
    items = items.filter((item) => item.id !== id);
  } else {
    items = items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  return buildResponse();
}

export function addItemByProductId(productId: string): CartResponse | null {
  const product = getProductById(productId);
  if (!product) return null;

  const existing = items.find((i) => i.product.id === productId);
  if (existing) {
    items = items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    items = [
      ...items,
      {
        id: `item_${Math.random().toString(36).slice(2, 8)}`,
        quantity: 1,
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnailUrl: product.thumbnailUrl
        }
      }
    ];
  }

  return buildResponse();
}
