"use client";

import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";

const StartUsingSection = () => {
  const { scrollToSection } = useScrollToSection();

  return (
    <Container
      as="section"
      variant="section"
      className="bg-white"
      aria-labelledby="start-using-heading"
    >
      <Column className="items-center">
        <FadeInOnScroll direction="up" offset={20}>
          <Column className="space-y-4 md:space-y-6 items-center">
            <h2
              id="start-using-heading"
              className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center leading-tight"
            >
              Comece a usar o Precific agora!
            </h2>
            <p className="text-center text-sm md:text-base xl:text-base 2xl:text-lg max-w-155 text-muted-foreground">
              Enquanto você pensa, seu concorrente já já vai começar a{" "}
              <span
                className="bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary font-bold"
                aria-label="Precificar"
              >
                PRECIFIC
              </span>
              ar... Vai deixar ele sair na frente?
            </p>
            <Button
              className="h-12 md:h-14 w-full sm:w-fit px-6 md:px-8 text-sm md:text-base"
              onClick={() => scrollToSection("contato")}
            >
              Não quero ficar para trás!
            </Button>
          </Column>
        </FadeInOnScroll>
      </Column>
    </Container>
  );
};
export default StartUsingSection;
