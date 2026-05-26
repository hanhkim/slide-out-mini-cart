"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

function CartHydrator() {
  const { hydrate, status } = useCart();

  useEffect(() => {
    if (status === "idle") {
      void hydrate();
    }
  }, [hydrate, status]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartHydrator />
      {children}
    </>
  );
}
