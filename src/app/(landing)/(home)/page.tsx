import LandingPageContent from "@/src/app/(landing)/components/landing-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Precific | Plataforma de Precificação Inteligente",
  },
  description:
    "Sistema de precificação e gestão tributária. Automatize o cálculo de custos, impostos e margens de lucro, reduza erros fiscais e aumente a rentabilidade. Simule os impactos da Reforma Tributária (IBS e CBS), otimize seus preços em tempo real e tome decisões estratégicas com mais segurança, precisão e conformidade fiscal.",
};

export default function HomePage() {
  return <LandingPageContent />;
}
