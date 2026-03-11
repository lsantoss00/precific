"use client";

import ProducStatCard from "@/src/app/(private)/planos/components/product-stat-card";
import { PlanDisplayName } from "@/src/app/(private)/planos/types/plan-type";
import { getProductSummaries } from "@/src/app/(private)/produtos/services/get-summary-products";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { Progress } from "@/src/components/core/progress";
import Row from "@/src/components/core/row";
import { Separator } from "@/src/components/core/separator";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useAuth } from "@/src/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  CircleCheckBig,
  Package,
  Users,
  XCircle,
} from "lucide-react";

const charts = [
  "Preço Médio de Venda",
  "Custo Médio",
  "Lucro Líquido Médio",
  "Rentabilidade Média",
  "Ranking de Lucro Líquido",
  "Ranking de Markup",
  "Ranking de Custo Fixo",
  "Ranking de Frete",
  "Preço de Venda X Custo de Aquisição",
  "Preço de Venda X Lucro Líquido",
  "Histórico de Preços",
  "Histórico de Lucros Líquidos",
];

const basicCharts = new Set([
  "Preço Médio de Venda",
  "Custo Médio",
  "Ranking de Lucro Líquido",
  "Ranking de Markup",
]);

const SectionHeader = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <Row className="items-center gap-2 mb-3">
    <Row className="items-center justify-center w-8 h-8 rounded-md bg-primary/10">
      <Icon className="w-4 h-4 text-primary" />
    </Row>
    <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
      {title}
    </h3>
  </Row>
);

const ActivePlanCard = () => {
  const { company, plan } = useAuth();

  const { data: summary } = useQuery({
    queryFn: getProductSummaries,
    queryKey: ["product", "summaries"],
  });

  const isMd = useMediaQuery(`(min-width: 768px)`);
  const is3xl = useMediaQuery(`(min-width: 1800px)`);

  const isBasic = plan?.planId === "basic";
  const availableCharts = charts.filter(
    (name) => !isBasic || basicCharts.has(name),
  );
  const lockedCharts = charts.filter(
    (name) => isBasic && !basicCharts.has(name),
  );

  return (
    <Card className="w-full py-0! overflow-hidden">
      <div className="p-6 text-primary-foreground bg-primary">
        <Flex className="flex-col gap-4 sm:flex-row items-center justify-between">
          <Column className="h-20 justify-center">
            <h2 className="text-2xl font-bold tracking-tight">
              {PlanDisplayName[plan?.planId as keyof typeof PlanDisplayName] ??
                plan?.planId}
            </h2>
            <p className="text-sm mt-1 text-primary-foreground/80">
              {plan?.description}
            </p>
          </Column>
          <div className="text-right shrink-0">
            <div className="text-3xl font-extrabold tracking-tight">
              R$ {plan?.price.toFixed(2).replace(".", ",")}{" "}
              <span className="text-xs text-primary-foreground/70">/mês</span>
            </div>
          </div>
        </Flex>
      </div>
      <Column className="p-6 gap-4 w-full">
        <Flex className="flex-col md:flex-row gap-4">
          <section className="w-full">
            <SectionHeader icon={Users} title="Usuários" />
            <p className="text-sm text-muted-foreground mb-3">
              {plan?.maxUsers} de {plan?.maxUsers} usuários utilizados
            </p>
            <Progress
              value={plan?.maxUsers ? (plan.maxUsers / plan.maxUsers) * 100 : 0}
              className="h-2 mb-4"
            />
            <div
              className={`grid grid-cols-1 ${is3xl && "grid-cols-3!"} gap-2.25`}
            >
              {plan?.users?.map((user) => (
                <Flex
                  key={user.email}
                  className={`items-center justify-center gap-2 p-2 ${is3xl ? "flex-col h-20 text-center" : "h-12.5"} rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors`}
                >
                  <Flex className="w-8 h-8 rounded-full items-center justify-center font-semibold bg-primary text-white text-xs shrink-0">
                    {user.username.charAt(0).toUpperCase()}
                  </Flex>
                  <span className="text-xs font-medium text-foreground truncate w-full">
                    {user.email}
                  </span>
                </Flex>
              ))}
            </div>
          </section>
          <Separator orientation={isMd ? "vertical" : "horizontal"} />
          <section className="w-full">
            <SectionHeader icon={Package} title="Produtos" />
            <p className="text-sm text-muted-foreground mb-3">
              {company?.productsQuantity} de {plan?.maxProducts} produtos
              cadastrados
            </p>
            <Progress
              value={
                plan?.maxProducts
                  ? ((company?.productsQuantity ?? 0) / plan.maxProducts) * 100
                  : 0
              }
              className="h-2 mb-4"
            />
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${is3xl && "grid-cols-4!"} gap-2`}
            >
              <ProducStatCard
                label="Produtos Cadastrados"
                value={summary?.registeredProducts ?? 0}
                color="text-primary"
              />
              <ProducStatCard
                label="Produtos Precificados"
                value={summary?.precifiedProducts ?? 0}
                color="text-secondary"
              />
              <ProducStatCard
                label="Produtos Ativos"
                value={summary?.activeProducts ?? 0}
                color="text-green-600"
              />
              <ProducStatCard
                label="Produtos Inativos"
                value={summary?.inactiveProducts ?? 0}
                color="text-destructive"
              />
            </div>
          </section>
        </Flex>
        <Separator />
        <section>
          <SectionHeader icon={BarChart3} title="Gráficos Disponíveis" />
          <div className="md:columns-2 gap-2">
            {availableCharts.map((chart) => (
              <Flex
                key={chart}
                className="break-inside-avoid mb-2 items-center gap-3 p-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-foreground transition-colors"
              >
                <CircleCheckBig className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{chart}</span>
              </Flex>
            ))}
            {lockedCharts.map((chart) => (
              <div
                key={chart}
                className="break-inside-avoid mb-2 flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 opacity-60"
              >
                <XCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground line-through">
                  {chart}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Column>
    </Card>
  );
};

export default ActivePlanCard;
