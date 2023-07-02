import { InputHTMLAttributes, forwardRef } from "react";
import { LoginSingup } from ".";

interface LoginSignupInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const LoginSignupInput = forwardRef(
  ({ label, errorMessage, className, ...rest }: LoginSignupInputProps, ref) => {
    return (
      <div className={`w-full flex flex-col gap-1 ${className}`}>
        <label className=" mb-1 text-xs font-medium leading-none text-light-base-500">
          {label}
        </label>
        <input
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref?.current) {
              ref.current = node;
            }
          }}
          {...rest}
          className={`w-full outline-none rounded-[0.25rem] bg-transparent border border-light-base-300 dark:border-dark-base-300 px-2 py-1 caret-primaryBlue text-light-base-500 dark:text-dark-base-100`}
        />
        {errorMessage ? <LoginSingup.Error message={errorMessage} /> : null}
      </div>
    );
  }
);
