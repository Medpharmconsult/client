import AdminContent from "../_components/AdminContent";
import AdminContextProvider from "@/context/AdminContext";
import { fetchSession } from "../_lib/services";

export const metadata = {
  title: {
    template: "%s - Medpharm Consult",
    default: "Medpharm Consult",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  // Fetch session
  const session = await fetchSession();
  return (
    <div className="flex min-h-dvh bg-grey-200">
      <AdminContextProvider>
        {session.isLoggedIn && session.user && (
          <AdminContent user={session.user}>{children}</AdminContent>
        )}
      </AdminContextProvider>
    </div>
  );
}
