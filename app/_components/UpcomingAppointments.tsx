import Image from "next/image";
import { bookedAppointmentType } from "../_lib/types";
import { timeMap } from "../_lib/utilities";

export default function UpcomingAppointments({
  data,
}: {
  data: bookedAppointmentType[];
}) {
  return (
    <div>
      {data.length === 0 ? (
        <div className="flex items-center text-center justify-center gap-y-2 flex-col">
          <Image
            src="/no-appointment.svg"
            alt="no-appointment-icon"
            width={64}
            height={64}
            className="mt-1"
          />
          <h3 className="text-primary-100 text-[18px]/[24px] font-bold tracking-normal mt-1">
            No appointments
          </h3>
          <p>New appointments will show up here.</p>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-grey-700 *:p-4 *:whitespace-nowrap *:text-left">
                  <th>Patient name</th>
                  <th>Date</th>
                  <th>Start time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((app, index) => (
                  <tr
                    key={index}
                    className="border-grey-300 border-b-1 last:border-b-0 *:border-grey-300 *:p-4 *:whitespace-nowrap"
                  >
                    <td>
                      {`${app.patientData.lastName} ${app.patientData.firstName}`}
                    </td>
                    <td>{`${app.month} ${app.day} ${app.year}`}</td>
                    <td>{timeMap[app.startTime]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
