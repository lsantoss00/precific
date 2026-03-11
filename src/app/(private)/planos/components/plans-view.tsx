"use client";

import PlanCard from "@/src/app/(landing)/components/plan-card";
import ActivePlanCard from "@/src/app/(private)/planos/components/active-plan-card";
import { plans } from "@/src/app/(private)/planos/constants/plans";
import { Button } from "@/src/components/core/button";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { parseAsStringLiteral, useQueryState } from "nuqs";

const viewOptions = ["active-plan", "available-plans"] as const;

export default function PlansView() {
  const [activeView, setActiveView] = useQueryState(
    "aba",
    parseAsStringLiteral(viewOptions).withDefault("active-plan"),
  );

  return (
    <Flex className="flex flex-col gap-4">
      <Flex className="gap-2">
        <Button
          variant={activeView === "active-plan" ? "default" : "outline"}
          onClick={() => setActiveView("active-plan")}
          className="border"
        >
          Plano Ativo
        </Button>
        <Button
          variant={activeView === "available-plans" ? "default" : "outline"}
          onClick={() => setActiveView("available-plans")}
          className="border"
        >
          Nossos Planos
        </Button>
      </Flex>
      <Show when={activeView === "active-plan"}>
        <Flex className="w-full h-full">
          <ActivePlanCard />
        </Flex>
      </Show>
      <Show when={activeView === "available-plans"}>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 items-center gap-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Show>
    </Flex>
  );
}
