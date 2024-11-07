"use client";
import DashboardMenu from "./DashboardMenu";
import DashboardNav from "./DashboardNav";
import { useDashboardContext } from "@/context/DashboardContext";
import { SessionData } from "@/app/_lib/session";

export default function DashboardContent({
  session,
  children,
}: {
  session: SessionData;
  children: React.ReactNode;
}) {
  const { nav } = useDashboardContext();
  return (
    <>
      <DashboardMenu userRole={session.role} />
      <div
        className={`relative flex flex-col flex-1 ${
          nav ? "md:ml-[237px]" : "md:ml-[79px]"
        }`}
      >
        <DashboardNav session={session} />
        <div className="md:px-[17px]">{children}</div>
      </div>
    </>
  );
}
