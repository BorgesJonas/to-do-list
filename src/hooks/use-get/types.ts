export interface useGetState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export interface UseGetResult<T> extends useGetState<T> {
  refetch: () => void;
}
