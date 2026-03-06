import PlansView from "@/src/app/(private)/planos/components/plans-view";
import { Container } from "@/src/components/core/container";
import Row from "@/src/components/core/row";
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
      <Row className="items-center gap-2">
        <Crown size={26} />
        <h1 className="text-3xl font-semibold">Planos</h1>
      </Row>
      <PlansView />
    </Container>
  );
}
