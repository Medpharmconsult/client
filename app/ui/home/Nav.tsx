import Container from "@/app/_components/Container";
import LoggedInPlate from "@/app/ui/auth/general/LoggedInPlate";
import LoginPlate from "@/app/ui/auth/general/LoginPlate";
import Logo from "@/app/_components/Logo";
import { getSession } from "@/app/_lib/services";

export default async function Nav() {
  const session = await getSession();
  return (
    <nav className="max-h-[96px]">
      <Container classname="flex justify-between items-center relative py-[20px]">
        <Logo />
        {!session.isLoggedIn ? (
          <LoginPlate />
        ) : (
          <LoggedInPlate session={{ ...session }} />
        )}
      </Container>
    </nav>
  );
}
