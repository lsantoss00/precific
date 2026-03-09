"use client";

import ProducStatCard from "@/src/app/(private)/planos/components/product-stat-card";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import { Progress } from "@/src/components/core/progress";
import Row from "@/src/components/core/row";
import { Separator } from "@/src/components/core/separator";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import {
  BarChart3,
  CircleCheckBig,
  Package,
  Users,
  XCircle,
} from "lucide-react";

const planData = {
  name: "Plano Customizado",
  description:
    "Solução flexível para empresas que precisam de regras e recursos sob medida dedicados.",
  price: 799.99,
  users: {
    max: 5,
    current: [
      { email: "carlos@empresa.com" },
      { email: "maria@empresa.com" },
      { email: "joao@empresa.com" },
    ],
  },
  products: {
    total: 1000,
    maxAllowed: 1000,
    priced: 500,
    active: 250,
    inactive: 250,
  },
  charts: [
    { name: "Preço Médio de Venda", available: true },
    { name: "Custo Médio", available: true },
    { name: "Lucro Líquido Médio", available: true },
    { name: "Rentabilidade Média", available: true },
    { name: "Ranking de Lucro Líquido", available: true },
    { name: "Ranking de Markup", available: true },
    { name: "Ranking de Custo Fixo", available: true },
    { name: "Ranking de Frete", available: true },
    { name: "Preço de Venda X Custo de Aquisição", available: true },
    { name: "Preço de Venda X Lucro Líquido", available: true },
    { name: "Histórico de Preços", available: true },
    { name: "Histórico de Lucros Líquidos", available: true },
  ],
};

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
  const isMd = useMediaQuery(`(min-width: 768px)`);
  const is3xl = useMediaQuery(`(min-width: 1800px)`);

  const { name, description, price, users, products, charts } = planData;
  const availableCharts = charts.filter((c) => c.available);
  const lockedCharts = charts.filter((c) => !c.available);

  return (
    <Card className="w-full py-0! overflow-hidden">
      <div className="p-6 text-primary-foreground bg-primary">
        <Flex className="flex-col gap-4 sm:flex-row items-center justify-between">
          <Column className="h-20 justify-center">
            <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
            <p className="text-sm mt-1 text-primary-foreground/80">
              {description}
            </p>
          </Column>
          <div className="text-right shrink-0">
            <div className="text-3xl font-extrabold tracking-tight">
              R$ {price.toFixed(2).replace(".", ",")}{" "}
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
              {users.current.length} de {users.max} usuários utilizados
            </p>
            <Progress
              value={(users.current.length / users.max) * 100}
              className="h-2 mb-4"
            />
            <div
              className={`grid grid-cols-1 ${is3xl && "grid-cols-3!"} gap-2.25`}
            >
              {users.current.map((user) => (
                <Flex
                  key={user.email}
                  className={`items-center justify-center gap-2 p-2 ${is3xl ? "flex-col h-20 text-center" : "h-12.5"} rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors`}
                >
                  <Flex className="w-8 h-8 rounded-full items-center justify-center font-semibold bg-primary text-white text-xs shrink-0">
                    FE
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
              {products.total} de {products.maxAllowed} produtos cadastrados
            </p>
            <Progress
              value={(products.total / products.maxAllowed) * 100}
              className="h-2 mb-4"
            />
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${is3xl && "grid-cols-4!"} gap-2`}
            >
              <ProducStatCard
                label="Produtos Cadastrados"
                value={products.total}
                color="text-primary"
              />
              <ProducStatCard
                label="Produtos Precificados"
                value={products.priced}
                color="text-secondary"
              />
              <ProducStatCard
                label="Produtos Ativos"
                value={products.active}
                color="text-green-600"
              />
              <ProducStatCard
                label="Produtos Inativos"
                value={products.inactive}
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
                key={chart.name}
                className="break-inside-avoid mb-2 items-center gap-3 p-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-foreground transition-colors"
              >
                <CircleCheckBig className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{chart.name}</span>
              </Flex>
            ))}
            {lockedCharts.map((chart) => (
              <div
                key={chart.name}
                className="break-inside-avoid mb-2 flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 opacity-60"
              >
                <XCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground line-through">
                  {chart.name}
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
