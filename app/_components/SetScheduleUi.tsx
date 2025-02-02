"use client";
import Row from "@/app/_components/Row";
import RangeScheduleForm from "./RangeScheduleForm";
import SingleScheduleForm from "./SingleScheduleForm";
import { useState } from "react";
import { ITabButton } from "@/app/_lib/types";

export default function SetScheduleUi() {
  // Tab state
  const [state, setState] = useState<"single" | "range">("single");
  return (
    <div>
      <div className="bg-white rounded-5 border-1 border-grey-300  flex-1 px-4 xs:px-6 py-6">
        <div className="overflow-hidden border-grey-300 border-b-1  mb-6">
          <span className="inline-flex gap-x-2">
            <TabButton
              isActive={state === "single"}
              onClick={() => setState("single")}
            >
              Single
            </TabButton>
            <TabButton
              onClick={() => setState("range")}
              isActive={state === "range"}
            >
              Range
            </TabButton>
          </span>
        </div>
        {state === "single" ? <SingleScheduleForm /> : <RangeScheduleForm />}
      </div>
    </div>
  );
}

// Tab button
function TabButton({ isActive, children, styles = "", ...props }: ITabButton) {
  return (
    <button
      className={`${styles} relative font-semibold w-full transition-none p-4 pt-0 ${
        isActive
          ? `text-primary-100  after:bottom-0 z-10 after:w-full after:left-0 after:h-[2px] after:content-[""] after:block after:absolute after:bg-primary-100`
          : " text-black-100"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
