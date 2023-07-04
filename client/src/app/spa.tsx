"use client";

import { BackgroundImage } from "@/components/Header/BackgroundImage";
import { Header } from "@/components/Header/Header";
import { LoginSignupComponent } from "@/components/LoginSignup/LoginSignupComponent";
import { TodoApp } from "@/components/TodoApp/TodoApp";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";

export function SPA() {
  const { auth } = useContext(AuthContext);

  return (
    <main className="relative z-0 w-full min-h-screen flex flex-col items-center bg-light-base-100 dark:bg-dark-base-600">
      <BackgroundImage />
      <div className=" w-full max-w-xl flex flex-col items-center py-11 px-6 brkpt:py-20">
        <Header />
        {auth ? <TodoApp /> : <LoginSignupComponent />}
        <footer className=" mt-10">
          <p className=" w-full text-xs font-bold tracking-wide text-light-base-400 dark:text-dark-base-300">
            Drag and drop to reorder list
          </p>
        </footer>
      </div>
    </main>
  );
}
