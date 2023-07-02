import { ReactNode } from "react";

interface TodoItemRootProps {
  children: ReactNode;
}

export function TodoItemRoot({ children }: TodoItemRootProps) {
  return <div>{children}</div>;
}
