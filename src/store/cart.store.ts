import * as cartService from '@/services/cart.service';
import type { CartLineItem, CartResponse, Product } from '@/types/cart.types';
import { computeCartTotals } from '@/utils/cart-totals';
import { create } from 'zustand';

type CartStatus = 'idle' | 'loading' | 'ready' | 'error';

type CartState = {
  isOpen: boolean;
  cartId: string;
  items: CartLineItem[];
  totalItems: number;
  totalPrice: CartResponse['totalPrice'];
  status: CartStatus;
  error: string | null;
  pendingById: Record<string, boolean>;
};

type CartActions = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  hydrate: () => Promise<void>;
  setQuantity: (itemId: string, nextQty: number) => void;
  removeItem: (itemId: string) => void;
  addItem: (product: Product) => void;
  clearError: () => void;
};

type CartStore = CartState & CartActions;

const requestVersions: Record<string, number> = {};
let errorClearTimer: ReturnType<typeof setTimeout> | null = null;

const emptyTotals = {
  totalItems: 0,
  totalPrice: { amount: 0, currency: 'USD' }
};

function scheduleErrorClear(clearError: () => void) {
  if (errorClearTimer) clearTimeout(errorClearTimer);
  errorClearTimer = setTimeout(() => {
    clearError();
    errorClearTimer = null;
  }, 3500);
}

function syncCart(cart: CartResponse): Partial<CartState> {
  return {
    cartId: cart.cartId,
    items: cart.items,
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
    status: 'ready' as const
  };
}

function applyQuantity(items: CartLineItem[], itemId: string, nextQty: number) {
  if (nextQty <= 0) {
    return items.filter((item) => item.id !== itemId);
  }
  return items.map((item) =>
    item.id === itemId ? { ...item, quantity: nextQty } : item
  );
}

function applyOptimisticAdd(items: CartLineItem[], product: Product) {
  const existing = items.find((i) => i.product.id === product.id);
  if (existing) {
    return items.map((i) =>
      i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  }
  return [
    ...items,
    {
      id: `tmp_${Math.random().toString(36).slice(2, 8)}`,
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

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  cartId: '',
  items: [],
  totalItems: 0,
  totalPrice: { amount: 0, currency: 'USD' },
  status: 'idle',
  error: null,
  pendingById: {},

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  clearError: () => set({ error: null }),

  hydrate: async () => {
    set({ status: 'loading', error: null });
    try {
      const cart = await cartService.getCart();
      console.log('cart', cart);
      set(syncCart(cart));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to load cart';
      set({
        status: 'error',
        error: message,
        items: [],
        ...emptyTotals
      });
    }
  },

  removeItem: (itemId) => {
    get().setQuantity(itemId, 0);
  },

  addItem: (product) => {
    const previous = get();
    const previousItems = previous.items;
    const optimisticItems = applyOptimisticAdd(previousItems, product);
    const totals = computeCartTotals(
      optimisticItems,
      previous.totalPrice.currency
    );
    const pendingKey = product.id;

    set({
      items: optimisticItems,
      ...totals,
      error: null,
      pendingById: { ...get().pendingById, [pendingKey]: true }
    });

    void (async () => {
      try {
        const cart = await cartService.addCartItem(product.id);
        set((state) => {
          const restPending = { ...state.pendingById };
          delete restPending[pendingKey];
          return { ...syncCart(cart), pendingById: restPending };
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Add failed';
        set((state) => {
          const restPending = { ...state.pendingById };
          delete restPending[pendingKey];
          return {
            cartId: previous.cartId,
            items: previousItems,
            totalItems: previous.totalItems,
            totalPrice: previous.totalPrice,
            error: message,
            status: 'ready',
            pendingById: restPending
          };
        });
        scheduleErrorClear(get().clearError);
      }
    })();
  },

  setQuantity: (itemId, nextQty) => {
    const clampedQty = Math.max(0, Math.floor(nextQty));
    const previous = get();
    const previousItems = previous.items;
    const optimisticItems = applyQuantity(previousItems, itemId, clampedQty);
    const totals = computeCartTotals(
      optimisticItems,
      previous.totalPrice.currency
    );

    const version = (requestVersions[itemId] ?? 0) + 1;
    requestVersions[itemId] = version;

    set((state) => ({
      items: optimisticItems,
      ...totals,
      error: null,
      pendingById: { ...state.pendingById, [itemId]: true }
    }));

    void (async () => {
      try {
        const cart = await cartService.putItemQuantity(itemId, clampedQty);
        if (requestVersions[itemId] !== version) return;

        set((state) => {
          const restPending = { ...state.pendingById };
          delete restPending[itemId];
          return { ...syncCart(cart), pendingById: restPending };
        });
      } catch (error) {
        if (requestVersions[itemId] !== version) return;

        const message =
          error instanceof Error ? error.message : 'Update failed';
        set((state) => {
          const restPending = { ...state.pendingById };
          delete restPending[itemId];
          return {
            cartId: previous.cartId,
            items: previousItems,
            totalItems: previous.totalItems,
            totalPrice: previous.totalPrice,
            error: message,
            status: 'ready',
            pendingById: restPending
          };
        });
        scheduleErrorClear(get().clearError);
      }
    })();
  }
}));
