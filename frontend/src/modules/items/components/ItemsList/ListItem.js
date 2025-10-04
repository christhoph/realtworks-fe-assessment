import { Link } from "react-router-dom";

import "./ListItem.css";

export function ListItem({ item, index, total }) {
  if (!item) {
    return null;
  }

  return (
    <Link
      className="list-item"
      to={"/items/" + item.id}
      aria-label={`View details for ${item.name}`}
      tabIndex={0}
      role="listitem"
      aria-posinset={index + 1}
      aria-setsize={total}
    >
      <article>
        <h3 className="item-name">{item.name}</h3>

        <span className="item-arrow" aria-hidden="true">
          {">"}
        </span>
      </article>
    </Link>
  );
}
