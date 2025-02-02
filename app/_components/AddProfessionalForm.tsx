"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import Spinner from "@/app/_components/Spinner";
import toast from "react-hot-toast";
import { addProfessional } from "@/app/_lib/actions";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { formValidate, randomNumber } from "../_lib/utilities";
import { addProfessionalType } from "../_lib/types";

export default function AddProfessionalForm({
  data,
}: {
  data: {
    _id: string;
    name: string;
    collection: string;
    code: string;
  }[];
}) {
  // Use form hook
  const { register, handleSubmit, reset, formState } =
    useForm<addProfessionalType>();
  const yoe = useRef<HTMLInputElement>(null);
  // Get form errors
  const { errors } = formState;
  // Use transition
  const [pending, start] = useTransition();
  // Submit function
  const onSubmit = (formData: addProfessionalType) => {
    const profession = data.find((prof) => prof.name === formData.profession);
    if (!profession) return;
    // New professional
    const newProfessional = {
      profCode: profession.code,
      yoe: Number(yoe.current?.value),
      username: `${formData.lastName}_${formData.firstName}${randomNumber(
        1000,
        5000
      )}`,
      ...formData,
    };
    // Send request
    start(async () => {
      const response = await addProfessional(newProfessional).finally(() => {
        // Reset form
        reset();
      });
      if (response) {
        // Success message
        toast.success("New professional added");
      } else {
        // Error message
        toast.error("Something went wrong");
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-y-5 *:*:flex-1 *:flex-col *:sm:items-end *:sm:flex-row flex-col *:flex *:flex-1 *:gap-x-[30px] *:gap-y-5">
        <div>
          <Form.Group label="First name" error={errors.firstName?.message}>
            <Form.Input
              placeholder="First name"
              type="text"
              styles="w-full"
              {...register("firstName", formValidate.default)}
            />
          </Form.Group>
          <Form.Group label="Last name" error={errors.lastName?.message}>
            <Form.Input
              placeholder="Last name"
              type="text"
              styles="w-full"
              {...register("lastName", formValidate.default)}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Password" error={errors.password?.message}>
            <Form.Input
              placeholder="Password"
              type="password"
              styles="w-full"
              {...register("password", formValidate.password)}
            />
          </Form.Group>

          <Form.Group label="Profession" error={errors.profession?.message}>
            <Form.Select
              styles="w-full capitalize"
              {...register("profession", formValidate.default)}
            >
              <option value="">Select profession</option>
              {data.map((prof) => (
                <option value={prof.name}>
                  {prof.name.charAt(0).toUpperCase() + prof.name.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Gender" error={errors.gender?.message}>
            <Form.Select
              styles="w-full"
              {...register("gender", formValidate.default)}
            >
              <option value="">Select gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group label="Years of experience">
            <Form.InputNumber defaultValue={1} max={80} ref={yoe} />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Phone number" error={errors.phoneNo?.message}>
            <Form.Input
              placeholder="Phone number"
              styles="w-full"
              {...register("phoneNo", formValidate.default)}
            />
          </Form.Group>
          <Form.Group label="Email" error={errors.email?.message}>
            <Form.Input
              placeholder="Email"
              styles="w-full"
              {...register("email", formValidate.email)}
            />
          </Form.Group>
        </div>
      </div>
      <div className="flex gap-4 items-center ">
        <Button disabled={pending}>Add professional</Button>
        {pending && <Spinner fill="#1341A3" />}
      </div>
    </Form>
  );
}
