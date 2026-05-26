import type { CartLineItem, CartStoreState } from "@/types/cart.types";

export const selectIsOpen = (state: CartStoreState) => state.isOpen;
export const selectCartItems = (state: CartStoreState) => state.items;
export const selectCartStatus = (state: CartStoreState) => state.status;
export const selectCartError = (state: CartStoreState) => state.error;
export const selectCartCurrency = (state: CartStoreState) =>
  state.totalPrice.currency;
export const selectPendingById = (state: CartStoreState) => state.pendingById;

export const selectCartSubtotal = (state: CartStoreState) =>
  state.totalPrice.amount;

export const selectCartItemCount = (state: CartStoreState) => state.totalItems;

export const selectIsCartLoading = (state: CartStoreState) =>
  state.status === "loading";

export const selectIsItemPending = (id: string) => (state: CartStoreState) =>
  Boolean(state.pendingById[id]);

export function findCartItem(
  items: CartLineItem[],
  id: string,
): CartLineItem | undefined {
  return items.find((item) => item.id === id);
}
