import type { CartLineItem, CartResponse, Money } from '@/types/cart.types';

export function computeCartTotals(
  items: CartLineItem[],
  currency = 'USD'
): Pick<CartResponse, 'totalItems' | 'totalPrice' | 'amount'> {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const amount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalPrice: Money = {
    amount: Math.round(amount * 100) / 100,
    currency
  };
  return { totalItems, totalPrice, amount };
}
