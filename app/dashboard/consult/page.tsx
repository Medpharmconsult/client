import AdminScreen from "@/app/_components/AdminScreen";
import Card from "@/app/_components/Card";
import ProfessionsTable from "@/app/_components/ProfessionsTable";
import RecentContacts from "@/app/_components/RecentContacts";
import Row from "@/app/_components/Row";
import { fetchContacts, fetchProfessions } from "@/app/_lib/services";

export const metadata = {
  title: "Dashboard",
};

export default async function Page() {
  // Fetch professions
  const professions = await fetchProfessions();
  // Fetch recent contacts
  const contacts = await fetchContacts(4);

  return (
    <AdminScreen title="Dashboard">
      <Row>
        <Row.Column styles="clg:w-1/2">
          {professions.statusCode === 200 && professions.responseData && (
            <Card title="Consult professionals">
              <ProfessionsTable data={professions.responseData} />
            </Card>
          )}
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
