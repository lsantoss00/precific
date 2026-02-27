import AboutUsHeroSection from "@/src/app/(landing)/(info)/sobre-nos/components/about-us-hero-section";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato. Nossa missão é simplificar a gestão financeira e tributária das empresas brasileiras.",
  keywords: [
    "sobre nós",
    "precific",
    "grupo viriato",
    "empresa",
    "missão",
    "visão",
    "valores",
    "história",
    "gestão tributária",
    "precificação",
  ],
  openGraph: {
    title: "Sobre Nós | Precific",
    description:
      "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato. Nossa missão é simplificar a gestão financeira e tributária das empresas brasileiras.",
    url: "https://precificapp.com/sobre-nos",
  },
  twitter: {
    title: "Sobre Nós | Precific",
    description:
      "Conheça o Precific, sistema inteligente de precificação e gestão tributária desenvolvido pelo Grupo Viriato.",
  },
  alternates: {
    canonical: "/sobre-nos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const CompanyMissionStatementSection = dynamic(
  () =>
    import("@/src/app/(landing)/(info)/sobre-nos/components/company-mission-statement-section"),
  { ssr: true },
);

const OurCompaniesSection = dynamic(
  () =>
    import("@/src/app/(landing)/(info)/sobre-nos/components/our-companies-section"),
  { ssr: true },
);

const CompanyMissionAndValuesSection = dynamic(
  () =>
    import("@/src/app/(landing)/(info)/sobre-nos/components/company-mission-and-values-section"),
  { ssr: true },
);

export default function AboutUsPage() {
  return (
    <>
      <AboutUsHeroSection />
      <OurCompaniesSection />
      <CompanyMissionStatementSection />
      <CompanyMissionAndValuesSection />
    </>
  );
}
