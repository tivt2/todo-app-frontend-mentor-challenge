import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, init?: T) {
  const [storage, setStorage] = useState<T | null>(
    (localStorage.getItem(JSON.parse(key)) as T) || null
  );

  useEffect(() => {
    if (init) {
      setStorage(init);
    }
  }, [init]);

  useEffect(() => {
    if (storage) {
      localStorage.setItem(key, JSON.stringify(storage));
    }
  }, [storage]);

  const setLocalStorage = (newVal: T) => {
    setStorage(newVal);
  };

  return [storage, setLocalStorage];
}
