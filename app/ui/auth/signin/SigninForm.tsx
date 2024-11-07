"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Heading from "@/app/_components/Heading";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { signIn } from "@/app/_lib/actions";
import { capitalizeFirstLetter } from "@/app/_lib/utilities";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SignInProps {
  email: string;
  password: string;
  role: string;
}

export default function LoginForm({ isAdmin = false }: { isAdmin?: boolean }) {
  const { register, handleSubmit, formState } = useForm<SignInProps>();
  const {
    errors: { email, password, role },
  } = formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: SignInProps) => {
    const signInData = { email: data.email, password: data.password };
    const role = data.role;
    startTransition(async () => {
      const serverRes = await signIn(signInData, role);
      if (serverRes) {
        toast.error(capitalizeFirstLetter(serverRes));
      }
    });
  };
  return (
    <div>
      <Heading type="h2" classname="text-center mb-6 xs:mb-8">
        Sign in
      </Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="text-center w-full mt-3 font-semibold text-grey-400">
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
