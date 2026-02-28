"use client";

import { CompanyMissionAndValuesTopicType } from "@/src/app/(landing)/(info)/sobre-nos/types/company-mission-and-values-topic-type";
import FadeInOnScroll from "@/src/components/animations/fade-in-on-scroll";
import Column from "@/src/components/core/column";
import { Container } from "@/src/components/core/container";
import {
  Award,
  Eye,
  Goal,
  Rocket,
  Share2,
  ShieldCheck,
  Target,
} from "lucide-react";
import CompanySectionBlock from "./company-section-block";
import CompanyTopicCard from "./company-topic-card";

const CompanyMissionAndValuesSection = () => {
  return (
    <Container
      as="section"
      variant="section"
      className="space-y-12 lg:space-y-16 bg-background 2xl:px-0! 2xl:max-w-7xl m-auto"
    >
      <Column
        className="space-y-8 sm:space-y-10 md:space-y-12 xl:flex-row xl:space-y-0 xl:space-x-16 2xl:space-x-40 justify-between w-full"
        aria-labelledby="values-heading"
      >
        <FadeInOnScroll
          direction="left"
          offset={20}
          className="w-full xl:max-w-lg"
        >
          <CompanySectionBlock
            id="values-heading"
            icon={
              <Award size={32} className="text-primary" aria-hidden="true" />
            }
            heading="Nossos valores são fruto de décadas de experiência, evolução e aprendizado contínuo."
            description="Eles se moldaram com nosso crescimento, desafios reais e decisões que impactaram empresas, pessoas e resultados. São o alicerce que garante consistência, responsabilidade e clareza em cada escolha feita ao longo da nossa trajetória."
          />
        </FadeInOnScroll>
        <Column
          as="ul"
          className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1"
        >
          {companyValuesTopics.map((value, index) => (
            <FadeInOnScroll
              as="li"
              key={value.title}
              direction="right"
              offset={20}
              delay={index * 0.1}
            >
              <CompanyTopicCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </FadeInOnScroll>
          ))}
        </Column>
      </Column>
      <Column
        as="section"
        className="space-y-8 sm:space-y-10 md:space-y-12 xl:flex-row xl:space-y-0 xl:space-x-16 2xl:space-x-40 justify-between w-full"
        aria-labelledby="mission-heading"
      >
        <FadeInOnScroll
          direction="left"
          offset={20}
          className="w-full xl:max-w-lg"
        >
          <CompanySectionBlock
            id="mission-heading"
            icon={
              <Goal size={32} className="text-primary" aria-hidden="true" />
            }
            heading="Nossa missão guia nossas ações com base na experiência, entendimento do mercado e dedicação de gerar impacto real e duradouro."
          />
        </FadeInOnScroll>
        <Column
          as="ul"
          className="space-y-4 sm:space-y-5 md:space-y-6 w-full lg:w-auto lg:flex-1 xl:max-w-2xl"
        >
          {companyMissionTopics.map((mission, index) => (
            <FadeInOnScroll
              as="li"
              key={mission.title}
              direction="right"
              offset={20}
              delay={index * 0.1}
            >
              <CompanyTopicCard
                icon={mission.icon}
                title={mission.title}
                description={mission.description}
              />
            </FadeInOnScroll>
          ))}
        </Column>
      </Column>
    </Container>
  );
};

export default CompanyMissionAndValuesSection;

const companyValuesTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Transparência",
    description:
      "Atuamos com processos claros, critérios objetivos e comunicação direta. Acreditamos que confiança se constrói com informação acessível e decisões bem explicadas.",
    icon: <Eye />,
  },
  {
    title: "Colaboração",
    description:
      "Resultados sólidos não são individuais. Trabalhamos lado a lado com nossos clientes, integrando conhecimento técnico e visão estratégica para decisões mais consistentes e duradouras.",
    icon: <Share2 />,
  },
  {
    title: "Segurança",
    description:
      "Protegemos dados, informações e decisões críticas. Seguimos as melhores práticas do mercado para garantir integridade, confidencialidade e estabilidade em cada processo.",
    icon: <ShieldCheck />,
  },
];

const companyMissionTopics: CompanyMissionAndValuesTopicType[] = [
  {
    title: "Propósito",
    description:
      "Existimos para desenvolver, orientar e servir empresas por meio de soluções que unem conhecimento técnico, estratégia e tecnologia, promovendo crescimento sustentável e decisões mais seguras.",
    icon: <Target />,
  },
  {
    title: "Missão",
    description:
      "Apoiar empresas na construção de estruturas mais sólidas, eficientes e preparadas para o futuro, oferecendo serviços e soluções que gerem clareza, controle e valor de longo prazo.",
    icon: <Rocket />,
  },
];
