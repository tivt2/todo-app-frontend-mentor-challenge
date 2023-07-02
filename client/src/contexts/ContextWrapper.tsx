import { queryClient } from "@/api/queryClient";
import { QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./AuthContext";
import { ReactNode } from "react";

interface ContextWrapperProps {
  children: ReactNode;
}

export function ContextWrapper({ children }: ContextWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </QueryClientProvider>
  );
}
