import { service } from "@/service";
import { useEffect } from "react";
import { useState } from "../use-state";

interface useGetState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseGetResult<T> extends useGetState<T> {
  refetch: () => void;
}

export function useGet<T>(url: string): UseGetResult<T> {
  const [state, setState] = useState<useGetState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const handleGetData = async () => {
    try {
      setState({ isLoading: true });
      const response = await service.get(url);
      const result = response.data;
      console.log("RESPONSE", response);
      setState({ data: result });
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
  };

  useEffect(() => {
    handleGetData();
  }, [url]); // eslint-disable-line

  return { ...state, refetch: handleGetData };
}
