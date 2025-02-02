"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Heading from "@/app/_components/Heading";
import Spinner from "@/app/_components/Spinner";
import Link from "next/link";
import { signIn } from "@/app/_lib/actions";
import { useState, useTransition } from "react";

export default function SignInForm({ admin = false }: { admin?: boolean }) {
  // Error state
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  // Sign in user
  const handleSubmit = (formData: FormData) => {
    // Get form values
    const data = {
      email: `${formData.get("email")}`,
      password: `${formData.get("password")}`,
      role: `${formData.get("role")}`,
    };
    start(async () => {
      const response = await signIn(data);
      // Set error message
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
        Sign in
      </Heading>
      <Form action={handleSubmit}>
        <Form.Group label="Email" error={error ? error : ""}>
          <Form.Input
            styles="w-full"
            placeholder="Email"
            name="email"
            required
            type="email"
          />
        </Form.Group>
        <Form.Group label="Password">
          <Form.Input
            styles="w-full"
            placeholder="Password"
            type="password"
            name="password"
            required
          />
        </Form.Group>
        {admin ? (
          <Form.Input type="hidden" value="admin" name="role" />
        ) : (
          <Form.Group label="Role">
            <Form.Select styles="w-full" name="role" required>
              <option value="">Select role</option>
              <option value="patient">Patient</option>
              <option value="professional">Staff</option>
            </Form.Select>
          </Form.Group>
        )}
        <Button styles=" w-full" disabled={pending}>
          {pending ? <Spinner /> : "Sign in"}
        </Button>
        {!admin && (
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
