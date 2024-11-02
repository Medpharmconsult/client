"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import { useForm } from "react-hook-form";

interface FormProps {
  name: string;
  code: string;
  collection: string;
}

export default function AddProfessionForm() {
  const { register, formState, handleSubmit } = useForm<FormProps>();
  const {
    errors: { name, code, collection },
  } = formState;
  const onSubmit = (formData: FormProps) => {
    console.log(formData);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-y-[18px] *:*:flex-1 *:flex-col *:*:*:w-full *:sm:items-end *:sm:flex-row flex-col *:flex *:flex-1 *:gap-x-[30px] *:gap-y-[18px]">
        <div>
          <Form.Group label="Profession name" error={name?.message}>
            <Form.Input
              placeholder="Enter name"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </Form.Group>
          <Form.Group label="Profession code" error={code?.message}>
            <Form.Input
              placeholder="Enter code"
              {...register("code", {
                required: "This field is required",
              })}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Profession collection" error={collection?.message}>
            <Form.Input
              placeholder="Enter collection"
              {...register("collection", {
                required: "This field is required",
              })}
            />
          </Form.Group>
          <div className="hidden sm:block"></div>
        </div>
      </div>
      <div className="flex gap-4 items-center mt-[6px]">
        <Button>Add profession</Button>
      </div>
    </Form>
  );
}
