"use client";
import { getCurrentMonth } from "@/app/_lib/utilities";
import { useAppointmentContext } from "./AppointmentCalendar";
import CustomDayPicker from "./CustomDayPicker";

export default function CurrentMonthPage() {
  const { currentAppointments } = useAppointmentContext();
  const currentMonth = getCurrentMonth();
  return (
    <CustomDayPicker month={currentMonth} appointments={currentAppointments} />
  );
}
