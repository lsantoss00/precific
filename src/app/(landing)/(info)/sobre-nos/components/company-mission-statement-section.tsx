import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";

const CompanyMissionStatementSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="bg-primary"
      aria-labelledby="mission-statement-heading"
    >
      <FadeInOnScroll direction="up" offset={20} className="w-full">
        <Column className="space-y-4 sm:space-y-5 md:space-y-6 w-full 2xl:max-w-7xl m-auto">
          <h2
            id="mission-statement-heading"
            className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl leading-tight text-center text-white"
          >
            O Grupo Viriato leva as empresas à excelência.
          </h2>
          <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-lg text-neutral-200 leading-relaxed text-center">
            Há quatro décadas, transformamos desafios em estratégia e estratégia
            em crescimento real. Evoluímos de um escritório familiar para um
            ecossistema completo que impulsiona negócios com inteligência
            contábil, segurança jurídica, precisão tributária, visão imobiliária
            e soluções de proteção. Nossa história é feita de constância,
            aprimoramento e resultados que permanecem. Aqui, cada empresa
            encontra direção, estrutura e um parceiro comprometido em elevar o
            futuro que está construindo.
          </p>
        </Column>
      </FadeInOnScroll>
    </Container>
  );
};

export default CompanyMissionStatementSection;
