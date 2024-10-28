import Container from "@/app/_components/Container";
import AuthNav from "@/app/ui/auth/general/AuthNav";
import AuthSide from "@/app/ui/auth/general/AuthSide";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AuthSide />
      <div className="min-h-[100dvh] flex-1 lg:ml-[46%]">
        <div>
          <AuthNav />
          <Container>
            <div className="py-[48px] sm:py-[64px] max-w-[450px] mx-auto">
              {children}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
