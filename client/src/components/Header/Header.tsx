import { useContext, useEffect } from "react";
import { Generic } from "../Generic";
import { AuthContext } from "@/contexts/AuthContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { THEME_TYPE } from "@/types/types";
import { BackgroundImage } from "./BackgroundImage";
import { useTheme } from "@/hooks/useTheme";
import { Icon } from "../Icons";

export function Header() {
  const { auth, handleLogout } = useContext(AuthContext);
  const [theme, setTheme] = useTheme();

  return (
    <header className=" w-full flex flex-row items-center justify-between text-light-base-100 mb-6 brkpt:mb-10">
      <h1 className="text-2xl brkpt:text-4xl tracking-[0.3em]">TODO</h1>
      <div className="flex flex-row items-center gap-6">
        {auth ? (
          <Generic.Button
            text="LOGOUT"
            className=" text-xs border border-light-base-100 rounded-md px-2 py-1"
            onClick={() => handleLogout()}
          />
        ) : null}
        <Generic.Button
          icon={theme === THEME_TYPE.DARK ? Icon.Sun : Icon.Moon}
          className=" scale-[80%] brkpt:scale-100"
          onClick={() =>
            theme === THEME_TYPE.DARK
              ? setTheme(THEME_TYPE.LIGHT)
              : setTheme(THEME_TYPE.DARK)
          }
        />
      </div>
    </header>
  );
}
