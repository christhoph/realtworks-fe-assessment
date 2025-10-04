import { useFetchItemsData } from "./hooks/useFetchItemsData";

import { ItemsList } from "./components/ItemsList/ItemsList";
import { Pagination } from "./components/Pagination/Pagination";
import { ItemsSkeleton } from "./components/ItemsSkeleton/ItemsSkeleton";

export function Items({ onUpdatePage, page, query }) {
  const { data, isLoading } = useFetchItemsData({ page, q: query });

  if (!data || isLoading) {
    return <ItemsSkeleton />;
  }

  const totalPages = !!data.items.length
    ? Math.ceil(data.total / data.limit)
    : 0;

  return (
    <>
      <ItemsList items={data.items} />

      <Pagination
        page={page}
        isLoading={isLoading}
        action={onUpdatePage}
        totalPages={totalPages}
      />
    </>
  );
}
