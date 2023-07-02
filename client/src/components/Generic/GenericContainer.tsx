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
    <div
      className={`w-full rounded-[0.3rem] bg-light-base-100 dark:bg-dark-base-500 shadow-lightMobile dark:shadow-darkMobile brkpt:shadow-lightDesktop brkpt:dark:shadow-darkMobile ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
