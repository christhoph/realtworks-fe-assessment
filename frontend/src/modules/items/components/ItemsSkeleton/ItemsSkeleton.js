import { ITEM_LIMIT } from "../../constants";

import "./ItemsSkeleton.css";

export function ItemsSkeleton() {
  const items = Array.from({ length: ITEM_LIMIT }, (_, index) => index);

  return (
    <section
      className="items-skeleton"
      role="status"
      aria-label="Loading items"
      aria-live="polite"
    >
      {items.map((index) => (
        <article
          key={`items-skeleton__${index}`}
          className="skeleton skeleton-pulse"
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Loading items, please wait...</span>
    </section>
  );
}
