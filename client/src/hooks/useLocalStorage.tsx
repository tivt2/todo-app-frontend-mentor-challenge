"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | ((...args: any[]) => T)
): [T, (newVal: T) => void] {
  const [storage, setStorage] = useState(
    JSON.stringify(
      initialValue instanceof Function
        ? (initialValue as (...args: any[]) => T)()
        : initialValue
    )
  );

  useEffect(() => {
    localStorage.setItem(key, storage);
  }, [key, storage]);

  const setLocalStorage = (newVal: T) => {
    setStorage(JSON.stringify(newVal));
  };

  const value = JSON.parse(storage);

  return [value, setLocalStorage];
}
