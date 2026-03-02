import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/core/accordion";

const FAQAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full h-full p-4 lg:p-10 space-y-5"
    >
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`item-${index}`}>
          <AccordionTrigger className="lg:text-lg font-bold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground lg:text-base">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;

const faqs = [
  {
    question: "Como eu posso adquirir o sistema?",
    answer:
      "Você pode contratar o Precific entrando em contato com nossa equipe comercial. Fazemos a implantação e deixamos tudo pronto para começar a precificar de forma estratégica desde o primeiro dia.",
  },
  {
    question: "Qual o valor do investimento?",
    answer:
      "Trabalhamos com planos, solicite uma proposta personalizada para sua operação.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Todos os dados são armazenados em servidores protegidos, com criptografia e protocolos de segurança que seguem padrões internacionais. Nenhuma informação é compartilhada e você mantém total controle sobre tudo o que é enviado para a plataforma.",
  },
  {
    question: "Como funciona o suporte?",
    answer:
      "Nosso suporte acompanha você desde a implantação. Ajudamos na configuração inicial, tiramos dúvidas sobre uso do sistema e orientamos nas melhores práticas de formação de preço. O atendimento é contínuo e realizado por especialistas em precificação e tributação.",
  },
  {
    question: "Quais são os principais benefícios do Precific?",
    answer:
      "O Precific reduz erros de cálculo, padroniza sua precificação, aumenta a margem de lucro e acelera a tomada de decisão. Você visualiza custos, despesas, tributos e margem real em poucos segundos, com clareza total sobre o impacto financeiro de cada produto.",
  },
  {
    question: "O sistema já está preparado para a Reforma Tributária?",
    answer:
      "Sim. O Precific considera as novas estruturas de IBS e CBS e permite simular diferentes cenários de impacto tributário. Assim, você consegue ajustar preços e margens antecipadamente, evitando surpresas quando as novas regras entrarem em vigor.",
  },
];
