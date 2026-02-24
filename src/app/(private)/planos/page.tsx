import PlanCard from "@/src/app/(landing)/components/plan-card";
import ActivePlanCard from "@/src/app/(private)/planos/components/active-plan-card";
import { plans } from "@/src/app/(private)/planos/constants/plans";
import { Container } from "@/src/components/core/container";
import Flex from "@/src/components/core/flex";
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
