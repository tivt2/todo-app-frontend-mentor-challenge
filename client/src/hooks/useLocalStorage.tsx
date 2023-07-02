import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  init: T
): [storage: T, setFn: (newVal: T) => void] {
  const [storage, setStorage] = useState<T>(init);

  useEffect(() => {
    const storeVal = localStorage.getItem(key);
    if (storeVal) setStorage(JSON.parse(storeVal));
  }, []);

  useEffect(() => {
    if (storage) {
      localStorage.setItem(key, JSON.stringify(storage));
    }
  }, [key, storage]);

  const setLocalStorage = (newVal: T) => {
    setStorage(newVal);
  };

  return [storage, setLocalStorage];
}
