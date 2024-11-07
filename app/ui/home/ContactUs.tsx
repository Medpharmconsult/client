"use client";
import Container from "@/app/_components/Container";
import Section from "@/app/_components/Section";
import Form from "../../_components/Form";
import Heading from "../../_components/Heading";
import Button from "@/app/_components/Button";
import toast from "react-hot-toast";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { useForm } from "react-hook-form";
import { sendMail } from "@/app/_lib/actions";
import { useTransition } from "react";

interface ContactProps {
  name: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const { formState, handleSubmit, reset, register } = useForm<ContactProps>();
  const [isPending, startTransition] = useTransition();
  const {
    errors: { name, email, message },
  } = formState;
  function onSubmit(data: ContactProps) {
    startTransition(async () => {
      const res = await sendMail(data);
      if (res) toast.success("Email sent successfully");
      else toast.error("Something went wrong");
      reset();
    });
  }
  return (
    <Section id="contact">
      <Container classname="text-center">
        <Heading type="h2">Contact us</Heading>
        <Section.Content>
          <div>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              classname="max-w-[830px] w-full mx-auto"
            >
              <div className="flex flex-col gap-x-[30px] sm:flex-row sm:items-center sm:justify-between gap-y-[18px]">
                <Form.Group
                  label="Name"
                  error={name?.message}
                  classname="flex-1"
                >
                  <Form.Input
                    placeholder="Enter your name"
                    classname="w-full"
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />
                </Form.Group>
                <Form.Group
                  label="Email"
                  error={email?.message}
                  classname="flex-1"
                >
                  <Form.Input
                    placeholder="Enter your email"
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
              <Form.Group label="Message" error={message?.message}>
                <Form.TextArea
                  placeholder="Enter your message"
                  {...register("message", {
                    required: "This field is required",
                  })}
                />
              </Form.Group>
              <div className="mt-[6px] flex  items-center gap-4">
                <Button disabled={isPending}>Send message</Button>
                {isPending && <SpinnerMini fill="#1341A3" />}
              </div>
            </Form>
          </div>
        </Section.Content>
      </Container>
    </Section>
  );
}
