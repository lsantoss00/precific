import { PlanType } from "@/src/app/(landing)/types/plan-type";

export const plans: PlanType[] = [
  {
    id: "1",
    name: "BÁSICO",
    description:
      "Ideal para pequenos negócios que buscam um controle simples e eficiente da precificação.",
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
