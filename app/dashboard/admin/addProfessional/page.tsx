import AddProfessionalForm from "@/app/ui/dashboard/admin/addProfessional/AddProfessionalForm";
import DashboardScreen from "@/app/ui/dashboard/general/DashboardScreen";
import { getProfessions } from "@/app/_lib/services";
export const metadata = {
  title: "Add Professional",
};
export default async function AddProfessional() {
  const res = await getProfessions();
  const professions = res?.responseData;
  return (
    <DashboardScreen title="Add professional">
      <div className="bg-white border-grey-300 border-1 rounded-5 px-4 py-6">
        <AddProfessionalForm professions={professions} />
      </div>
    </DashboardScreen>
  );
}
