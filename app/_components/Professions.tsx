import Image from "next/image";
import Heading from "./Heading";
import Container from "@/app/_components/Container";
import Section from "@/app/_components/Section";

const professionsData = [
  { name: "Doctors", image: "/service-doctor.jpg" },
  { name: "Pharmacists", image: "/service-pharmacist.jpg" },
  { name: "Psychologists", image: "/service-psychologist.jpg" },
  { name: "Therapists", image: "/service-therapist.jpg" },
];

export default function Professions() {
  return (
    <Section>
      <Container styles="text-center">
        <div>
          <div className="text-primary-100 ">
            <Heading type="h2">
              From <span className="text-secondary-100"> little </span>to
              <span className="text-secondary-100"> life-altering </span>
              issues,
            </Heading>
            <Heading type="h4">
              Get answers for anything and everything.
            </Heading>
          </div>
          <Section.Content>
            <ul className="flex-wrap flex items-center justify-center gap-x-[30px] gap-y-8 ">
              {professionsData.map((profession, index) => (
                <li key={index}>
                  <div className="h-32 w-32 lg:h-48 xs:w-40 xs:h-40 rounded-full lg:w-48 relative overflow-hidden">
                    <Image
                      src={profession.image}
                      fill
                      alt="specialty-image"
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <p className="font-bold text-primary-100 tracking-normal text-[18px]/[24px] mt-[18px]">
                    {profession.name}
                  </p>
                </li>
              ))}
            </ul>
          </Section.Content>
          <p className="mt-8 max-w-[618px] w-full mx-auto">
            With 80+ specialties covered, get medical advice and medical second
            opinion to any of your health concerns under one roof.
          </p>
        </div>
      </Container>
    </Section>
  );
}
