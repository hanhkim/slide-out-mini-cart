export type Money = {
  amount: number;
  currency: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  thumbnailUrl?: string;
  description?: string;
  highResImageUrl?: string;
};

export type CartLineItem = {
  id: string;
  quantity: number;
  product: Product;
};

export type CartResponse = {
  cartId: string;
  totalItems: number;
  totalPrice: Money;
  amount: number;
  currency: string;
  items: CartLineItem[];
};

export type PatchCartItemBody = {
  quantity: number;
};

export type AddCartItemBody = {
  productId: string;
};

export type CartStoreState = {
  isOpen: boolean;
  cartId: string;
  items: CartLineItem[];
  totalItems: number;
  totalPrice: Money;
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;
  pendingById: Record<string, boolean>;
};
