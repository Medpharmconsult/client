import Image from "next/image";
import Heading from "../../_components/Heading";
import Container from "@/app/_components/Container";
import Section from "@/app/_components/Section";

const specialtiesData = [
  { name: "Doctors", image: "/service-doctor.jpg" },
  { name: "Pharmacists", image: "/service-pharmacist.jpg" },
  { name: "Psychologists", image: "/service-psychologist.jpg" },
  { name: "Therapists", image: "/service-therapist.jpg" },
];

export default function Specialities() {
  return (
    <Section>
      <Container classname="text-center">
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
            <ul className="flex-wrap flex items-center justify-center gap-x-[30px] gap-y-[32px] ">
              {specialtiesData.map((specialty, index) => (
                <li key={index}>
                  <div className="h-[128px] w-[128px] xs:h-[192px] rounded-full xs:w-[192px] relative overflow-hidden">
                    <Image
                      src={specialty.image}
                      fill
                      alt="specialty-image"
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <p className="font-bold text-primary-100 tracking-normal text-[18px]/[24px] mt-[18px]">
                    {specialty.name}
                  </p>
                </li>
              ))}
            </ul>
          </Section.Content>
          <p className="mt-[32px] max-w-[618px] w-full mx-auto">
            With 80+ specialties covered, get medical advice and medical second
            opinion to any of your health concerns under one roof.
          </p>
        </div>
      </Container>
    </Section>
  );
}
