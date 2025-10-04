import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export function useFetchItemDetail() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(() => {
    fetch("/api/items/" + id)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        setItem(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { item, isLoading };
}
