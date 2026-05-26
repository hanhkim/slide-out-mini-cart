import { ProductCard } from "@/modules/cart/components/product-card";
import { PRODUCT_CATALOG } from "@/services/mocks/products.mock";

export const Products = () => {
    return (
        <>
        {PRODUCT_CATALOG.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
          </>
    )
}

export default Products