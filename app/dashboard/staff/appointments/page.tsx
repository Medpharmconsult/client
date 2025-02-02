import AdminScreen from "@/app/_components/AdminScreen";
import AppointmentsUi from "@/app/_components/AppointmentsUi";
import { fetchBookedAppointments } from "@/app/_lib/services";
export const metadata = {
  title: "Appointments",
};

export default async function Page() {
  // Fetch booked appointments
  const data = await fetchBookedAppointments();
  // Sort appointments
  const appointments = data?.responseData.bookedAppintments
    .map((app) => app)
    ?.sort(
      (a, b): number =>
        new Date(`${b.month} ${b.day} ${b.year}`).getTime() -
        new Date(`${a.month} ${a.day} ${a.year}`).getTime()
    );

  return (
    <AdminScreen title="Appointments">
      {data?.statusCode === 200 && appointments && (
        <AppointmentsUi appointments={appointments} />
      )}
    </AdminScreen>
  );
}
