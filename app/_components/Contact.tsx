"use client";
import Container from "@/app/_components/Container";
import Section from "@/app/_components/Section";
import Form from "./Form";
import Heading from "./Heading";
import Button from "@/app/_components/Button";
import toast from "react-hot-toast";
import Spinner from "@/app/_components/Spinner";
import { sendMessage } from "@/app/_lib/actions";
import { useTransition } from "react";

export default function Contact() {
  const [pending, start] = useTransition();
  // Send message
  function handleSubmit(formData: FormData) {
    // Get form values
    const data = {
      name: `${formData.get("name")}`,
      email: `${formData.get("email")}`,
      message: `${formData.get("message")}`,
    };
    start(async () => {
      const response = await sendMessage(data);
      if (response) toast.success("Email sent successfully");
      else toast.error("Something went wrong");
    });
  }
  return (
    <Section id="contact">
      <Container styles="text-center">
        <Heading type="h2">Contact us</Heading>
        <Section.Content>
          <div>
            <Form styles="max-w-[720px] w-full mx-auto" action={handleSubmit}>
              <div className="flex flex-col gap-x-[30px] sm:flex-row sm:items-center sm:justify-between gap-y-5">
                <Form.Group label="Name" styles="flex-1">
                  <Form.Input
                    placeholder="Name"
                    styles="w-full"
                    required
                    name="name"
                  />
                </Form.Group>
                <Form.Group label="Email" styles="flex-1">
                  <Form.Input
                    placeholder="Email"
                    styles="w-full"
                    required
                    name="email"
                  />
                </Form.Group>
              </div>
              <Form.Group label="Message">
                <Form.TextArea placeholder="Message" required name="message" />
              </Form.Group>
              <div className="flex items-center gap-4">
                <Button disabled={pending}>Send message</Button>
                {pending && <Spinner fill="#1341A3" />}
              </div>
            </Form>
          </div>
        </Section.Content>
      </Container>
    </Section>
  );
}
