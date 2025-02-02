"use client";
import BookAppointment from "./BookAppointment";
import Calendar from "./Calendar";
import { appointmentContextType } from "@/app/_lib/types";
import { fetchMonth } from "@/app/_lib/utilities";
import { createContext, useContext, useState } from "react";

// Create appointment context
const AppointmentContext = createContext<appointmentContextType | undefined>(
  undefined
);

// Use appointment context
export const useAppointmentContext = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined)
    throw new Error("Appointment context was used outside provider");
  return context;
};

export default function AppointmentBox({
  id,
  data,
}: {
  id: string;
  data: { current: string[]; next: string[] };
}) {
  // Current month
  const currentMonth = fetchMonth();
  // Next month
  const nextMonth = fetchMonth(1);
  // Month state
  const [month, setMonth] = useState<Date>(currentMonth);
  // Appointments state
  const [appointments, setAppointments] = useState<string[]>(data.current);
  // Date state
  const [date, setDate] = useState<Date | undefined>(undefined);
  // Change month
  const changeMonth = () => {
    // Set month and appointments
    if (month.toDateString() === fetchMonth().toDateString()) {
      setMonth(nextMonth);
      setAppointments(data.next);
    } else {
      setMonth(currentMonth);
      setAppointments(data.current);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        setDate,
        id,
        date,
        month,
        changeMonth,
        appointments,
      }}
    >
      {date ? <BookAppointment /> : <Calendar />}
    </AppointmentContext.Provider>
  );
}
