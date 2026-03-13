"use client";

import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/custom-chart-tooltip";
import StackedBarChart from "@/src/app/(private)/dashboard/components/stacked-bar-chart";
import { getProductsPricesAndAcquisitionCosts } from "@/src/app/(private)/dashboard/services/get-products-prices-and-acquisition-costs";
import { ChartConfig } from "@/src/components/core/chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface ProductsPricesAndAcquisitionCostsChartProps {
  productIds: string[];
  enabled?: boolean;
}

const ProductsPricesAndAcquisitionCostsChart = ({
  productIds,
  enabled = true,
}: ProductsPricesAndAcquisitionCostsChartProps) => {
  const {
    data: products,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: [
      "dashboard",
      "products-prices-and-acquisition-costs",
      productIds,
    ],
    queryFn: () => getProductsPricesAndAcquisitionCosts({ productIds }),
    placeholderData: keepPreviousData,
    enabled,
  });

  const chartData = (products || []).map((product) => ({
    name: product.name,
    "Custo de Aquisição": product.acquisitionCost,
    "Preço de Venda": product.priceIn2026,
  }));

  const chartConfig: ChartConfig = {
    "Custo de Aquisição": {
      label: "Custo de Aquisição",
      color: "var(--chart-2)",
    },
    "Preço de Venda": {
      label: "Preço de Venda",
      color: "var(--chart-4)",
    },
  };

  const chartCardDescription =
    productIds?.length > 0
      ? "Mostrando dados para os produtos selecionados."
      : "Mostrando dados para os últimos 10 produtos precificados.";

  return (
    <ChartCard
      title="Preço de Venda X Custo de Aquisição"
      description={chartCardDescription}
      contentClassName="h-full w-full"
      pending={isPending}
      fetching={isFetching}
    >
      <StackedBarChart
        data={chartData}
        config={chartConfig}
        xAxisKey="name"
        barKeys={["Custo de Aquisição", "Preço de Venda"]}
        stackId="a"
        barRadius={8}
        className="h-72"
        pending={isPending}
        tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
      />
    </ChartCard>
  );
};

export default ProductsPricesAndAcquisitionCostsChart;
