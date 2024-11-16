import { useState as useStateReact } from "react";

export function useState<T extends object>(initialState: T) {
  const [state, setState] = useStateReact<T>(initialState);

  const mergeState = (newState: Partial<T>) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return [state, mergeState] as const;
}
