"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { signInWithGoogle } from "@/firebase/auth/signin";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import User from "@/zod/user";
import { z } from "zod";
import { useAuthContext } from "@/context/AuthContext";
import SignInWithGoogle from "./SignInWithGoogle";

export default function SignUp() {
  const { handleSubmit, register, formState } = useForm();
  const { updateUser } = useAuthContext();

  const onSignUp = async (
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

  const onSubmit = handleSubmit(async (values) => {
    const { result, error } = await signUp(values.email, values.password);
    if (error) {
      return console.log(error);
    } else console.log(result);
  });

  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Sign Up</h1>
      <SignInWithGoogle clickFunction={() => onSignUp(signInWithGoogle)} />
      <form onSubmit={onSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
          {...register("email", { required: true })}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        <Input
          label="Confirm Password"
          id="confirm-password"
          type="password"
          placeholder="confirm password"
          {...register("confirm-password", {
            validate: (value, formValues) => value === formValues.password,
            required: true,
            minLength: 6,
          })}
        />
        <Button disabled={!formState.isValid} type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
}
