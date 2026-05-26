import type { CartLineItem } from "@/types/cart.types";

export function calculateSubtotal(items: CartLineItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}
