'use client';

import {
  selectCartCurrency,
  selectCartError,
  selectCartItemCount,
  selectCartItems,
  selectCartStatus,
  selectCartSubtotal,
  selectIsCartLoading,
  selectIsOpen,
  selectPendingById
} from '@/modules/cart/selectors/cart.selectors';
import { useCartStore } from '@/store/cart.store';
import type { Product } from '@/types/cart.types';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';

export function useCart() {
  const isOpen = useCartStore(selectIsOpen);
  const items = useCartStore(selectCartItems);
  const status = useCartStore(selectCartStatus);
  const error = useCartStore(selectCartError);
  const currency = useCartStore(selectCartCurrency);
  const pendingById = useCartStore(selectPendingById);
  const subtotal = useCartStore(selectCartSubtotal);
  const itemCount = useCartStore(selectCartItemCount);
  const loading = useCartStore(selectIsCartLoading);

  const {
    open,
    close,
    toggle,
    hydrate,
    setQuantity,
    removeItem,
    addItem,
    clearError
  } = useCartStore(
    useShallow((state) => ({
      open: state.open,
      close: state.close,
      toggle: state.toggle,
      hydrate: state.hydrate,
      setQuantity: state.setQuantity,
      removeItem: state.removeItem,
      addItem: state.addItem,
      clearError: state.clearError
    }))
  );

  const increment = useCallback(
    (itemId: string) => {
      const item = items.find((i) => i.id === itemId);
      if (!item) return;
      setQuantity(itemId, item.quantity + 1);
    },
    [items, setQuantity]
  );

  const decrement = useCallback(
    (itemId: string) => {
      const item = items.find((i) => i.id === itemId);
      if (!item) return;
      setQuantity(itemId, item.quantity - 1);
    },
    [items, setQuantity]
  );

  const isItemPending = useCallback(
    (itemId: string) => Boolean(pendingById[itemId]),
    [pendingById]
  );

  const addProduct = useCallback(
    (product: Product) => addItem(product),
    [addItem]
  );

  return {
    isOpen,
    items,
    status,
    loading,
    error,
    currency,
    subtotal,
    itemCount,
    pendingById,
    open,
    close,
    toggle,
    hydrate,
    increment,
    decrement,
    removeItem,
    addProduct,
    setQuantity,
    clearError,
    isItemPending
  };
}
