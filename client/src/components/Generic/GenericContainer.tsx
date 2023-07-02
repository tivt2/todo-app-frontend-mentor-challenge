import { HTMLAttributes, ReactNode } from "react";

interface GenericContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GenericContainer({
  children,
  className,
  ...rest
}: GenericContainerProps) {
  return (
    <div className={` bg-light-base-100 rounded-lg ${className}`} {...rest}>
      {children}
    </div>
  );
}
