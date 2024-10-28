import Hero from "@/app/ui/home/Hero";
import MedicalConditions from "@/app/ui/home/MedicalConditions";
import Nav from "@/app/ui/home/Nav";
import Specialities from "@/app/ui/home/Specialties";
import ContactUs from "@/app/ui/home/ContactUs";
import Staff from "@/app/ui/home/Staff";
export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Specialities />
      <MedicalConditions />
      <ContactUs />
      <Staff />
    </>
  );
}
