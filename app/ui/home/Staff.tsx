import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import Section from "@/app/_components/Section";
import Heading from "@/app/_components/Heading";

export default function Staff() {
  return (
    <Section>
      <div className="bg-primary-100 text-white">
        <Container classname="lg:py-[96px] xs:py-[64px] py-[48px] flex flex-col justify-between gap-x-[30px] gap-y-[32px] lg:flex-row flex-wrap">
          <div className="flex-1 flex flex-col">
            <Heading type="h3">Are you a doctor?</Heading>
            <p className="py-[16px] xs:py-[24px]">
              Join our medical panel of 4500+ doctors and be a part{" "}
              <br className="hidden xs:inline-block" />
              of the already big thing in healthcare.
            </p>
            <Button colour="outline-white" classname="self-start">
              Sign up for free
            </Button>
          </div>
          <div className="flex-1">
            <Heading type="h3">Why Medpharm consult?</Heading>
            <ul className="xs:pt-[24px] pt-[16px] flex flex-col gap-y-[16px] list-inside list-disc ">
              <li>Meet and treat patients from 196+ countries</li>
              <li>Monetize your free time by answering patient queries</li>
              <li>Build your online brand presence</li>
              <li>Publish medical articles for 1M+ Medpharm users</li>
            </ul>
          </div>
        </Container>
      </div>
    </Section>
  );
}
