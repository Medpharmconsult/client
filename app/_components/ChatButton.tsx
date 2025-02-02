"use client";
import Button from "./Button";
import { setContact } from "../_lib/actions";

export default function ChatButton({
  contact,
}: {
  contact: {
    username: string;
    id: string;
    profileImg: string;
  };
}) {
  return (
    <Button
      size="sm"
      onClick={() => {
        setContact(contact);
      }}
      styles="self-start mt-2"
    >
      Send message
    </Button>
  );
}
