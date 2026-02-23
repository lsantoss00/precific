import LandingPageContent from "@/src/app/(landing)/components/landing-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Precific | Plataforma de Precificação Inteligente",
  },
  description:
    "Sistema de precificação e gestão tributária. Automatize cálculos de custos, impostos e margens. Simule a Reforma Tributária (IBS/CBS) e otimize seus preços em tempo real.",
};

export default function HomePage() {
  return <LandingPageContent />;
}
