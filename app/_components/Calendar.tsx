import CustomDayPicker from "./CustomDayPicker";
import { fetchMonth, formatDate } from "@/app/_lib/utilities";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useAppointmentContext } from "./AppointmentBox";

export default function Calendar() {
  // Get values from context
  const { month, appointments } = useAppointmentContext();
  return (
    <div>
      <CalendarNav />
      <CustomDayPicker
        month={month}
        appointments={appointments}
        key={month.getMonth()}
      />
    </div>
  );
}

// Calendar nav
function CalendarNav() {
  const { month, changeMonth } = useAppointmentContext();
  // Check month
  const isCurrent = month.toDateString() === fetchMonth().toDateString();
  return (
    <div className="flex justify-between items-center border-grey-300 border-b-1 pb-3 mb-4">
      <button
        onClick={changeMonth}
        disabled={isCurrent}
        className="cursor-pointer"
      >
        <BsChevronLeft
          size={18}
          className={`${isCurrent ? "opacity-35 cursor-default" : ""}`}
        />
      </button>
      <span className="font-semibold text-[18px] tracking-normal">
        {formatDate(month, {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button
        onClick={changeMonth}
        disabled={!isCurrent}
        className="cursor-pointer"
      >
        <BsChevronRight
          size={18}
          className={`${!isCurrent ? "opacity-35 cursor-default" : ""}`}
        />
      </button>
    </div>
  );
}
