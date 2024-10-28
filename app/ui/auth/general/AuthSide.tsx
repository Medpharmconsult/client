import Logo from "@/app/_components/Logo";
import LogoWhite from "@/public/logo/logoWhite.svg";

export default function AuthSide() {
  return (
    <div className="bg-primary-100 w-[46%] fixed flex-col  top-0 left-0 h-dvh lg:flex mh-lg:pt-[240px] mh-lg:justify-start items-center gap-y-[24px] text-white text-center px-[15px] hidden  pt-0 justify-center ">
      <Logo src={LogoWhite} />
      <p className="w-full max-w-[380px] mx-auto">
        Get 24/7 online consultations with the best doctors without breaking a
        sweat and your bank.
      </p>
    </div>
  );
}
