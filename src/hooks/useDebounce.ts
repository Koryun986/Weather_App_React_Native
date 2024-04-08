import {useEffect, useState} from 'react';

export default function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
}
