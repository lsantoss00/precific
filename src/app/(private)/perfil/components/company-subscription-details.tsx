"use client";

import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import { dateFormatter } from "@/src/helpers/date-formatter";
import { useAuth } from "@/src/providers/auth-provider";

const CompanySubscriptionDetails = () => {
  const { isPremium, expiresAt } = useAuth();

  return (
    <Card className="w-full p-6 rounded-md flex space-y-4">
      <h3 className="text-lg">Assinatura</h3>
      <Row className="items-center gap-2">
        <div className="h-12 w-12 shrink-0">
          <PlanCrownBadge isPremium={isPremium} />
        </div>
        <Column>
          <p>{isPremium ? "Plano Pago" : "Plano Gratuito"}</p>
          <Show
            when={isPremium && expiresAt}
            fallback={
              <span className="text-sm text-muted-foreground">
                Contate nosso suporte e assine o plano pago!
              </span>
            }
          >
            <span className="text-sm text-muted-foreground">
              Expira em: {dateFormatter(expiresAt!, true)}
            </span>
          </Show>
        </Column>
      </Row>
    </Card>
  );
};

export default CompanySubscriptionDetails;
