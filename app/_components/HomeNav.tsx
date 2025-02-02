import Container from "@/app/_components/Container";
import LoggedInMenu from "@/app/_components/LoggedInMenu";
import LoginMenu from "@/app/_components/LoginMenu";
import Logo from "@/app/_components/Logo";
import { fetchSession } from "../_lib/services";

export default async function HomeNav() {
  // Get user session
  const session = await fetchSession();
  // Get current user
  const user = session?.user;
  return (
    <nav className="h-[88px]">
      <Container styles="flex justify-between items-center relative h-full">
        <Logo />

        {session.isLoggedIn && user ? (
          <LoggedInMenu user={user} />
        ) : (
          <LoginMenu />
        )}
      </Container>
    </nav>
  );
}
