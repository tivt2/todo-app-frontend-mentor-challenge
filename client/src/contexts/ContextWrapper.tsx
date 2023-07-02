import { queryClient } from "@/api/queryClient";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthProvider";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

interface ContextWrapperProps {
  children: ReactNode;
}

export function ContextWrapper({ children }: ContextWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
