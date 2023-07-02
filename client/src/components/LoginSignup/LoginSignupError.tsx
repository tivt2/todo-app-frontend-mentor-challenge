interface LoginSignupErrorProps {
  message: string;
}

export function LoginSignupError({ message }: LoginSignupErrorProps) {
  return (
    <span className="font-medium text-[0.55rem] text-primaryRed">
      {message}
    </span>
  );
}
