import userImage from "@/public/images/user-image.webp";
import CtaButton from "@/src/app/(landing)/components/cta-button";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

const ValuePropositionSection = () => {
  return (
    <SectionWithBackground
      className="w-full xl:h-168 2xl:h-175 overflow-hidden"
      aria-labelledby="value-proposition-heading"
    >
      <Flex className="flex-col xl:flex-row items-center justify-between h-full">
        <FadeInOnScroll
          direction="left"
          offset={20}
          className="w-full xl:w-1/2"
        >
          <Container as="section" variant="section" className="relative">
            <Flex className="flex-col lg:flex-row xl:flex-col space-y-8 md:space-y-12 xl:space-y-12 2xl:space-y-20 w-full">
              <Column className="space-y-4 md:space-y-5">
                <h2
                  id="value-proposition-heading"
                  className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white max-w-lg leading-tight"
                >
                  Maior precisão,{" "}
                  <span className="relative inline-block">
                    menos estresse!
                    <span
                      className="absolute bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                      aria-hidden="true"
                    />
                  </span>
                </h2>
                <p className="text-zinc-200 text-base md:text-lg max-w-xl">
                  Com a nossa plataforma você não terá problemas para cadastrar
                  um novo produto e descobrir o valor real de venda.
                </p>
                <Ellipsis
                  className="text-white w-12 h-12 md:w-16 md:h-16 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 -my-5 -ml-2"
                  aria-hidden="true"
                />
              </Column>
              <CtaButton
                variant="secondary"
                text="Quero falar com um especialista!"
              />
            </Flex>
          </Container>
        </FadeInOnScroll>
        <FadeInOnScroll
          direction="right"
          offset={20}
          className="relative z-10 w-full xl:w-1/2 h-80 sm:h-96 md:h-110 lg:h-140 xl:h-full"
        >
          <Flex as="figure" className="relative w-full h-full">
            <Image
              src={userImage}
              alt="Usuário satisfeito utilizando a plataforma Precific"
              fill
              loading="lazy"
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
            />
          </Flex>
        </FadeInOnScroll>
      </Flex>
    </SectionWithBackground>
  );
};
export default ValuePropositionSection;
