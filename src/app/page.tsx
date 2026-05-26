"use client";

import { toggleSimulateFailure } from "@/services/cart.service";
import { CartTrigger } from "@/modules/cart/components/cart-trigger";
import Products from "@/modules/products/components/products";

function Home() {
  const handleToggleFailure = async () => {
    try {
      const { failRate } = await toggleSimulateFailure();
      alert(`Failure rate: ${failRate * 100}%`);
    } catch {
      alert("Could not toggle failure simulation");
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <div className="brand">
          <div className="brand-mark" />
          <span className="brand-name">Slide-Out Mini Cart</span>
        </div>
        <CartTrigger />
      </header>
      <section className="grid">
        <Products />
      </section>

      <footer className="page-foot">
        <span>Mock API · ~650ms latency · </span>
        <button type="button" className="link-btn" onClick={() => void handleToggleFailure()}>
          toggle 50% failure rate
        </button>
      </footer>
    </div>
  );
}

export default Home
