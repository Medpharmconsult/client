import { getBookedAppointments } from "@/app/_lib/services";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import ViewAppointmentsUi from "@/app/ui/dashboard/staff/viewAppointments/ViewAppointmentsUi";

export default async function ViewAppointments() {
  const res = await getBookedAppointments();
  const bookedAppointments = res?.responseData.bookedAppintments;
  return (
    <DashboardScreen title="View appointments">
      <ViewAppointmentsUi appointments={bookedAppointments} />
    </DashboardScreen>
  );
}
