import PlanCard from "@/src/app/(landing)/components/plan-card";
import { plans } from "@/src/app/(private)/planos/constants/plans";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core/container";

const OurPlansSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      id="planos"
      className="flex flex-col justify-center items-center gap-8 md:gap-10"
    >
      <FadeInOnScroll
        direction="up"
        offset={20}
        className="flex flex-col items-center w-full gap-4 md:gap-6"
      >
        <h2
          id="our-plans-heading"
          className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl text-center leading-tight"
        >
          Nossos Planos
        </h2>
        <p className="text-center text-sm md:text-base xl:text-base 2xl:text-lg text-muted-foreground">
          Escolha o plano ideal para o seu negócio e comece a lucrar mais com
          precificação inteligente.
        </p>
      </FadeInOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 items-center gap-4 xl:gap-8">
        {plans.map((plan, index) => (
          <FadeInOnScroll
            key={index}
            direction="up"
            delay={index * 0.15}
            offset={16}
            className="h-full"
          >
            <PlanCard
              key={plan.id}
              plan={plan}
              className="hover:scale-105 transition-transform duration-200"
            />
          </FadeInOnScroll>
        ))}
      </div>
      <FadeInOnScroll
        direction="up"
        offset={20}
        className="flex flex-col items-center w-full "
      >
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-sm font-medium text-foreground text-center">
            Todos os planos incluem{" "}
            <strong className="text-primary">7 dias grátis</strong> para testar
            sem compromisso.
          </p>
          <p className="text-xs text-muted-foreground text-center">
            Implementação opcional disponível mediante custo adicional.
          </p>
        </div>
      </FadeInOnScroll>
    </Container>
  );
};
export default OurPlansSection;
