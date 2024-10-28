import ContactsUi from "@/app/ui/dashboard/contacts/ContactsUi";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import { getContactsList, getToken } from "@/app/_lib/services";

export default async function Contacts() {
  const token = await getToken();
  const res = await getContactsList();
  const contactsList = res?.responseData.contacts;

  return (
    <DashboardScreen title="Contacts">
      <ContactsUi token={token} contacts={contactsList} />
    </DashboardScreen>
  );
}
