import { useState, useEffect, useCallback } from "react";
import { service } from "@/service";
import { UseTableResult, Pagination } from "./types";
import { defaultPagination } from "./consts";

export function useTableList<T, P extends object>(
  url: string,
  initialParams?: P
): UseTableResult<T, P> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [params, setParams] = useState<P | undefined>(initialParams);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    setError(null);
    try {
      const response = await service.get(url, {
        params: {
          ...params,
          _page: pagination.currentPage,
          _per_page: pagination.pageSize,
        },
      });

      setData(response.data.data);
      setPagination((prev) => ({ ...prev, total: response.data.items }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error while fetching"));
    } finally {
      setIsLoading(false);
    }
  }, [url, params, pagination.currentPage, pagination.pageSize]);

  const setCurrentPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPagination((prev) => ({ ...prev, pageSize: size, currentPage: 1 }));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    error,
    data,
    refetch: fetchData,
    pagination,
    setCurrentPage,
    setPageSize,
    params,
    setParams,
  };
}
