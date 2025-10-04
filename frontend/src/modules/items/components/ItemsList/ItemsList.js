import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { ListItem } from "./ListItem";

import { EmptyState } from "../../../../components/EmptyState/EmptyState";

import "./ItemsList.css";

export function ItemsList({ items = [] }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 61,
    overscan: 8,
  });

  if (!items.length) {
    return <EmptyState message="No items found" />;
  }

  const virtualItems = rowVirtualizer.getVirtualItems();

  return (
    <section
      className="items-list"
      ref={parentRef}
      role="list"
      aria-label="Items list"
      style={{
        height: rowVirtualizer.getTotalSize(),
        width: "100%",
        position: "relative",
      }}
    >
      {virtualItems.map((v) => (
        <ListItem
          key={v.key}
          item={items[v.index]}
          index={v.index}
          total={items.length}
        />
      ))}
    </section>
  );
}
