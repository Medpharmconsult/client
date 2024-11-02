"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { addProfessional } from "@/app/_lib/actions";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormProps {
  firstName: string;
  lastName: string;
  username: string;
  profession: string;
  gender: string;
  phoneNo: string;
  email: string;
  password: string;
}

export default function AddProfessionalForm({
  professions,
}: {
  professions: {
    _id: string;
    name: string;
    collection: string;
    code: string;
  }[];
}) {
  const { register, handleSubmit, reset, formState } = useForm<FormProps>();
  const yoe = useRef<HTMLInputElement>(null);
  const {
    errors: {
      firstName,
      lastName,
      password,
      phoneNo,
      email,
      username,
      profession,
      gender,
    },
  } = formState;
  const [isPending, startTransition] = useTransition();
  const onSubmit = (formData: FormProps) => {
    const profData = professions.filter(
      (prof) => prof.name === formData.profession
    )[0];
    const data = {
      profCode: profData.code,
      yoe: Number(yoe.current?.value),
      ...formData,
    };
    startTransition(async () => {
      const res = await addProfessional(data);
      if (res.status) toast.success(res.msg);
      else toast.error(res.msg);
      reset();
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-y-[18px] *:*:flex-1 *:flex-col *:sm:items-end *:sm:flex-row flex-col *:flex *:flex-1 *:gap-x-[30px] *:gap-y-[18px]">
        <div>
          <Form.Group label="First name" error={firstName?.message}>
            <Form.Input
              placeholder="Enter first name"
              type="text"
              classname="w-full"
              {...register("firstName", {
                required: "This field is required",
              })}
            />
          </Form.Group>
          <Form.Group label="Last name" error={lastName?.message}>
            <Form.Input
              placeholder="Enter last name"
              type="text"
              classname="w-full"
              {...register("lastName", {
                required: "This field is required",
              })}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="User name" error={username?.message}>
            <Form.Input
              placeholder="Enter user name"
              type="text"
              classname="w-full"
              {...register("username", {
                required: "This field is required",
              })}
            />
          </Form.Group>
          <Form.Group label="Profession" error={profession?.message}>
            <Form.Select
              classname="w-full capitalize"
              {...register("profession", {
                required: "This field is required",
              })}
            >
              <option value="">Select profession</option>
              {professions?.map((prof) => (
                <option value={prof.name}>
                  {prof.name.charAt(0).toUpperCase() + prof.name.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Gender" error={gender?.message}>
            <Form.Select
              classname="w-full"
              {...register("gender", {
                required: "This field is required",
              })}
            >
              <option value="">Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group label="Years of experience">
            <Form.InputNumber defaultVal={1} maxVal={100} ref={yoe} />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Phone number" error={phoneNo?.message}>
            <Form.Input
              placeholder="Enter phone number"
              classname="w-full"
              {...register("phoneNo", {
                required: "This field is required",
              })}
            />
          </Form.Group>
          <Form.Group label="Email" error={email?.message}>
            <Form.Input
              placeholder="Enter email"
              classname="w-full"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              })}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Password" error={password?.message}>
            <Form.Input
              placeholder="Enter password"
              type="password"
              classname="w-full"
              {...register("password", {
                required: "This field is required",
                validate: {
                  minLength: (value) =>
                    /(.{8,})/.test(value) || "Minimum of 8 characters",
                  hasUpcase: (value) =>
                    /(?=.*[A-Z])/.test(value) ||
                    "At least one uppercase letter",
                  hasLocase: (value) =>
                    /(?=.*[a-z])/.test(value) ||
                    "At least one lowercase letter",
                  hasDigit: (value) =>
                    /(?=.*\d)/.test(value) || "At least one digit",
                  hasChar: (value) =>
                    /(?=.*?[#?!@$%^&*-])/.test(value) ||
                    "At least one special character",
                },
              })}
            />
          </Form.Group>
          <div className="hidden sm:block"></div>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-[6px]">
        <Button disabled={isPending}>Add professional</Button>
        {isPending && <SpinnerMini fill="#1341A3" />}
      </div>
    </Form>
  );
}
