"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Heading from "@/app/_components/Heading";
import SpinnerMini from "@/app/_components/SpinnerMini";
import Link from "next/link";
import toast from "react-hot-toast";
import { signUp } from "@/app/_lib/actions";
import { capitalizeFirstLetter, getRandomNumber } from "@/app/_lib/utilities";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

interface SignUpProps {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export default function SignupForm() {
  const { register, handleSubmit, formState } = useForm<SignUpProps>();
  const [isPending, startTransition] = useTransition();
  const {
    errors: { lastName, firstName, email, password },
  } = formState;

  const onSubmit = (data: SignUpProps) => {
    const signUpData = {
      ...data,
      username: `${data.lastName}_${data.firstName}${getRandomNumber(
        1000,
        5000
      )}`,
    };
    startTransition(async () => {
      const serverRes = await signUp(signUpData);
      if (serverRes) {
        toast.error(capitalizeFirstLetter(serverRes));
      }
    });
  };

  return (
    <div>
      <Heading type="h2" classname="text-center mb-6 xs:mb-8">
        Sign up
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group label="First name" error={firstName?.message}>
          <Form.Input
            classname="w-full"
            placeholder="Enter your first name"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
        </Form.Group>
        <Form.Group label="Last name" error={lastName?.message}>
          <Form.Input
            classname="w-full"
            placeholder="Enter your last name"
            {...register("lastName", {
              required: "This field is required",
            })}
          />
        </Form.Group>
        <Form.Group label="Email" error={email?.message}>
          <Form.Input
            classname="w-full"
            placeholder="Enter email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
        </Form.Group>
        <Form.Group label="Password" error={password?.message}>
          <Form.Input
            classname="w-full"
            placeholder="Enter password"
            type="password"
            {...register("password", {
              required: "This field is required",
              validate: {
                minLength: (value) =>
                  /(.{8,})/.test(value) || "Minimum of 8 characters",
                hasUpcase: (value) =>
                  /(?=.*[A-Z])/.test(value) || "At least one uppercase letter",
                hasLocase: (value) =>
                  /(?=.*[a-z])/.test(value) || "At least one lowercase letter",
                hasDigit: (value) =>
                  /(?=.*\d)/.test(value) || "At least one digit",
                hasChar: (value) =>
                  /(?=.*?[#?!@$%^&*-])/.test(value) ||
                  "At least one special character",
              },
            })}
          />
        </Form.Group>
        <Button classname="mt-[6px] w-full" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Sign up"}
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
