import { useContext } from "react";
import { Generic } from "../Generic";
import { AuthContext } from "@/contexts/AuthProvider";
import { THEME_TYPE } from "@/types/types";
import { Icon } from "../Icons";
import { ThemeContext } from "@/contexts/ThemeProvider";

export function Header() {
  const { auth, handleLogout } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <header className=" w-full flex flex-row items-center justify-between text-light-base-100 mb-8 brkpt:mb-10">
      <h1 className="text-2xl font-bold brkpt:text-5xl tracking-[0.3em]">
        TODO
      </h1>
      <div className="flex flex-row items-center gap-6">
        {auth ? (
          <Generic.Button
            text="LOGOUT"
            className=" text-xs text-light-base-100 border border-light-base-100 rounded-md px-3 py-2 pt-[0.65rem] hover:border-dark-base-100 hover:text-dark-base-100 hover:shadow-md transition-all"
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
