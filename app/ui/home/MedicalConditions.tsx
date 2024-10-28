import Container from "@/app/_components/Container";
import Section from "@/app/_components/Section";
import Heading from "../../_components/Heading";

const conditionsData = [
  "Anxiety",
  "Depression",
  "Pregnancy",
  "Delayed period",
  "Headache",
  "Acne",
  "Chest pain",
  "Erectile dysfunction",
  "Unprotected sex",
  "Backpain",
  "Diabetes",
  "Stress",
  "Fever",
  "HIV",
  "Fungal infection",
  "Constipation",
  "Cancer",
  "Diarrhea",
  "Premature ejaculation",
  "Sore throat",
  "Malaria",
];

export default function MedicalConditions() {
  return (
    <Section>
      <Container classname="text-center">
        <div>
          <Heading type="h2">Most searched medical conditions</Heading>
          <Section.Content>
            <ul className="flex flex-wrap gap-[15px] justify-center items-center font-semibold text-primary-100">
              {conditionsData.map((condition, index) => (
                <li
                  className="rounded-[5px] bg-secondary-100  py-[8px] px-[16px]"
                  key={index}
                >
                  {condition}
                </li>
              ))}
            </ul>
          </Section.Content>
        </div>
      </Container>
    </Section>
  );
}
