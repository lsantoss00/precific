"use client";

import Flex from "@/src/components/core/flex";
import { Crown } from "lucide-react";

const PlanCrownBadge = () => {
  return (
    <Flex
      className="h-full w-full rounded-full items-center justify-center border-2 shrink-0 p-0.5 border-secondary bg-yellow-200 shadow-sm"
      aria-label="Plano Premium"
    >
      <Crown className="text-secondary" />
    </Flex>
  );
};

export default PlanCrownBadge;
