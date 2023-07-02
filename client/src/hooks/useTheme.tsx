import { THEME_TYPE } from "@/types/types";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export function useTheme(): [
  theme: THEME_TYPE,
  setTheme: (newTheme: THEME_TYPE) => void,
  getTheme: () => THEME_TYPE
] {
  const [theme, setTheme] = useLocalStorage<THEME_TYPE>(
    "theme",
    THEME_TYPE.SYSTEM
  );

  useEffect(() => {
    if (theme === THEME_TYPE.SYSTEM) {
      const preferDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (preferDark) {
        setTheme(THEME_TYPE.DARK);
      } else {
        setTheme(THEME_TYPE.LIGHT);
      }
    }
    const body = document.querySelector("body");
    if (theme === THEME_TYPE.DARK) {
      body?.classList.add("dark");
    } else {
      body?.classList.remove("dark");
    }

    return () => {
      body?.classList.remove("dark");
    };
  }, [theme]);

  const getTheme = () => {
    return JSON.parse(localStorage.getItem("theme") as string);
  };

  return [theme, setTheme, getTheme];
}
