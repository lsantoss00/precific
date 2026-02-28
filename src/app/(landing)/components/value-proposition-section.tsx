import userImage from "@/public/images/user-image.webp";
import CtaButton from "@/src/app/(landing)/components/cta-button";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

const ValuePropositionSection = () => {
  return (
    <Container as="section" className="2xl:p-0! bg-white">
      <Flex className="flex-col xl:flex-row gap-8 items-center justify-between h-full w-full 2xl:max-w-7xl m-auto">
        <FadeInOnScroll direction="left" offset={20} className="w-full">
          <Flex className="flex-col space-y-8 md:space-y-12 xl:space-y-12 2xl:space-y-20 w-full">
            <Column className="space-y-4 md:space-y-5">
              <h2
                id="value-proposition-heading"
                className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl max-w-lg leading-tight"
              >
                Maior precisão,{" "}
                <span className="relative inline-block">menos estresse!</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                Com a nossa plataforma você não terá problemas para cadastrar um
                novo produto e descobrir o valor real de venda.
              </p>
              <Ellipsis
                className="w-12 h-12 md:w-16 md:h-16 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 -my-5 -ml-2"
                aria-hidden="true"
              />
            </Column>
            <CtaButton text="Quero falar com um especialista!" />
          </Flex>
        </FadeInOnScroll>
        <FadeInOnScroll
          direction="right"
          offset={20}
          className="relative z-10 w-full h-80 sm:h-96 md:h-110 lg:h-140 my-10"
        >
          <Flex as="figure">
            <Image
              src={userImage}
              alt="Usuário satisfeito utilizando a plataforma Precific"
              fill
              loading="lazy"
              className="object-cover object-center brightness-75 rounded-md"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
            />
          </Flex>
        </FadeInOnScroll>
      </Flex>
    </Container>
  );
};
export default ValuePropositionSection;
