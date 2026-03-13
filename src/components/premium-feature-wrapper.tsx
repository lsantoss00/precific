"use client";

import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import { ReactNode } from "react";

interface PremiumFeatureWrapperProps {
  children: ReactNode;
  isPremium?: boolean;
}

const PremiumFeatureWrapper = ({
  children,
  isPremium = false,
}: PremiumFeatureWrapperProps) => {
  return (
    <div className="relative w-full h-full">
      {children}
      <Show when={isPremium}>
        <Flex className="absolute m-0.5 inset-0 backdrop-blur-sm items-start justify-end z-10 rounded-md">
          <CustomTooltip
            className="m-1.5!"
            tooltipClassName="max-w-xs!"
            icon={
              <div className="h-10 w-10 bg-white rounded-full">
                <PlanCrownBadge />
              </div>
            }
            message={
              <Column className="gap-2">
                <p>Faça upgrade do seu plano para visualizar este gráfico.</p>
              </Column>
            }
          />
        </Flex>
      </Show>
    </div>
  );
};

export default PremiumFeatureWrapper;
