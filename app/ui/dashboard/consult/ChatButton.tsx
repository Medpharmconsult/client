"use client";

import Button from "@/app/_components/Button";
import { setContactId } from "@/app/_lib/actions";
import { FaPaperPlane } from "react-icons/fa6";

export default function ChatButton({
  contact,
}: {
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    profileImg: string;
    contactId: string;
  };
}) {
  return (
    <Button classname="gap-x-2" onClick={() => setContactId(contact)}>
      <FaPaperPlane />
      Send message
    </Button>
  );
}
