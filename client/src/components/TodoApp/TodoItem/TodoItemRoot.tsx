import { HTMLAttributes, ReactNode, forwardRef } from "react";

interface TodoItemRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const TodoItemRoot = ({
  children,
  className,
  ...rest
}: TodoItemRootProps) => {
  return (
    <div className={` ${className}`} {...rest}>
      {children}
    </div>
  );
};
