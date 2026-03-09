import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";

const GetAheadSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="bg-primary"
      aria-labelledby="get-ahead-heading"
    >
      <Column className="items-center">
        <FadeInOnScroll direction="up" offset={20}>
          <Column className="max-w-155 space-y-4 md:space-y-6">
            <h2
              id="get-ahead-heading"
              className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center text-white leading-tight"
            >
              Esteja à frente da concorrência!
            </h2>
            <p className="text-center text-sm md:text-base xl:text-base 2xl:text-lg text-neutral-200 max-w-3xl">
              Empresas que não precificarem corretamente, não irão aproveitar os
              créditos de IBS/CBS e estarão com o preço fora do mercado, não
              conseguindo competir com seus concorrentes!
            </p>
          </Column>
        </FadeInOnScroll>
      </Column>
    </Container>
  );
};
export default GetAheadSection;
