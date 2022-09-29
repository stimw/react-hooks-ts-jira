import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
  const result: object = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key as keyof typeof result];
    if (isFalsy(value)) {
      delete result[key as keyof typeof result];
    }
  });
  return result;
};

export const useDebounce = <T,>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
