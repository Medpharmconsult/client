import Container from "@/app/_components/Container";
import AuthNav from "@/app/_components/AuthNav";
import LogoWhite from "@/public/logo/logoWhite.svg";
import Logo from "../_components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="bg-primary-100 w-[46%] fixed flex-col  top-0 left-0 h-dvh lg:flex mh-lg:pt-60 mh-lg:justify-start items-center gap-y-6 text-white text-center px-[15px] hidden  pt-0 justify-center ">
        <Logo src={LogoWhite} isLink={false} />
        <p className="w-full max-w-[380px] mx-auto">
          Get 24/7 online consultations with the best doctors without breaking a
          sweat and your bank.
        </p>
      </div>
      <div className="min-h-dvh flex-1 lg:ml-[46%]">
        <div>
          <AuthNav />
          <Container>
            <div className="py-12 sm:py-16 max-w-[450px] mx-auto">
              {children}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
