import { service } from "@/service";
import { useCallback, useEffect } from "react";
import { useState } from "../use-state";
import { useGetState, UseGetResult } from "./types";

export function useGet<T>(url: string): UseGetResult<T> {
  const [state, setState] = useState<useGetState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const handleGetData = useCallback(async () => {
    try {
      setState({ isLoading: true });
      const response = await service.get(url);
      const result = response.data;
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
  }, [url]);

  useEffect(() => {
    handleGetData();
  }, [url]);

  return { ...state, refetch: handleGetData };
}
