"use client";
import Logo from "@/app/_components/Logo";
import LogoAlt from "@/public/logo/logoAlt.svg";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export default function AuthNav() {
  const router = useRouter();
  return (
    <nav className="  border-b-grey-200 border-b-[1px] px-[15px] lg:px-[32px] py-[20px] h-[96px] ">
      <div className="flex items-center justify-between lg:justify-end max-w-[1400px] mx-auto">
        <div className="lg:hidden">
          <Logo src={LogoAlt} />
        </div>
        <button
          onClick={() => router.back()}
          className="gap-x-[8px] border-primary-100 rounded-full xs:border-[2px] xs:px-[24px] xs:py-[16px] flex items-center justify-center xs:text-primary-100 font-semibold xs:hover:text-white xs:hover:bg-primary-100 text-grey-100"
        >
          <BsArrowLeft size={24} className="" />
          <span className="hidden xs:inline-block">Back</span>
        </button>
      </div>
    </nav>
  );
}
