import AdminScreen from "@/app/_components/AdminScreen";
import Card from "@/app/_components/Card";
import RecentContacts from "@/app/_components/RecentContacts";
import Row from "@/app/_components/Row";
import UpcomingAppointments from "@/app/_components/UpcomingAppointments";
import { fetchContacts, fetchUpcomingAppointments } from "@/app/_lib/services";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // Fetch upcoming appointments
  const appointments = await fetchUpcomingAppointments();
  // Fetch recent contacts
  const contacts = await fetchContacts(5);

  return (
    <AdminScreen title="Dashboard">
      <Row>
        <Row.Column styles="clg:w-1/2">
          <Card title="Upcoming appointments">
            {appointments && <UpcomingAppointments data={appointments} />}
          </Card>
        </Row.Column>
        <Row.Column styles="clg:w-1/2">
          {contacts.statusCode === 200 && contacts.responseData.contacts && (
            <Card title="Recent contacts" styles="!h-auto">
              <RecentContacts data={contacts.responseData.contacts} />
            </Card>
          )}
        </Row.Column>
      </Row>
    </AdminScreen>
  );
}
