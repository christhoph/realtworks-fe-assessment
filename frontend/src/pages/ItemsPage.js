import { useState } from "react";

import { DEFAULT_PAGE, Items, Search } from "../modules/items";

export default function ItemsPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE);

  const onUpdatePage = (newPage) => {
    setPage(newPage);
  };

  const onQueryChange = (event) => {
    if (page !== DEFAULT_PAGE) {
      onUpdatePage(DEFAULT_PAGE);
    }

    setQuery(event.target.value);
  };

  return (
    <>
      <Search query={query} onChange={onQueryChange} />

      <Items page={page} query={query} onUpdatePage={onUpdatePage} />
    </>
  );
}
