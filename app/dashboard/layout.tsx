import DashboardContent from "../ui/dashboard/general/DashboardContent";
import { getSession } from "../_lib/services";
import { DashboardContextProvider } from "@/context/DashboardContext";

export const metadata = {
  title: {
    template: "Dashboard - %s",
    default: "Dashboard",
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-dvh bg-grey-200">
      <DashboardContextProvider>
        <DashboardContent session={{ ...session }}>{children}</DashboardContent>
      </DashboardContextProvider>
    </div>
  );
}
