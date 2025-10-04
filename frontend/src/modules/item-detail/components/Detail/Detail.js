import "./Detail.css";

export function Detail({ item }) {
  return (
    <section className="item-detail">
      <h2>{item.name}</h2>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
    </section>
  );
}
