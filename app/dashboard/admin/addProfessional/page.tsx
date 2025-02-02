import AddProfessionalForm from "@/app/_components/AddProfessionalForm";
import AdminScreen from "@/app/_components/AdminScreen";
import { fetchProfessions } from "@/app/_lib/services";
export const metadata = {
  title: "Add Professional",
};
export default async function Page() {
  // Fetch professions
  const data = await fetchProfessions();
  const professions = data.responseData;
  return (
    <AdminScreen title="Add professional">
      <div className="bg-white border-grey-300 border-1 rounded-5 px-4 xs:px-6 py-6">
        {professions && <AddProfessionalForm data={professions} />}
      </div>
    </AdminScreen>
  );
}
