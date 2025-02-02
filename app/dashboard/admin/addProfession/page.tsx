import AddProfessionForm from "@/app/_components/AddProfessionForm";
import AdminScreen from "@/app/_components/AdminScreen";
export const metadata = {
  title: "Add Profession",
};
export default function Page() {
  return (
    <AdminScreen title="Add profession">
      <div className="bg-white border-grey-300 border-1 rounded-5 px-4 xs:px-6 py-6">
        <AddProfessionForm />
      </div>
    </AdminScreen>
  );
}
