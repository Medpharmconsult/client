import AdminScreen from "@/app/_components/AdminScreen";
import ProfessionalsList from "@/app/_components/ProfessionalsList";
import { fetchProfession, fetchProfessionals } from "@/app/_lib/services";

export const metadata = {
  title: "Professionals",
};

export default async function Page({
  params,
}: {
  params: { professionals: string };
}) {
  // Fetch professionals
  const professionals = await fetchProfessionals(params.professionals);
  const data = professionals.responseData.professionals;
  // Fetch profession
  const profession = await fetchProfession(params.professionals);
  return (
    <AdminScreen
      title="Professionals"
      subtitle={`${profession?.name ? profession.name : ""}`}
    >
      {professionals.statusCode === 200 && data && (
        <ProfessionalsList data={data} code={params.professionals} />
      )}
    </AdminScreen>
  );
}
