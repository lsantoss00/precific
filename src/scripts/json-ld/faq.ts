export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://precificapp.com/#faq",
  isPartOf: {
    "@id": "https://precificapp.com/#website",
  },
  about: {
    "@id": "https://precificapp.com/#software",
  },
  mainEntity: [
    {
      "@type": "Question",
      name: "Como eu posso adquirir o sistema?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Você pode contratar o Precific entrando em contato com nossa equipe comercial. Fazemos a implantação e deixamos tudo pronto para começar a precificar de forma estratégica desde o primeiro dia.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o valor do investimento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trabalhamos com planos, solicite uma proposta personalizada para sua operação.",
      },
    },
    {
      "@type": "Question",
      name: "Meus dados estão seguros?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Todos os dados são armazenados em servidores protegidos, com criptografia e protocolos de segurança que seguem padrões internacionais. Nenhuma informação é compartilhada e você mantém total controle sobre tudo o que é enviado para a plataforma.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona o suporte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nosso suporte acompanha você desde a implantação. Ajudamos na configuração inicial, tiramos dúvidas sobre uso do sistema e orientamos nas melhores práticas de formação de preço. O atendimento é contínuo e realizado por especialistas em precificação e tributação.",
      },
    },
    {
      "@type": "Question",
      name: "Quais são os principais benefícios do Precific?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Precific reduz erros de cálculo, padroniza sua precificação, aumenta a margem de lucro e acelera a tomada de decisão. Você visualiza custos, despesas, tributos e margem real em poucos segundos, com clareza total sobre o impacto financeiro de cada produto.",
      },
    },
    {
      "@type": "Question",
      name: "O sistema já está preparado para a Reforma Tributária?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. O Precific considera as novas estruturas de IBS e CBS e permite simular diferentes cenários de impacto tributário. Assim, você consegue ajustar preços e margens antecipadamente, evitando surpresas quando as novas regras entrarem em vigor.",
      },
    },
  ],
};
