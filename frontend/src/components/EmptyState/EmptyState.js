import "./EmptyState.css";

export function EmptyState({ message = "Not found" }) {
  return (
    <section
      className="empty-state"
      role="status"
      aria-live="polite"
      aria-label="No results found"
    >
      <h2>{message}</h2>
      <p>Try adjusting your search criteria or try again later</p>
    </section>
  );
}
