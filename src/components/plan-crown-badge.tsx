"use client";

import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import { Crown } from "lucide-react";

interface PlanCrownBadgeProps {
  isPremium?: boolean;
}

const PlanCrownBadge = ({ isPremium = false }: PlanCrownBadgeProps) => {
  return (
    <Flex
      className={`h-full w-full rounded-full items-center justify-center border-2 shrink-0 p-0.5 ${
        isPremium
          ? "border-secondary bg-yellow-200"
          : "border-muted-foreground bg-neutral-100"
      } shadow-sm`}
    >
      <Show
        when={isPremium}
        fallback={<Crown className="text-muted-foreground" />}
      >
        <Crown className="text-secondary" />
      </Show>
    </Flex>
  );
};

export default PlanCrownBadge;
