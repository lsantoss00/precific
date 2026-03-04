import PlanCard from "@/src/app/(landing)/components/plan-card";
import ActivePlanCard from "@/src/app/(private)/planos/components/active-plan-card";
import { plans } from "@/src/app/(private)/planos/constants/plans";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { Crown, TriangleAlert } from "lucide-react";
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
      <Flex className="flex-col-reverse lg:flex-row gap-4 justify-between">
        <Row className="items-center gap-2">
          <Crown size={26} />
          <h1 className="text-3xl font-semibold">Planos</h1>
          <ComingSoonBadge />
        </Row>
        <Row className="bg-secondary/5 border border-secondary rounded-md gap-2 p-1.5 items-center">
          <TriangleAlert className="text-secondary shrink-0" />
          <span className="text-sm">
            Página ainda em desenvolvimento. Os dados exibidos são apenas para
            fins de demonstração.
          </span>
        </Row>
      </Flex>
      <Flex className="flex flex-col gap-4">
        <Flex className="w-full h-full">
          <ActivePlanCard />
        </Flex>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 items-center gap-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Flex>
    </Container>
  );
}
