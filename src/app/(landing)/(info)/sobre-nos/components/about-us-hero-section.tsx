"use client";

import people1 from "@/public/images/people-1.webp";
import people2 from "@/public/images/people-2.webp";
import people3 from "@/public/images/people-3.webp";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import { Sparkle } from "lucide-react";
import Image from "next/image";

const AboutUsHeroSection = () => {
  return (
    <SectionWithBackground
      className="w-full min-h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)] overflow-hidden"
      aria-labelledby="about-hero-heading"
    >
      <Container
        as="section"
        variant="section"
        className="h-full lg:flex lg:flex-col lg:justify-center"
      >
        <Flex className="flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <FadeInOnScroll
            direction="left"
            offset={20}
            className="w-full xl:max-w-150 2xl:max-w-170 z-10"
          >
            <Column as="header" className="gap-4 md:gap-6">
              <h1 className="sr-only">Sobre o Precific e o Grupo Viriato</h1>
              <Column className="gap-3 max-w-lg">
                <Sparkle
                  className="text-secondary w-5 h-5 sm:w-6 sm:h-6"
                  aria-hidden="true"
                />
                <p className="text-zinc-200 text-sm sm:text-base md:text-lg">
                  Quatro décadas de experiência transformadas em estratégia,
                  controle e decisões empresariais seguras.
                </p>
              </Column>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight max-w-2xl">
                Nós{" "}
                <span className="relative inline-block">
                  impulsionamos
                  <span
                    className="absolute bottom-1 left-2 sm:left-4 h-3 sm:h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                    aria-hidden="true"
                  />
                </span>{" "}
                empresas há mais de{" "}
                <span className="relative inline-block">
                  40 anos.
                  <span
                    className="absolute bottom-1 left-2 sm:left-4 h-3 sm:h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                    aria-hidden="true"
                  />
                </span>{" "}
              </h2>
            </Column>
          </FadeInOnScroll>
          <FadeInOnScroll
            direction="right"
            offset={20}
            className="relative z-10"
          >
            <Flex
              as="figure"
              className="relative lg:mr-4 xl:mr-13"
              style={{
                width: "clamp(15.625rem, 28vw, 30rem)",
                height: "clamp(15.625rem, 28vw, 30rem)",
              }}
              aria-label="Equipe do Grupo Viriato"
            >
              <div className="relative w-full h-full">
                <Image
                  src={people1}
                  alt="Membro da equipe Grupo Viriato"
                  fill
                  priority
                  sizes="(max-width: 640px) 250px, (max-width: 768px) 340px, (max-width: 1024px) 340px, (max-width: 1280px) 380px, 448px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
                />
              </div>
              <div
                className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 lg:-bottom-4 lg:-right-4 xl:-bottom-10 xl:-right-13.5"
                style={{
                  width: "clamp(7.5rem, 14vw, 15rem)",
                  height: "clamp(7.5rem, 14vw, 15rem)",
                }}
              >
                <Image
                  src={people2}
                  alt="Membro da equipe Grupo Viriato"
                  fill
                  priority
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 150px, (max-width: 1024px) 200px, (max-width: 1280px) 210px, 224px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
                />
              </div>
              <div
                className="absolute -bottom-4 left-16 sm:-bottom-6 sm:left-20 md:-bottom-10 lg:-bottom-8 xl:-bottom-16 xl:left-40"
                style={{
                  width: "clamp(3.75rem, 7vw, 7.5rem)",
                  height: "clamp(3.75rem, 7vw, 7.5rem)",
                }}
              >
                <Image
                  src={people3}
                  alt="Membro da equipe Grupo Viriato"
                  fill
                  priority
                  sizes="(max-width: 640px) 60px, (max-width: 768px) 80px, (max-width: 1024px) 100px, (max-width: 1280px) 105px, 112px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500 rounded-full shadow-2xl"
                />
              </div>
            </Flex>
          </FadeInOnScroll>
        </Flex>
      </Container>
    </SectionWithBackground>
  );
};
export default AboutUsHeroSection;
