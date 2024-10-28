import { useEffect, useState, useTransition } from "react";
import { useAppointmentContext } from "./AppointmentCalendar";
import { apiFetcher, formatDate, timeMap } from "@/app/_lib/utilities";
import { GetAppointmentTimesResponse } from "@/app/_lib/services";
import { bookAppointment } from "@/app/_lib/actions";
import toast from "react-hot-toast";
import SpinnerMini from "@/app/_components/SpinnerMini";

export default function BookAppointment({ profID }: { profID: string }) {
  const { date, setDate, setIsCalendar } = useAppointmentContext();
  const [appointmentTimes, setAppointmentTimes] = useState<
    {
      _id: string;
      startTime: number;
      endTime: number;
      startMeridian: string;
      endMeridian: string;
    }[]
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const handleBooking = (bookingId: string) => {
    startTransition(async () => {
      const res = await bookAppointment(bookingId);
      if (res) {
        setDate(undefined);
        setIsCalendar(true);
        toast.success("Appointment booked successfully");
      } else {
        toast.error("Something went wrong");
      }
    });
  };
  useEffect(() => {
    async function fetcher() {
      const day = formatDate(date, { day: "numeric" }).toString();
      const month = formatDate(date, { month: "long" });
      const year = date.getFullYear().toString();
      const res = (await apiFetcher(
        `${process.env.NEXT_PUBLIC_Host_Name}/get-schedule-time?professional=${profID}&month=${month}&year=${year}&day=${day}`,
        { method: "GET" }
      ).finally(() => {
        setIsLoading(false);
      })) as GetAppointmentTimesResponse;
      if (res.statusCode === 200)
        setAppointmentTimes(res.responseData.appointmentTimes);
    }
    fetcher();
  }, []);
  if (isLoading)
    return (
      <div>
        <SpinnerMini fill="#1341A3" />
      </div>
    );
  return (
    <div>
      <div>
        {appointmentTimes?.length === 0 ? (
          <div className="text-center">No available slots</div>
        ) : (
          <>
            {isPending ? (
              <div>
                <SpinnerMini fill="#1341A3" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-[8px] items-center justify-center">
                {appointmentTimes?.map((time, index) => (
                  <button
                    disabled={isPending}
                    key={index}
                    onClick={() => handleBooking(time._id)}
                    className="text-[12px]/[16px] font-semibold tracking-[0.4px] text-grey-100 border-[1px]  bg-[#f6f7f9] hover:bg-primary-100 hover:text-white rounded-full px-[16px]  py-[8px]"
                  >{`${timeMap[time.startTime]} - ${
                    timeMap[time.endTime]
                  }`}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
