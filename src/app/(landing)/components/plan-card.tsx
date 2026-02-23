"use client";

import { PlanType } from "@/src/app/(landing)/types/plan-type";
import { Button, Card, Separator } from "@/src/components/core";
import { Badge } from "@/src/components/core/badge";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { useScrollToSection } from "@/src/hooks/use-scroll-to-section";
import { CircleCheckBig } from "lucide-react";

interface PlanCardProps {
  plan: PlanType;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const { scrollToSection } = useScrollToSection();

  return (
    <Card
      className={`px-4 py-8 xl:max-w-sm h-full flex flex-col hover:scale-105 transition-transform duration-200 ${plan?.isMostPopular && "border-primary"}`}
    >
      <Column className="gap-1">
        <Row className="items-center justify-between gap-2">
          <h3 className="font-semibold text-lg md:text-xl">{plan.name}</h3>
          {plan?.isMostPopular && (
            <Badge className="font-semibold uppercase">Mais Popular</Badge>
          )}
        </Row>
        <p className="text-muted-foreground text-sm max-w-[95%]">
          {plan.description}
        </p>
      </Column>
      <p className="font-bold text-xl md:text-2xl mt-8">
        {plan.price}
        <span className="text-xs font-medium text-muted-foreground"> /mês</span>
      </p>
      <Separator className="mt-8" />
      <ul className="flex flex-col gap-3 my-8 flex-1">
        {plan?.benefits?.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2">
            <CircleCheckBig size={24} className="text-primary shrink-0" />
            <span className="text-sm">{benefit}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`h-12 uppercase font-semibold ring-2 ring-primary focus-visible:ring-primary ${
          !plan?.isMostPopular &&
          "ring-2 ring-primary text-primary hover:text-white bg-white"
        }`}
        onClick={() => scrollToSection("contato")}
      >
        Falar com Especialista
      </Button>
    </Card>
  );
};

export default PlanCard;
