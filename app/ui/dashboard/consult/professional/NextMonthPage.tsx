"use client";
import CustomDayPicker from "./CustomDayPicker";
import { getNextMonth } from "@/app/_lib/utilities";
import { useAppointmentContext } from "./AppointmentCalendar";

export default function NextMonthPage() {
  const { nextAppointments } = useAppointmentContext();
  const nextMonth = getNextMonth();

  return <CustomDayPicker month={nextMonth} appointments={nextAppointments} />;
}
