"use client";

import { MINI_CART_TITLE_ID } from "@/constants/cart.constants";
import { useCart } from "@/hooks/use-cart";

export function CartHeader() {
  const { close, itemCount } = useCart();

  return (
    <header className="mc-header">
      <div className="mc-header-title" id={MINI_CART_TITLE_ID}>
        <span>Your cart</span>
        <span className="mc-count">{itemCount}</span>
      </div>
      <button
        type="button"
        className="mc-close"
        onClick={close}
        aria-label="Close cart"
      >
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
}
