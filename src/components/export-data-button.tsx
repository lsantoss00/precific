"use client";

import { Button } from "@/src/components/core/button";
import { Download, Loader2Icon } from "lucide-react";
import Show from "./core/show";

interface ExportDataButtonProps {
  onClick: () => Promise<void>;
  pending: boolean;
}

const ExportDataButton = ({ onClick, pending }: ExportDataButtonProps) => {
  return (
    <Button
      className="hover:cursor-pointer flex-1 max-w-35 h-12"
      type="button"
      variant="outline"
      disabled={pending}
      onClick={onClick}
    >
      <Show when={pending} fallback={<Download />}>
        <Loader2Icon className="animate-spin" />
      </Show>
      <span>Exportar</span>
    </Button>
  );
};

export default ExportDataButton;
