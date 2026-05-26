"use client";

import type { Product } from "@/types/cart.types";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/utils/currency";
import { useState } from "react";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    addProduct(product);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <article className="pc">
      <div className="pc-img">
        {product.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.thumbnailUrl} alt="" />
        ) : (
          <div className="pc-img-placeholder" />
        )}
      </div>
      <div className="pc-body">
        <div className="pc-name">{product.title}</div>
        {product.description ? (
          <div className="pc-variant">{product.description}</div>
        ) : null}
      </div>
      <div className="pc-foot">
        <span className="pc-price">{formatCurrency(product.price)}</span>
        <button
          type="button"
          className={`pc-add ${added ? "is-added" : ""}`}
          onClick={handleAdd}
        >
          {added ? "Added ✓" : "Add"}
        </button>
      </div>
    </article>
  );
}
