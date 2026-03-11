"use client";

import { Button } from "@/src/components/core/button";
import Row from "@/src/components/core/row";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import { Download, Loader2Icon } from "lucide-react";
import Show from "./core/show";

interface ExportDataButtonProps {
  onClick: () => Promise<void>;
  pending: boolean;
  disabled?: boolean;
}

const ExportDataButton = ({
  onClick,
  pending,
  disabled,
}: ExportDataButtonProps) => {
  return (
    <Row className="relative">
      <Button
        className="hover:cursor-pointer flex-1 max-w-35 relative"
        type="button"
        variant="outline"
        disabled={pending || disabled}
        onClick={onClick}
      >
        <Show when={pending} fallback={<Download />}>
          <Loader2Icon className="animate-spin" />
        </Show>
        <span>Exportar</span>
      </Button>
      <Show when={disabled}>
        <div className="h-6 w-6 absolute -right-2 -top-1.5">
          <PlanCrownBadge isPremium />
        </div>
      </Show>
    </Row>
  );
};

export default ExportDataButton;
