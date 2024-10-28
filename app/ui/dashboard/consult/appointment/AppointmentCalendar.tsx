"use client";
import { createContext, useContext, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import CalendarPage from "./CalendarPage";
import BookAppointment from "./BookAppointment";
const AppointmentContext = createContext<any>(undefined);
export const useAppointmentContext = () => useContext(AppointmentContext);

export default function AppointmentCalendar({
  currentAppointments,
  nextAppointments,
  profID,
}: {
  currentAppointments: string[];
  profID: string;
  nextAppointments: string[];
}) {
  const [isCurrent, setIsCurrent] = useState(true);
  const [isCalendar, setIsCalendar] = useState(true);
  const [date, setDate] = useState<Date>();

  return (
    <AppointmentContext.Provider
      value={{
        setDate,
        date,
        setIsCalendar,
        isCurrent,
        setIsCurrent,
        currentAppointments,
        nextAppointments,
      }}
    >
      {isCalendar ? (
        <CalendarPage />
      ) : (
        <>
          <div className="flex justify-between items-center border-grey-300 border-b-[1px] pb-[12px] mb-[12px]">
            <button
              onClick={() => {
                setDate(undefined);
                setIsCalendar(true);
              }}
              className="cursor-pointer"
            >
              <BsChevronLeft size={18} />
            </button>
            <div className="font-semibold flex gap-[8px] text-[18px] tracking-normal self-center">
              <span>{date?.toDateString()}</span>
            </div>
            <div className="h-[18px] w-[18px]"></div>
          </div>
          <BookAppointment profID={profID} />
        </>
      )}
    </AppointmentContext.Provider>
  );
}
