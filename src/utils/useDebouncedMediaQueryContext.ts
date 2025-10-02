import { useContext, useState, useEffect, useRef } from "react";
import { MediaQueryContext } from "@/utils/context";
import { useDebounce } from "@/utils/site";

/**
 * Returns a debounced value of the current MediaQueryContext.
 * @param debounceMs Number of milliseconds to debounce updates (default: 100)
 */
export function useDebouncedMediaQueryContext(debounceMs = 100) {
  const contextValue = useContext(MediaQueryContext);
  const [debouncedValue, setDebouncedValue] = useState(contextValue);
  const setDebouncedValueRef = useRef(setDebouncedValue);
  setDebouncedValueRef.current = setDebouncedValue;

  // Create a debounced setter using the useDebounce hook
  const debouncedSetter = useDebounce((value: typeof contextValue) => {
    setDebouncedValueRef.current(value);
  }, debounceMs);

  useEffect(() => {
    debouncedSetter(contextValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextValue, debounceMs]);

  return debouncedValue;
}

export type UseDebouncedMediaQueryContextReturn = ReturnType<typeof useDebouncedMediaQueryContext>
