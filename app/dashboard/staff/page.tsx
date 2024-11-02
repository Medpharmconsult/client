import Card from "@/app/_components/Card";
import Row from "@/app/_components/Row";
import RecentChats from "@/app/ui/dashboard/general/RecentChats";
import Image from "next/image";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import { getUpcomingBookedAppointments } from "@/app/_lib/services";
import { timeMap } from "@/app/_lib/utilities";

export default async function Page() {
  const upcomingAppointments = await getUpcomingBookedAppointments();

  return (
    <DashboardScreen title="Dashboard">
      <Row>
        <Row.Column breakPoints="lg:w-6/12">
          <Card title="Upcoming appointments" spacing={false}>
            {upcomingAppointments?.length === 0 ? (
              <div className="px-4 py-8 flex items-center text-center justify-center gap-y-2 flex-col">
                <Image
                  src="/no-appointment.svg"
                  alt="no-appointment-icon"
                  sizes="64px"
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
              <div className="p-4">
                <div className="overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))]">
                  <table className="w-full ">
                    <thead>
                      <tr className="bg-grey-700 *:px-4 *:py-[18px] *:whitespace-nowrap *:text-left">
                        <th>Patient name</th>
                        <th>Date</th>
                        <th>Start time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments?.map((app, index) => (
                        <tr
                          key={index}
                          className="border-grey-300 border-b-1 last:border-b-0 *:border-grey-300 *:px-4 *:py-[18px] *:whitespace-nowrap"
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
          </Card>
        </Row.Column>
        <Row.Column breakPoints="lg:w-[50%]">
          <Card title="Recent chats" spacing={false}>
            <RecentChats />
          </Card>
        </Row.Column>
      </Row>
    </DashboardScreen>
  );
}
