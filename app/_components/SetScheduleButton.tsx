"use client";
import Button from "./Button";
import Spinner from "./Spinner";
import { useFormStatus } from "react-dom";

// Submit button
export default function SetScheduleButton() {
  const { pending } = useFormStatus();
  return (
    <div className=" gap-4 items-center flex">
      <Button disabled={pending}>Set schedule</Button>
      {pending && <Spinner fill="#1341A3" />}
    </div>
  );
}
