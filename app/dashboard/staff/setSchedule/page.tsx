import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import SetScheduleUi from "@/app/ui/dashboard/staff/setSchedule/SetScheduleUi";
export const metadata = {
  title: "Set Schedule",
};
export default function SetSchedule() {
  return (
    <DashboardScreen title="Set schedule">
      <SetScheduleUi />
    </DashboardScreen>
  );
}
