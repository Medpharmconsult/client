"use client";
import Container from "@/app/_components/Container";
import Heading from "../../_components/Heading";
import Button from "@/app/_components/Button";
import HeroImg from "@/public/hero.jpg";
import Image from "next/image";

export default function Hero() {
  const handleScroll = () => {
    document.getElementById("contact")?.scrollIntoView();
  };
  return (
    <section className=" bg-grey-200">
      <Container classname="cxl:h-[calc(100vh-96px)] min-h-[554px] flex items-start lg:items-center justify-center lg:justify-start">
        <div className="flex md2:items-end  flex-col items-center gap-x-[30px] gap-y-6 md2:flex-row justify-between w-full self-stretch">
          <div className="h-full flex items-center">
            <div className=" lg:max-w-[570px] max-w-[500px] w-full mt-12 xs:mt-16 md2:mt-0 text-center md2:text-left">
              <Heading type="h1" classname="text-primary-100">
                Consult top medical professionals effortlessly
              </Heading>
              <p className=" text-[18px]/[24px] lg:text-[22px]/[28px] tracking-normal mt-[18px] mb-6 lg:mt-6 lg:mb-[32px] hidden xs:block">
                Get 24/7 online consultations with the best doctors without
                breaking a sweat and your bank.
              </p>

              <div className="flex items-center gap-4 justify-center md2:justify-start mt-6 xs:mt-0  flex-col xs:flex-row ">
                <Button isLink={true} href="/auth">
                  Start a consult now
                </Button>
                <Button colour="outline-primary" onClick={handleScroll}>
                  Contact us
                </Button>
              </div>
            </div>
          </div>
          <Image
            src={HeroImg}
            alt="hero-img"
            className="w-[350px] max-h-full lg:w-[500px] sm:w-[400px] xl:w-auto"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
