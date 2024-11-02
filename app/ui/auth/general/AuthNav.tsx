"use client";
import Logo from "@/app/_components/Logo";
import LogoAlt from "@/public/logo/logoAlt.svg";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export default function AuthNav() {
  const router = useRouter();
  return (
    <nav className="border-b-grey-200 border-b-1 px-[15px] lg:px-8 py-5 h-24 ">
      <div className="flex items-center justify-between lg:justify-end max-w-[1400px] mx-auto">
        <div className="lg:hidden">
          <Logo src={LogoAlt} />
        </div>
        <button
          onClick={() => router.back()}
          className="gap-x-2 border-primary-100 rounded-full xs:border-2 xs:px-6 xs:py-4 flex items-center justify-center xs:text-primary-100 font-semibold xs:hover:text-white xs:hover:bg-primary-100 text-grey-100"
        >
          <BsArrowLeft size={24} />
          <span className="hidden xs:inline-block">Back</span>
        </button>
      </div>
    </nav>
  );
}
