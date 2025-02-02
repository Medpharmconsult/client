"use client";
import AdminMenu from "./AdminMenu";
import AdminNav from "./AdminNav";
import LoggedInMenu from "./LoggedInMenu";
import { useAdminContext } from "@/context/AdminContext";
import { userType } from "../_lib/types";

export default function AdminContent({
  user,
  children,
}: {
  user: userType;
  children: React.ReactNode;
}) {
  // Get nav state
  const { nav } = useAdminContext();
  return (
    <div className="w-full">
      {user && (
        <div className="w-full">
          <AdminMenu role={user.role} />
          <div
            className={`relative flex flex-col flex-1 ${
              nav ? "md:ml-[237px]" : "md:ml-[79px]"
            }`}
          >
            <AdminNav>
              <LoggedInMenu user={user} />
            </AdminNav>
            <div className="md:px-[17px]">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}
