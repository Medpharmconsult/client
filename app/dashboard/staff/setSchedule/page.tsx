import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import SetScheduleUi from "@/app/ui/dashboard/staff/setSchedule/setScheduleUi";

export default function SetSchedule() {
  return (
    <DashboardScreen title="Set schedule">
      <SetScheduleUi />
    </DashboardScreen>
  );
}
