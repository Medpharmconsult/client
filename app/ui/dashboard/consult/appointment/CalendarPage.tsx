"use client";
import CurrentMonthPage from "./CurrentMonthPage";
import NextMonthPage from "./NextMonthPage";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useAppointmentContext } from "./AppointmentCalendar";
import {
  formatDate,
  getCurrentMonth,
  getNextMonth,
} from "@/app/_lib/utilities";

export default function CalendarPage() {
  const { isCurrent, setIsCurrent } = useAppointmentContext();
  const currentMonth = formatDate(getCurrentMonth(), {
    month: "long",
    year: "numeric",
  });
  const nextMonth = formatDate(getNextMonth(), {
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <div className="flex justify-between items-center border-grey-300 border-b-[1px] pb-[12px] mb-[12px]">
        <button
          onClick={() => setIsCurrent(true)}
          disabled={isCurrent}
          className="cursor-pointer"
        >
          <BsChevronLeft
            size={18}
            className={`${isCurrent ? "opacity-35 cursor-default" : ""}`}
          />
        </button>
        <span className="font-semibold text-[18px] tracking-normal">
          {isCurrent ? currentMonth : nextMonth}
        </span>
        <button
          onClick={() => setIsCurrent(false)}
          disabled={!isCurrent}
          className="cursor-pointer"
        >
          <BsChevronRight
            size={18}
            className={`${!isCurrent ? "opacity-35 cursor-default" : ""}`}
          />
        </button>
      </div>
      {isCurrent ? <CurrentMonthPage /> : <NextMonthPage />}
    </>
  );
}
