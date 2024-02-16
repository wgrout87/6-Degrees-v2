"use client";
import React from "react";
import Button from "../components/Button";

type Props = {
  clickFunction: () => Promise<void>;
};

export default function SignInWithGoogle({ clickFunction }: Props) {
  return (
    <>
      <Button
        onClick={clickFunction}
        style="tertiary"
        className="w-full content-center my-2"
      >
        <img
          className="m-auto"
          src="/google.svg"
          alt="google_logo"
          width={24}
          height={24}
        />
      </Button>
      <hr className="my-2" />
    </>
  );
}
