import { useState, useEffect, useCallback } from "react";
import { service } from "@/service";

interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

interface UseTableResult<T, P> {
  isLoading: boolean;
  error: Error | null;
  data: T[];
  refetch: () => void;
  pagination: Pagination;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  params: P;
  setParams: (params: P) => void;
}

const defaultPagination: Pagination = {
  currentPage: 1,
  pageSize: 10,
  total: 0,
};

export function useTableList<T, P extends object>(
  url: string,
  initialParams: P
): UseTableResult<T, P> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination>(defaultPagination);
  const [params, setParams] = useState<P>(initialParams);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await service.get<{ data: T[]; total: number }>(url, {
        params: {
          ...params,
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        },
      });
      setData(response.data.data);
      setPagination((prev) => ({ ...prev, total: response.data.total }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
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
