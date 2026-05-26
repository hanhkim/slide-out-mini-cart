"use client";

import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/utils/currency";

export function CartFooter() {
  const { subtotal, currency, close } = useCart();

  return (
    <footer className="mc-footer">
      <div className="mc-row">
        <span className="mc-row-label">Subtotal</span>
        <span className="mc-row-value mc-subtotal" key={subtotal}>
          {formatCurrency(subtotal, currency)}
        </span>
      </div>
      <button type="button" className="mc-checkout">
        Checkout
        <span className="mc-checkout-total">
          · {formatCurrency(subtotal, currency)}
        </span>
      </button>
      <button type="button" className="mc-view-cart" onClick={close}>
        Continue shopping
      </button>
    </footer>
  );
}
