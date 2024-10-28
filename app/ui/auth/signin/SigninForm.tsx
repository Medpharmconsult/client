"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Heading from "@/app/_components/Heading";
import SpinnerMini from "@/app/_components/SpinnerMini";
import Link from "next/link";
import { signIn } from "@/app/_lib/actions";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface SignInProps {
  email: string;
  password: string;
  role: string;
}

const initialErrors = {
  email: "",
  password: "",
};

export default function LoginForm({ isAdmin }: { isAdmin?: boolean }) {
  const { register, handleSubmit, formState } = useForm<SignInProps>();
  const [serverError, setServerError] = useState(initialErrors);
  const {
    errors: { email, password, role },
  } = formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: SignInProps) => {
    const signInData = { email: data.email, password: data.password };
    const userRole = data.role;
    startTransition(async () => {
      const serverRes = await signIn(signInData, userRole);
      if (serverRes) {
        switch (true) {
          case serverRes.includes("email"):
            setServerError({
              ...initialErrors,
              email: "invalid email or password",
            });
            break;
          case serverRes.includes("password"):
            setServerError({
              ...initialErrors,
              password: "incorrect password format",
            });
            break;
          default:
        }
      }
    });
  };
  return (
    <div>
      <Heading type="h2" classname="text-center mb-[24px] xs:mb-[32px]">
        Sign in
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group label="Email" error={email?.message || serverError.email}>
          <Form.Input
            classname="w-full"
            placeholder="Enter email"
            {...register("email", {
              required: "This field is required",
              onChange: () => {
                if (serverError.email)
                  setServerError({ ...serverError, email: "" });
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
        </Form.Group>
        <Form.Group
          label="Password"
          error={password?.message || serverError.password}
        >
          <Form.Input
            classname="w-full"
            placeholder="Enter password"
            type="password"
            {...register("password", {
              onChange: () => {
                if (serverError.password || serverError.email)
                  setServerError(initialErrors);
              },
              required: "This field is required",
            })}
          />
        </Form.Group>
        {isAdmin ? (
          <Form.Input type="hidden" value="admin" {...register("role")} />
        ) : (
          <Form.Group label="Role" error={role?.message}>
            <Form.Select
              classname="w-full"
              defaultValue=""
              {...register("role", {
                required: "This field is required",
              })}
            >
              <option value="">Select user role</option>
              <option value="patient">Patient</option>
              <option value="professional">Staff</option>
            </Form.Select>
          </Form.Group>
        )}

        <Button classname="mt-[6px] w-full" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Sign in"}
        </Button>
        {!isAdmin && (
          <div className="text-center w-full mt-[12px] font-semibold text-grey-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-black-100">
              Sign up
            </Link>
          </div>
        )}
      </Form>
    </div>
  );
}
