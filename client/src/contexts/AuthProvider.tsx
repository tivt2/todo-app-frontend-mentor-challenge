import { api } from "@/api/axios";
import { TauthContext } from "@/types/types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";

export const AuthContext = createContext<TauthContext>({} as TauthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      setAuth(token ? true : false);
    } catch {
      setAuth(false);
    }
  }, [auth]);

  const handleLogin = (payload: { username: string; password: string }) => {
    return api.post("/login", payload);
  };

  const handleRegister = (payload: { username: string; password: string }) => {
    return api.post("/register", payload);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries("todos");
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
