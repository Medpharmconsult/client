"use client";
import Form from "@/app/_components/Form";
import Heading from "@/app/_components/Heading";
import Link from "next/link";
import Button from "./Button";
import Spinner from "./Spinner";
import { signUp } from "@/app/_lib/actions";
import { formValidate, randomNumber } from "@/app/_lib/utilities";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signUpType } from "../_lib/types";

export default function SignupForm() {
  // Error state
  const [error, setError] = useState<string>("");
  const [pending, start] = useTransition();
  const { register, handleSubmit, formState } = useForm<signUpType>();
  const {
    errors: { lastName, firstName, email, password },
  } = formState;
  const onSubmit = (formData: signUpType) => {
    // Get form values
    const data = {
      ...formData,
      username: `${formData.lastName}_${formData.firstName}${randomNumber(
        1000,
        5000
      )}`,
    };
    // Send request
    start(async () => {
      const response = await signUp(data);
      if (response) {
        setError(response);
        // Remove error
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    });
  };

  return (
    <div>
      <Heading type="h2" styles="text-center mb-6 xs:mb-8">
        Sign up
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group label="First name" error={firstName?.message || error}>
          <Form.Input
            styles="w-full"
            placeholder="First name"
            {...register("firstName", formValidate.default)}
          />
        </Form.Group>
        <Form.Group label="Last name" error={lastName?.message}>
          <Form.Input
            styles="w-full"
            placeholder="Last name"
            {...register("lastName", formValidate.default)}
          />
        </Form.Group>
        <Form.Group label="Email" error={email?.message}>
          <Form.Input
            styles="w-full"
            placeholder="Email"
            {...register("email", formValidate.email)}
          />
        </Form.Group>
        <Form.Group label="Password" error={password?.message}>
          <Form.Input
            styles="w-full"
            placeholder="Password"
            type="password"
            {...register("password", formValidate.password)}
          />
        </Form.Group>
        <Button styles=" w-full" disabled={pending}>
          {pending ? <Spinner /> : "Sign up"}
        </Button>
        <div className="text-center w-full mt-3 font-semibold text-grey-400">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-black-100">
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
}
