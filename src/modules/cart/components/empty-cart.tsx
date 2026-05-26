export function EmptyCart() {
  return (
    <div className="mc-empty">
      <div className="mc-empty-icon">
        <svg
          viewBox="0 0 48 48"
          width="36"
          height="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden
        >
          <path d="M10 14h28l-3 22a3 3 0 0 1-3 2.6H16a3 3 0 0 1-3-2.6L10 14z" />
          <path d="M18 14V9a6 6 0 0 1 12 0v5" />
        </svg>
      </div>
      <div className="mc-empty-title">Your cart is empty</div>
      <div className="mc-empty-sub">Add something you&apos;ll love to come back to.</div>
    </div>
  );
}
