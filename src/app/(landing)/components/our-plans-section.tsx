import PlanCard from "@/src/app/(landing)/components/plan-card";
import { PlanType } from "@/src/app/(landing)/types/plan-type";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import { Container } from "@/src/components/core";

const OurPlansSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="bg-white flex flex-col justify-center items-center gap-8 md:gap-10"
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
            <PlanCard key={plan.id} plan={plan} />
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

export const plans: PlanType[] = [
  {
    id: "1",
    name: "BÁSICO",
    description:
      "Ideal para pequenos negócios que buscam controle simples e eficiente da precificação.",
    price: "R$ 79,99",
    benefits: [
      "1 usuário",
      "Até 80 produtos cadastrados",
      "Relatórios básicos",
      "Exportação de planilhas",
    ],
  },
  {
    id: "2",
    name: "INTERMEDIÁRIO",
    description:
      "Perfeito para negócios em expansão que precisam de mais controle e melhores insights.",
    price: "R$ 199,99",
    benefits: [
      "Tudo do básico",
      "Até 200 produtos cadastrados",
      "Relatórios avançados",
      "Histórico de precificação",
      "Acesso à plataforma de cursos (em breve)",
    ],
    isMostPopular: true,
  },
  {
    id: "3",
    name: "AVANÇADO",
    description:
      "Indicado para empresas que exigem controle total e gestão avançada da precificação.",
    price: "R$ 399,99",
    benefits: [
      "Tudo do intermediário",
      "Até 3 usuários",
      "Produtos ilimitados",
      "Suporte prioritário",
    ],
  },
  {
    id: "4",
    name: "CUSTOMIZADO",
    description:
      "Solução flexível para empresas que precisam de regras e recursos sob medida dedicados.",
    price: "R$ 799,99",
    benefits: [
      "Tudo do avançado",
      "Usuários personalizados",
      "Consultorias mensais",
      "Suporte master",
      "Adequação de cenário de venda de acordo com a realidade da empresa",
    ],
  },
];
