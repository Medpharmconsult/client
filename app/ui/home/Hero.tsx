"use client";
import Container from "@/app/_components/Container";
import Heading from "../../_components/Heading";
import Button from "@/app/_components/Button";

export default function Hero() {
  const handleScroll = () => {
    document.getElementById("contact")?.scrollIntoView();
  };
  return (
    <section className="lg:h-[calc(100vh-96px)] h-[650px] bg-hero-mobile bg-bottom lg:bg-hero-desktop lg:bg-center bg-cover mh-lg:h-[650px] bg-grey-200">
      <Container classname="h-full flex items-start lg:items-center justify-center lg:justify-start">
        <div className=" lg:max-w-[570px] max-w-[500px] w-full mt-12 xs:mt-16 lg:mt-0 text-center lg:text-left">
          <Heading type="h1" classname="text-primary-100">
            Consult top medical professionals effortlessly
          </Heading>
          <p className=" text-[18px]/[24px] lg:text-[22px]/[28px] tracking-normal mt-[18px] mb-6 lg:mt-6 lg:mb-[32px] hidden xs:block">
            Get 24/7 online consultations with the best doctors without breaking
            a sweat and your bank.
          </p>

          <div className="flex items-center gap-4 justify-center lg:justify-start mt-6 xs:mt-0  flex-col xs:flex-row ">
            <Button isLink={true} href="/auth">
              Start a consult now
            </Button>
            <Button colour="outline-primary" onClick={handleScroll}>
              Contact us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
