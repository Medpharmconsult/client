"use client";
import Row from "@/app/_components/Row";
import { useState } from "react";
import RangeForm from "./RangeForm";
import SingleForm from "./SingleForm";

export default function SetScheduleUi() {
  const [isSingle, setIsSingle] = useState(true);

  return (
    <div>
      <Row hasSpacing={false}>
        <div className="bg-white rounded-5 border-1 border-grey-300  flex-1 px-4 pt-4 pb-6">
          <div className="overflow-hidden border-grey-300 border-b-1 mb-6">
            <span className="inline-flex gap-x-2">
              <TabButton isActive={isSingle} onClick={() => setIsSingle(true)}>
                Single
              </TabButton>
              <TabButton
                onClick={() => setIsSingle(false)}
                isActive={!isSingle}
              >
                Range
              </TabButton>
            </span>
          </div>
          {isSingle ? <SingleForm /> : <RangeForm />}
        </div>
      </Row>
    </div>
  );
}

interface TabButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  classname?: string;
}

function TabButton({
  isActive,
  children,
  classname = "",
  ...props
}: TabButton) {
  return (
    <button
      className={`${classname} relative font-semibold w-full transition-none p-4 ${
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
