import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSingup } from ".";
import { Generic } from "../Generic";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const LoginSingupSchema = z.object({
  username: z.string().nonempty("Cannot be empty"),
  password: z.string().nonempty("Cannot be empty"),
  confirm: z.string().optional(),
});

type TloginSignup = z.infer<typeof LoginSingupSchema>;

export function LoginSignupComponent() {
  const { setAuth, handleRegister, handleLogin } = useContext(AuthContext);
  const [isSingup, setIsSignup] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TloginSignup>({
    resolver: zodResolver(LoginSingupSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin: SubmitHandler<TloginSignup> = (data) => {
    const payload = { username: data.username, password: data.password };
    handleLogin(payload)
      .then((data) => {
        const token = data.data.token;
        sessionStorage.setItem("token", token);
        setAuth(true);
      })
      .catch((err) => {
        setError("username", { message: err.response.data.message });
      });
    resetValues();
  };

  const onSignup: SubmitHandler<TloginSignup> = (data) => {
    const payload = { username: data.username, password: data.password };
    if (data.password === data.confirm) {
      handleRegister(payload)
        .then((data) => {
          console.log(data.data.message);
        })
        .catch((err) =>
          setError("username", { message: err.response.data.message })
        );
    } else {
      setError("password", { message: "Both password must match" });
    }
    resetValues();
  };

  const resetValues = () => {
    setValue("username", "");
    setValue("password", "");
    setValue("confirm", "");
  };

  return (
    <Generic.Container className="p-8">
      <form onSubmit={handleSubmit(isSingup ? onSignup : onLogin)}>
        <LoginSingup.Input
          type={"username"}
          label="user name:"
          {...register("username")}
          errorMessage={errors.username?.message}
        />
        <LoginSingup.Input
          type={"password"}
          label="password:"
          {...register("password")}
          className=" mt-8"
          errorMessage={errors.password?.message}
        />
        {isSingup ? (
          <LoginSingup.Input
            type={"password"}
            label="confirm password:"
            {...register("confirm")}
            className=" mt-4"
            errorMessage={errors.confirm?.message}
          />
        ) : null}
        <div className=" w-full flex flex-row justify-between items-center mt-8">
          <Generic.Button
            text={isSingup ? "SIGNIN" : "SIGNUP"}
            type={"reset"}
            onClick={() => {
              setIsSignup((curr) => !curr);
              clearErrors(["username", "password", "confirm"]);
            }}
            className=" px-4 py-2 text-bold rounded-md text-xs text-light-base-500 bg-light-base-300"
          />
          <Generic.Button
            text={isSingup ? "REGISTER" : "LOGIN"}
            type={"submit"}
            className=" px-4 py-2 text-bold rounded-md text-xs text-light-base-300 bg-light-base-500"
          />
        </div>
      </form>
    </Generic.Container>
  );
}
