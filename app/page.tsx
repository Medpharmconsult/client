import Conditions from "@/app/_components/Conditions";
import Hero from "@/app/_components/Hero";
import HomeNav from "@/app/_components/HomeNav";
import Professions from "@/app/_components/Professions";
import Contact from "@/app/_components/Contact";
import JoinMedpharm from "@/app/_components/JoinMedpharm";

export const metadata = {
  title: "Home - Medpharm Consult",
};

export default function Page() {
  return (
    <main>
      <HomeNav />
      <Hero />
      <Professions />
      <Conditions />
      <Contact />
      <JoinMedpharm />
    </main>
  );
}
