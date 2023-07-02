import { api } from "@/api/axios";
import { TauthContext } from "@/types/types";
import { ReactNode, createContext, useState } from "react";

export const AuthContext = createContext<TauthContext>({} as TauthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(false);

  const handleLogin = (payload: { username: string; password: string }) => {
    console.log("trying to login");
    return api.post("/login", payload);
  };

  const handleRegister = (payload: { username: string; password: string }) => {
    console.log("trying to register");
    return api.post("/register", payload);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
