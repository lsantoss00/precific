"use client";

import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import dynamic from "next/dynamic";

const FAQAccordion = dynamic(() => import("@/src/components/faq-accordion"), {
  ssr: false,
});

const FAQSection = () => {
  return (
    <SectionWithBackground
      className="w-full overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <Container as="section" variant="section">
        <Flex className="flex-col xl:flex-row gap-8 xl:gap-12 justify-between">
          <FadeInOnScroll direction="left" offset={20}>
            <Column
              as="header"
              className="relative z-10 w-full 2xl:w-140 space-y-6 md:space-y-8"
            >
              <Column className="space-y-4 md:space-y-5">
                <h2
                  id="faq-heading"
                  className="font-bold text-3xl sm:text-4xl xl:text-4xl 2xl:text-5xl text-white leading-tight"
                >
                  Ficou alguma dúvida?
                </h2>
                <p>
                  <span className="relative inline-block text-2xl md:text-3xl xl:text-3xl 2xl:text-4xl text-white">
                    Perguntas frequentes
                    <span
                      className="absolute -bottom-1.5 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                      aria-hidden="true"
                    />
                  </span>
                </p>
              </Column>
            </Column>
          </FadeInOnScroll>
          <FadeInOnScroll
            direction="right"
            offset={20}
            className="w-full flex-1"
          >
            <Column className="relative z-10 bg-white h-fit w-full xl:max-w-180 2xl:max-w-240 rounded-md xl:ml-auto">
              <FAQAccordion />
            </Column>
          </FadeInOnScroll>
        </Flex>
      </Container>
    </SectionWithBackground>
  );
};
export default FAQSection;
