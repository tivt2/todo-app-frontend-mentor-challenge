import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSingup } from ".";
import { Generic } from "../Generic";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

const LoginSingupSchema = z.object({
  username: z
    .string()
    .min(3, "Minumum of 3 characters")
    .max(20)
    .nonempty("Cannot be empty"),
  password: z
    .string()
    .min(4, "Minimum of 5 characters")
    .max(30)
    .nonempty("Cannot be empty"),
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
        localStorage.setItem("token", token);
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
          setIsSignup(false);
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
    <Generic.Container className="p-8 max-w-sm flex flex-col justify-center items-center mt-14">
      <form
        onSubmit={handleSubmit(isSingup ? onSignup : onLogin)}
        className="w-full"
      >
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
            className=" px-4 py-2 pt-[0.65rem] text-bold rounded-md text-xs text-light-base-500 bg-light-base-300 font-bold hover:bg-dark-base-100 hover:shadow-md transition-all"
          />
          <Generic.Button
            text={isSingup ? "REGISTER" : "LOGIN"}
            type={"submit"}
            className=" px-4 py-2 pt-[0.65rem] text-bold rounded-md text-xs text-light-base-200 bg-light-base-500 font-bold hover:brightness-110 hover:dark:brightness-90 hover:shadow-md transition-all"
          />
        </div>
      </form>
      {isSingup ? null : (
        <p className=" justify-self-center text-xs mt-6 text-light-base-400 text-center w-[75%]">
          To login without registering type{" "}
          <span className="text-primaryBlue text-sm">guest</span> for user name
          and password
        </p>
      )}
    </Generic.Container>
  );
}
