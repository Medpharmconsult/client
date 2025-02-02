import Spinner from "@/app/_components/Spinner";
import toast from "react-hot-toast";
import { bookAppointment } from "@/app/_lib/actions";
import {
  appointmentTimeType,
  fetchAppointmentTimesResType,
} from "@/app/_lib/types";
import { formatDate, timeMap } from "@/app/_lib/utilities";
import { useEffect, useState } from "react";
import { useAppointmentContext } from "./AppointmentBox";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function BookAppointment() {
  // Get values from context
  const { date, setDate, id } = useAppointmentContext();
  // Appointment times state
  const [appointmentTimes, setAppointmentTimes] =
    useState<appointmentTimeType[]>();
  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  // Handle appointment booking
  const handleBooking = async (id: string) => {
    // Set loading state
    setLoading(true);
    // Send request
    const response = await bookAppointment(id).finally(() => setLoading(false));
    if (response?.statusCode === 200) {
      // Set date
      setDate(undefined);
      // Display success message
      toast.success("Appointment booked successfully");
    } else {
      // Display error message
      toast.error("Something went wrong");
    }
  };
  // Fetch appointment times
  useEffect(() => {
    async function fetcher() {
      if (date) {
        const day = formatDate(date, { day: "numeric" }).toString();
        const month = formatDate(date, { month: "long" });
        const year = date.getFullYear().toString();
        await fetch(
          `${process.env.NEXT_PUBLIC_Host_Name}/get-schedule-time?professional=${id}&month=${month}&year=${year}&day=${day}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response: Response) => response.json())
          .then((data: fetchAppointmentTimesResType) => {
            if (data.statusCode === 200)
              setAppointmentTimes(data.responseData.appointmentTimes);
          })
          .catch((err: Error) => {
            throw new Error(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    fetcher();
  }, []);
  return (
    <div>
      <div>
        <Nav />
        {loading ? (
          <div>
            <Spinner fill="#1341A3" />
          </div>
        ) : (
          <div>
            {appointmentTimes && (
              <div>
                {appointmentTimes.length === 0 ? (
                  <div className="text-center">No available slots</div>
                ) : (
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {appointmentTimes.map((time, index) => (
                      <button
                        disabled={loading}
                        key={index}
                        onClick={() => handleBooking(time._id)}
                        className="text-xs font-semibold tracking-[0.4px] text-grey-100 border-1  bg-grey-700 hover:bg-primary-100 hover:text-white rounded-full px-4  py-2 hover:border-primary-100"
                      >{`${timeMap[time.startTime]} - ${
                        timeMap[time.endTime]
                      }`}</button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Nav() {
  // Get values from context
  const { date, setDate } = useAppointmentContext();
  return (
    <div className="flex justify-between items-center border-grey-300 border-b-1 pb-3 mb-4">
      <button
        onClick={() => {
          setDate(undefined);
        }}
        className="cursor-pointer"
      >
        <BsChevronLeft size={18} />
      </button>
      <div className="font-semibold  text-[18px] text-center tracking-normal flex-1">
        <span>{date?.toDateString()}</span>
      </div>
      <button disabled>
        <BsChevronRight size={18} className="opacity-35" />
      </button>
    </div>
  );
}
