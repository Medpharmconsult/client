"use client";
import LoggedInPlate from "../../auth/general/LoggedInPlate";
import { BsList } from "react-icons/bs";
import { SessionData } from "@/app/_lib/session";
import { useDashboardContext } from "@/context/DashboardContext";
import Container from "@/app/_components/Container";

export default function DashboardNav({ session }: { session: SessionData }) {
  const { nav, toggleNav, toggleMobileNav } = useDashboardContext();
  return (
    <nav
      className={`bg-white min-h-[80px] w-full fixed left-0 top-0 border-b-[1px] md:px-[17px]   flex items-center border-grey-300 z-20 ${
        nav
          ? "md:left-[237px] md:w-[calc(100%-237px)]"
          : "md:left-[79px] md:w-[calc(100%-79px)]"
      }  `}
    >
      <Container classname="flex items-center justify-between flex-1 relative py-[12px]">
        <button onClick={toggleNav} className="hidden md:inline-block">
          <BsList size={24} className="text-grey-100" />
        </button>
        <button onClick={toggleMobileNav} className="md:hidden">
          <BsList size={24} className="text-grey-100" />
        </button>
        <LoggedInPlate session={session} />
      </Container>
    </nav>
  );
}
