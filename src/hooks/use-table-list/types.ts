export interface Pagination {
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface UseTableResult<T, P> {
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
