import Card from "@/app/_components/Card";
import Row from "@/app/_components/Row";
import { getUpcomingBookedAppointments } from "@/app/_lib/services";
import { timeMap } from "@/app/_lib/utilities";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import RecentChats from "@/app/ui/dashboard/general/RecentChats";

export default async function Page() {
  const upcomingAppointments = await getUpcomingBookedAppointments();

  return (
    <DashboardScreen title="Dashboard">
      <Row>
        <Row.Column breakPoints="lg:w-[50%]">
          <Card title="Upcoming appointments" spacing={false}>
            <div className="p-4">
              <div className="overflow-x-auto grid grid-cols-[repeat(1,minmax(0,1fr))] whitespace-normal ">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#f6f7f9]  *:px-[16px] *:h-[60px] *:text-left">
                      <th>Patient name</th>
                      <th>Date</th>
                      <th>Start time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAppointments?.map((app, index) => (
                      <tr
                        key={index}
                        className="border-grey-300 border-b-[1px] last:border-b-0 *:border-grey-300 *:px-[16px] h-[60px]"
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
