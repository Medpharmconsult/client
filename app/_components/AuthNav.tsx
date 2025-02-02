"use client";
import Logo from "@/app/_components/Logo";
import LogoAlt from "@/public/logo/logoAlt.svg";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export default function AuthNav() {
  // Get router
  const router = useRouter();
  return (
    <nav className="border-b-grey-200 border-b-1 px-[15px] lg:px-8 py-5 h-[88px] ">
      <div className="flex items-center justify-between lg:justify-end max-w-[1400px] mx-auto">
        <div className="lg:hidden">
          <Logo src={LogoAlt} />
        </div>
        <button
          onClick={() => router.back()}
          className="gap-x-3 rounded-full h-12 xs:hover:bg-grey-700 xs:px-6 xs:py-3 flex items-center justify-center font-semibold"
        >
          <BsArrowLeft size={24} />
          <span className="hidden xs:inline-block">Back</span>
        </button>
      </div>
    </nav>
  );
}
