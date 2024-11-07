import AddProfessionForm from "@/app/ui/dashboard/admin/addProfession/AddProfessionForm";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
export const metadata = {
  title: "Add Profession",
};
export default function addProfession() {
  return (
    <DashboardScreen title="Add profession">
      <div className="bg-white border-grey-300 border-1 rounded-5 px-4 py-6">
        <AddProfessionForm />
      </div>
    </DashboardScreen>
  );
}
