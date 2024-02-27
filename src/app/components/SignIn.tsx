import { signIn, signInWithGoogle } from "../../firebase/auth/signin";
import Input from "../components/Input";
import Button from "../components/Button";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import User from "../../zod/user";
import { z } from "zod";
import { useAuthContext } from "../context/AuthContext";
import SignInWithGoogle from "./SignInWithGoogle";

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const { updateUser, changeAuthDisplay } = useAuthContext();

  const onSignIn = async (
    authMethod: () => Promise<{
      result?: z.infer<typeof User>;
      error?: unknown;
    }>
  ) => {
    const { result, error } = await authMethod();
    if (result) {
      updateUser?.(result);
    }
    if (error) {
      return console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (values) =>
    onSignIn(() =>
      signIn({
        email: values.email,
        password: values.password,
      })
    );

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Sign In</h1>
      <SignInWithGoogle clickFunction={() => onSignIn(signInWithGoogle)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="example@mail.com"
          {...register("email")}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="password"
          {...register("password")}
        />
        <div className="flex items-center justify-between">
          <Button style="secondary" type="submit">
            Sign In
          </Button>
          <a
            className="font-bold text-sm text-sky-500 hover:text-sky-800"
            onClick={() => changeAuthDisplay("reset")}
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </>
  );
}
