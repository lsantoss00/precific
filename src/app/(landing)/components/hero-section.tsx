import CtaButton from "@/src/app/(landing)/components/cta-button";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import SectionWithBackground from "@/src/components/section-with-background";
import YouTubeEmbed from "@/src/components/youtube-embed";

const HeroSection = () => {
  return (
    <SectionWithBackground
      className="w-full min-h-[calc(100vh-80px)] xl:h-[calc(100vh-80px)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Container as="section" variant="section" className="xl:h-full">
        <Flex className="flex-col xl:flex-row items-center justify-between xl:h-full gap-8 md:gap-12">
          <div className="animate-hero relative z-10 w-full xl:max-w-140">
            <Column className="space-y-6 md:space-y-8">
              <Column as="header" className="space-y-4 md:space-y-5">
                <h1 className="sr-only">
                  Precific | Plataforma de Precificação Inteligente
                </h1>
                <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl text-white leading-tight">
                  <span className="relative inline-block">
                    Precifique
                    <span
                      className="absolute bottom-1 left-4 h-4 w-full bg-linear-to-r from-secondary to-transparent -z-10"
                      aria-hidden="true"
                    />
                  </span>{" "}
                  seus produtos com precisão.
                </h2>
                <p className="text-zinc-200 text-base md:text-lg max-w-2xl">
                  O <strong className="font-normal">Precific</strong> automatiza
                  o cálculo de preços com base em custos, impostos e margens,
                  simulando cenários futuros da Reforma Tributária.
                </p>
              </Column>
              <CtaButton variant="secondary" />
            </Column>
          </div>
          <div className="animate-hero relative z-10 w-full xl:max-w-180 2xl:max-w-240 mt-8 xl:mt-0">
            <Flex as="figure" className="aspect-video shrink-0">
              <YouTubeEmbed
                videoId="9gNKBYR-rhg"
                title="Precific — Demonstração do sistema de precificação inteligente"
              />
            </Flex>
          </div>
        </Flex>
      </Container>
    </SectionWithBackground>
  );
};
export default HeroSection;
