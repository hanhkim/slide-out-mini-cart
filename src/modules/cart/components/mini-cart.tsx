"use client";

import { MINI_CART_PANEL_ID } from "@/constants/cart.constants";
import { CartFooter } from "./cart-footer";
import { CartHeader } from "./cart-header";
import { CartItem } from "./cart-item";
import { CartSkeleton } from "./cart-skeleton";
import { EmptyCart } from "./empty-cart";
import useGsapCart from "@/hooks/use-gsap-cart";

export function MiniCart() {
  const {items, containerRef, loading, backdropRef, hasItems, panelRef, isOpen, close} =useGsapCart()
 
  return (
    <div
      ref={containerRef}
      className="mc-root"
      aria-hidden={!isOpen}
      style={{ visibility: "hidden" }}
    >
      <div
        ref={backdropRef}
        className="mc-backdrop mc-backdrop--gsap"
        style={{ opacity: 0 }}
        onClick={close}
        aria-hidden
      />

      <aside
        ref={panelRef}
        id={MINI_CART_PANEL_ID}
        className="mc-panel mc-panel--gsap"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
      >
        <CartHeader />

        <div className="mc-body">
          {loading ? (
            <CartSkeleton />
          ) : hasItems ? (
            <ul className="mc-list">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </ul>
          ) : (
            <EmptyCart />
          )}
        </div>

        {!loading && hasItems && <CartFooter />}
      </aside>
    </div>
  );
}

export default MiniCart