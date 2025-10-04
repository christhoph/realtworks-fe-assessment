import "./Search.css";

export function Search({ query, onChange }) {
  return (
    <div className="search-container">
      <label
        hidden="true"
        htmlFor="search"
        aria-hidden="true"
        className="search-label"
      >
        Search for items
      </label>
      <input
        id="search"
        name="search"
        type="search"
        value={query}
        placeholder="Search for items..."
        onChange={onChange}
        aria-describedby="search-help"
        autoComplete="off"
        className="search-input"
      />
      <div id="search-help" className="search-help sr-only">
        Type to search through available items
      </div>
    </div>
  );
}
