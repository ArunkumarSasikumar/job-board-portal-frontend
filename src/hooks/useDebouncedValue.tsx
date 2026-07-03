import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
  }, [timeRef]);

  const debounce = useCallback(() => {
    clearTimer();

    timeRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay, clearTimer]);

  useEffect(() => {
    debounce();

    return () => {
      clearTimer();
    };
  }, [debounce, clearTimer]);

  return debouncedValue;
}
