import { useCallback, useEffect, useState } from "react";

import { ITEM_LIMIT } from "../constants";

async function fetchItemsData(
  signal,
  { page = 1, limit = ITEM_LIMIT, q = "" } = {}
) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));

  if (q) {
    params.set("q", q);
  }

  const res = await fetch(`/api/items?${params.toString()}`, { signal });
  const json = await res.json();

  return json;
}

export function useFetchItemsData({ page, q } = {}) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(
    async (signal) => {
      try {
        const response = await fetchItemsData(signal, { page, q });

        setData(response);
        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          setIsLoading(false);
        }
      }
    },
    [page, q]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => controller.abort();
  }, [fetchData]);

  return { data, isLoading };
}
