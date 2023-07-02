import { HTMLAttributes, ReactNode } from "react";

interface TodoItemRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TodoItemRoot({
  children,
  className,
  ...rest
}: TodoItemRootProps) {
  return (
    <div className={` ${className}`} {...rest}>
      {children}
    </div>
  );
}
