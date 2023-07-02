import { Generic } from "@/components/Generic";
import { LoginSignupComponent } from "@/components/LoginSignup/LoginSignupComponent";
import { TodoApp } from "@/components/TodoApp/TodoApp";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function SPA() {
  const { auth, handleLogout } = useContext(AuthContext);

  return (
    <main className=" h-screen flex flex-col items-center justify-center gap-4 bg-light-base-100">
      {auth ? (
        <div>
          <button
            onClick={() => handleLogout()}
            className="p-2 bg-primaryRed text-black"
          >
            Logout
          </button>
          <TodoApp />
        </div>
      ) : (
        <Generic.Container>
          <LoginSignupComponent />
        </Generic.Container>
      )}
    </main>
  );
}
