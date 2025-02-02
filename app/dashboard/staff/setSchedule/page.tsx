import AdminScreen from "@/app/_components/AdminScreen";
import SetScheduleUi from "@/app/_components/SetScheduleUi";
export const metadata = {
  title: "Set Schedule",
};
export default function Page() {
  return (
    <AdminScreen title="Set schedule">
      <SetScheduleUi />
    </AdminScreen>
  );
}
