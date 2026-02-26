import CtaButton from "@/src/app/(landing)/components/cta-button";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import YouTubeEmbed from "@/src/components/youtube-embed";

const HeroSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="w-full min-h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <Flex className="flex-col xl:flex-row items-center justify-between xl:h-full gap-8 md:gap-12">
        <FadeInOnScroll
          direction="left"
          offset={20}
          className="relative z-10 w-full xl:max-w-140"
        >
          <Column className="space-y-6 md:space-y-8">
            <Column as="header" className="space-y-4 md:space-y-5">
              <h1 className="sr-only">
                Precific | Plataforma de Precificação Inteligente
              </h1>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl leading-tight">
                <span className="relative inline-block">
                  Precifique
                  {/* <span
                      className="absolute bottom-1 left-4 h-4 w-full bg-linear-to-r rounded-md from-primary from-50% to-transparent -z-10"
                      aria-hidden="true"
                    /> */}
                </span>{" "}
                seus produtos com precisão.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                O <strong className="font-normal">Precific</strong> automatiza o
                cálculo de preços com base em custos, impostos e margens,
                simulando cenários futuros da Reforma Tributária.
              </p>
            </Column>
            <CtaButton />
          </Column>
        </FadeInOnScroll>
        <FadeInOnScroll
          direction="right"
          offset={20}
          className="relative z-10 w-full xl:max-w-180 2xl:max-w-240 mt-8 xl:mt-0"
        >
          <Flex as="figure" className="aspect-video shrink-0">
            <YouTubeEmbed
              videoId="9gNKBYR-rhg"
              title="Precific — Demonstração do sistema de precificação inteligente"
            />
          </Flex>
        </FadeInOnScroll>
      </Flex>
    </Container>
  );
};
export default HeroSection;
