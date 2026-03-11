"use client";

import { Button } from "@/src/components/core/button";
import { Card, CardContent } from "@/src/components/core/card";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import Link from "next/link";
import { useEffect, useState } from "react";

const PremiumPageOverlay = () => {
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    const sidebarInset = document.querySelector('[data-slot="sidebar-inset"]');

    const updateOffset = () => {
      if (sidebarInset) {
        setLeftOffset(sidebarInset.getBoundingClientRect().left);
      }
    };

    updateOffset();

    const observer = new ResizeObserver(updateOffset);
    if (sidebarInset) observer.observe(sidebarInset);

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center"
      style={{ left: leftOffset }}
    >
      <Card className="max-w-sm w-full items-center text-center">
        <CardContent className="flex flex-col items-center gap-4">
          <div className="h-16 w-16">
            <PlanCrownBadge isPremium />
          </div>
          <h1 className="text-2xl font-semibold">Feature Premium</h1>
          <p className="text-muted-foreground">
            Faça upgrade do seu plano para visualizar esta página e aproveitar
            todos os benefícios do nosso serviço!
          </p>
          <Button asChild>
            <Link href="/planos?aba=available-plans">Ver planos</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumPageOverlay;
