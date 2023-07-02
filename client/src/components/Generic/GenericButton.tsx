import { ButtonHTMLAttributes, ElementType } from "react";

interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType;
  text?: string;
}

export function GenericButton({
  icon: Icon,
  text,
  className,
  ...rest
}: GenericButtonProps) {
  return (
    <button
      {...rest}
      className={`flex items-center justify-center gap-1 font-medium ${
        className ?? ""
      }`}
    >
      {Icon ? <Icon /> : null}
      {text}
    </button>
  );
}
