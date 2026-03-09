import PlansView from "@/src/app/(private)/planos/components/plans-view";
import { Container } from "@/src/components/core/container";
import PageTitle from "@/src/components/page-title";
import { Crown } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos",
  description:
    "Escolha o plano ideal para você. Compare recursos, benefícios e preços da nossa aplicação e comece a aproveitar todas as funcionalidades hoje mesmo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupportPage() {
  return (
    <Container variant="page">
      <PageTitle
        icon={<Crown size={26} className="shrink-0" />}
        title="Planos"
      />
      <PlansView />
    </Container>
  );
}
