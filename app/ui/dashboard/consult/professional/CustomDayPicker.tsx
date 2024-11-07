import { formatDate } from "@/app/_lib/utilities";
import { DayButtonProps, DayPicker } from "react-day-picker";
import { useAppointmentContext } from "./AppointmentCalendar";

export default function CustomDayPicker({
  month,
  appointments,
}: {
  month: Date;
  appointments: string[];
}) {
  const { setDate, setIsCalendar } = useAppointmentContext();
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
        weekday: `text-grey-100 pb-[10px] text-sm`,
        day_button: `rounded-full py-1 w-full max-w-8 hover:bg-grey-700 disabled:hover:bg-transparent disabled:opacity-35`,
        day: `text-center py-[6px]  `,
        today: ` *:text-primary-100 font-medium`,
      }}
      components={{
        CaptionLabel: () => <></>,
        DayButton: (props: DayButtonProps) => {
          return (
            <button
              {...props}
              onClick={() => {
                setDate(props.day.date);
                setIsCalendar(false);
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
