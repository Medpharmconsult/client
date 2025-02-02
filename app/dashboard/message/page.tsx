import AdminScreen from "@/app/_components/AdminScreen";
import MessagesUi from "@/app/_components/MessagesUi";
import { fetchMessages, fetchSession } from "@/app/_lib/services";
export const metadata = {
  title: "Message",
};
export default async function Page() {
  // Fetch messages
  const data = await fetchMessages();
  const messages = data?.responseData.messages;
  // Fetch session
  const session = await fetchSession();
  // Get token
  const token = session.token;
  // Get contact info
  const contact = session.contact;

  return (
    <AdminScreen styles="!pb-16">
      {messages && token && contact && (
        <MessagesUi token={token} data={messages} contact={contact} />
      )}
    </AdminScreen>
  );
}
