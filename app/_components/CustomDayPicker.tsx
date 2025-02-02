"use client";
import { formatDate } from "@/app/_lib/utilities";
import { DayButtonProps, DayPicker } from "react-day-picker";
import { useAppointmentContext } from "./AppointmentBox";

// Custom date picker
export default function CustomDayPicker({
  month,
  appointments,
}: {
  month: Date;
  appointments: string[];
}) {
  // Get date setter
  const { setDate } = useAppointmentContext();
  if (appointments.length === 0)
    return <div className="text-center">No appointments this month</div>;
  return (
    <DayPicker
      mode="single"
      hideNavigation
      startMonth={month}
      endMonth={month}
      classNames={{
        month_grid: `w-full *:w-full `,
        weekday: ` pb-[10px] text-sm font-medium`,
        day_button: `rounded-full py-1 w-full max-w-8 hover:bg-grey-700 tracking-normal disabled:hover:bg-transparent disabled:opacity-45`,
        day: `text-center py-[6px]  `,
        today: `*:!text-white *:!bg-primary-100 *:!opacity-100`,
      }}
      components={{
        CaptionLabel: () => <></>,
        DayButton: (props: DayButtonProps) => {
          return (
            <button
              {...props}
              onClick={() => {
                setDate(props.day.date);
              }}
              disabled={
                !appointments.includes(
                  formatDate(props.day.date, { day: "numeric", month: "long" })
                ) || new Date().getTime() > props.day.date.getTime()
              }
            />
          );
        },
      }}
    />
  );
}
