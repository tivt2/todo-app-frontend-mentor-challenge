import { Generic } from "@/components/Generic";
import { BackgroundImage } from "@/components/Header/BackgroundImage";
import { Header } from "@/components/Header/Header";
import { LoginSignupComponent } from "@/components/LoginSignup/LoginSignupComponent";
import { TodoApp } from "@/components/TodoApp/TodoApp";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function SPA() {
  const { auth, handleLogout } = useContext(AuthContext);

  return (
    <main className="relative z-0 w-full h-screen flex flex-col items-center bg-light-base-100 dark:bg-dark-base-600">
      <BackgroundImage />
      <div className=" w-full max-w-lg flex flex-col items-center py-10 px-5 brkpt:py-16">
        <Header />
        {auth ? (
          <TodoApp />
        ) : (
          <Generic.Container>
            <LoginSignupComponent />
          </Generic.Container>
        )}
        <footer className=" mt-10">
          <p className=" w-full text-xs text-light-base-400 dark:text-dark-base-300">
            Drag and drop to reorder list
          </p>
        </footer>
      </div>
    </main>
  );
}
