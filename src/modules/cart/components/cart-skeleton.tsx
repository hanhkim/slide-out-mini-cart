export function CartSkeleton() {
  return (
    <div className="mc-skeleton-wrap">
      {[0, 1, 2].map((i) => (
        <div className="mc-skeleton" key={i}>
          <div className="mc-skeleton-img" />
          <div className="mc-skeleton-body">
            <div className="mc-skeleton-line" style={{ width: "70%" }} />
            <div className="mc-skeleton-line" style={{ width: "40%" }} />
            <div className="mc-skeleton-line" style={{ width: "55%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
