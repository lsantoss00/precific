import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import FAQAccordion from "@/src/components/faq-accordion";

const FAQSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="m-auto max-w-360 w-full overflow-hidden bg-background"
    >
      <Flex className="flex-col gap-8 xl:gap-12 justify-center">
        <FadeInOnScroll direction="left" offset={20}>
          <Column
            as="header"
            className="relative z-10 w-full 2xl:w-140 space-y-6 md:space-y-8"
          >
            <Column className="space-y-4 md:space-y-5">
              <h2
                id="faq-heading"
                className="relative inline-block font-bold text-3xl sm:text-4xl xl:text-4xl 2xl:text-5xl leading-tight"
              >
                Ficou alguma dúvida?
              </h2>
              <p>
                <span className="text-2xl md:text-3xl xl:text-3xl 2xl:text-4xl text-muted-foreground">
                  Perguntas frequentes
                </span>
              </p>
            </Column>
          </Column>
        </FadeInOnScroll>
        <FadeInOnScroll direction="right" offset={20} className="w-full flex-1">
          <Column className="relative z-10 bg-white h-fit w-full rounded-md m-auto">
            <FAQAccordion />
          </Column>
        </FadeInOnScroll>
      </Flex>
    </Container>
  );
};
export default FAQSection;
