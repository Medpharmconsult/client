"use client";
import Container from "@/app/_components/Container";
import { useAdminContext } from "@/context/AdminContext";
import { BsList } from "react-icons/bs";

export default function AdminNav({ children }: { children: React.ReactNode }) {
  const { nav, toggleNav, toggleMobileNav } = useAdminContext();
  return (
    <nav
      className={`bg-white w-full fixed left-0 top-0 border-b-1 md:px-[17px] flex items-center border-grey-300 z-20 ${
        nav
          ? "md:left-[237px] md:w-[calc(100%-237px)]"
          : "md:left-[79px] md:w-[calc(100%-79px)]"
      }  `}
    >
      <Container
        styles={
          "flex items-center justify-between flex-1 relative h-full py-4 !max-w-full"
        }
      >
        <button onClick={toggleNav} className="hidden md:inline-block">
          <BsList size={24} className="text-grey-100" />
        </button>
        <button onClick={toggleMobileNav} className="md:hidden">
          <BsList size={24} className="text-grey-100" />
        </button>
        {children}
      </Container>
    </nav>
  );
}
