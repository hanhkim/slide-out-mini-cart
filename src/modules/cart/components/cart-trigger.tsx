"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect, useRef, useState } from "react";

export function CartTrigger() {
  const { itemCount, toggle, loading } = useCart();
  const prevCountRef = useRef(itemCount);
  const [badgeBump, setBadgeBump] = useState(false);

  useEffect(() => {
    if (loading) {
      prevCountRef.current = itemCount;
      return;
    }
    if (itemCount > prevCountRef.current) {
      setBadgeBump(true);
      const timer = window.setTimeout(() => setBadgeBump(false), 420);
      prevCountRef.current = itemCount;
      return () => window.clearTimeout(timer);
    }
    prevCountRef.current = itemCount;
  }, [itemCount, loading]);

  return (
    <button
      type="button"
      className="cart-trigger"
      onClick={toggle}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M4 7h16l-1.5 11a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 7z" />
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
      <span>Cart</span>
      {!loading && itemCount > 0 ? (
        <span
          className={`cart-trigger-badge ${badgeBump ? "is-bump" : ""}`}
          key={itemCount}
        >
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
