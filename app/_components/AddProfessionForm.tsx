"use client";
import Button from "@/app/_components/Button";
import Form from "@/app/_components/Form";
import { useForm } from "react-hook-form";
import { addProfessionType } from "../_lib/types";
import { formValidate } from "../_lib/utilities";

export default function AddProfessionForm() {
  // Use form hook
  const { register, formState, handleSubmit } = useForm<addProfessionType>();
  // Get errors
  const {
    errors: { name, code, collection },
  } = formState;
  // Handle submit
  const onSubmit = (formData: addProfessionType) => {
    console.log(formData);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-y-5 *:*:flex-1 *:flex-col *:*:*:w-full *:sm:items-end *:sm:flex-row flex-col *:flex *:flex-1 *:gap-x-[30px] *:gap-y-5">
        <div>
          <Form.Group label="Name" error={name?.message}>
            <Form.Input
              placeholder="Name"
              {...register("name", formValidate.default)}
            />
          </Form.Group>
          <Form.Group label="Code" error={code?.message}>
            <Form.Input
              placeholder="Code"
              {...register("code", formValidate.default)}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group label="Collection" error={collection?.message}>
            <Form.Input
              placeholder="Collection"
              {...register("collection", formValidate.default)}
            />
          </Form.Group>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button>Add profession</Button>
      </div>
    </Form>
  );
}
