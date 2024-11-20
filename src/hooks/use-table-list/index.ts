import { useEffect, useCallback, useMemo } from "react";
import { service } from "@/service";
import { UseTableResult, Pagination } from "./types";
import { defaultPagination } from "./consts";
import { useState } from "../use-state";

// const [data, setData] = useState<T[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [pagination, setPagination] = useState<Pagination>(defaultPagination);
//   const [params, setParams] = useState<P | undefined>(initialParams);

interface UseTableListState<T, P> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  pagination: Pagination;
  params: P | undefined;
}

export function useTableList<T, P extends object>(
  url: string,
  initialParams?: P
): UseTableResult<T, P> {
  const [state, setState] = useState<UseTableListState<T, P>>({
    data: [],
    isLoading: false,
    error: null,
    pagination: defaultPagination,
    params: initialParams,
  });

  const { data, isLoading, error, pagination, params } = state;
  const { currentPage, pageSize } = pagination;

  const handleGetData = useCallback(async () => {
    setState({ isLoading: true, error: null });

    try {
      const response = await service.get(url, {
        params: {
          ...params,
          _page: pagination.currentPage,
          _per_page: pagination.pageSize,
        },
      });

      setState({
        data: response.data.data,
        pagination: { ...pagination, total: response.data.items },
      });
    } catch (apiError) {
      setState({
        error:
          apiError instanceof Error
            ? apiError
            : new Error("Error while fetching"),
      });
    } finally {
      setState({ isLoading: false });
    }
  }, [params, pagination, url]);

  const setCurrentPage = useCallback(
    (page: number) => {
      setState({ pagination: { ...pagination, currentPage: page } });
    },
    [pagination]
  );

  const setPageSize = useCallback(
    (size: number) => {
      setState({
        pagination: { ...pagination, pageSize: size, currentPage: 1 },
      });
    },
    [pagination]
  );

  const setParams = (updatedParams: P | undefined) => {
    setState({ params: updatedParams });
  };

  useEffect(() => {
    handleGetData();
  }, [params, currentPage, pageSize]);

  return {
    isLoading,
    error,
    data,
    refetch: handleGetData,
    pagination,
    setCurrentPage,
    setPageSize,
    setParams,
  };
}
