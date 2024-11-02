import MessagesUi from "@/app/ui/dashboard/message/MessagesUi";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import { getMessages, getSession } from "@/app/_lib/services";
export const metadata = {
  title: "Message",
};
export default async function Messages() {
  const session = await getSession();
  const res = await getMessages();
  const messages = res?.responseData.messages;
  return (
    <DashboardScreen hasSpaceBelow={false}>
      <MessagesUi session={{ ...session }} messageData={messages} />
    </DashboardScreen>
  );
}
