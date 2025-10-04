import { Detail } from "./components/Detail/Detail";
import { useFetchItemDetail } from "./hooks/useFetchItemDetail";

import { EmptyState } from "../../components/EmptyState/EmptyState";

export function ItemDetail() {
  const { item, isLoading } = useFetchItemDetail();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <EmptyState />;
  }

  return <Detail item={item} />;
}
