"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { THEME_TYPE } from "@/types/types";
import { ReactNode, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: THEME_TYPE.SYSTEM,
  setTheme: (newTheme: THEME_TYPE) => {},
  brkpt: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<THEME_TYPE>(
    "theme",
    THEME_TYPE.SYSTEM
  );
  const [windowWidth, setWindowWidth] = useState(0);

  const windowBrkpt = windowWidth < 576;

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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, brkpt: windowBrkpt }}>
      {children}
    </ThemeContext.Provider>
  );
}
