import AdminScreen from "@/app/_components/AdminScreen";
import ContactList from "@/app/_components/ContactList";
import { fetchContacts, fetchToken } from "@/app/_lib/services";
export const metadata = {
  title: "Contacts",
};
export default async function Page() {
  // Fetch token
  const token = await fetchToken();
  // Fetch contacts
  const contacts = await fetchContacts();
  const data = contacts.responseData.contacts;

  return (
    <AdminScreen title="Contacts">
      {contacts.statusCode === 200 && data && token && (
        <ContactList token={token} contacts={contacts.responseData.contacts} />
      )}
    </AdminScreen>
  );
}
