import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/custom-chart-tooltip";
import { getProductsFixedCosts } from "@/src/app/(private)/dashboard/services/get-products-fixed-costs";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core/button";
import { ChartConfig } from "@/src/components/core/chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

interface ProductsFixedCostsRankingChartProps {
  filters?: ChartFiltersType;
  enabled?: boolean;
}

const ProductsFixedCostsRankingChart = ({
  filters,
  enabled = true,
}: ProductsFixedCostsRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data: products,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "products-fixed-costs", sortDirection, filters],
    queryFn: () => getProductsFixedCosts({ sortDirection, filters }),
    placeholderData: keepPreviousData,
    enabled,
  });

  const isAscending = sortDirection === "asc";

  const chartData = (products || []).map((product, index, currentArray) => {
    const colorIndex = isAscending
      ? (currentArray.length - 1 - index) % 10
      : index % 10;

    return {
      key: index,
      name: product.name,
      fixedCosts: product.fixedCosts,
      fill: `var(--chart-${colorIndex + 1})`,
    };
  });
  const chartConfig: ChartConfig = {
    fixedCosts: {
      label: "Custo Fixo (%)",
    },
  };

  const chartCardDescription = isAscending
    ? "Mostrando produtos menos sensíveis a custo fixo."
    : "Mostrando produtos mais sensíveis a custo fixo.";

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <ChartCard
      title="Ranking de Custo Fixo"
      description={chartCardDescription}
      pending={isPending}
      fetching={isFetching}
      headerAction={
        <Button
          onClick={toggleSortDirection}
          variant="outline"
          className="w-8 h-8 relative 2xl:ml-8"
          disabled={isPending || isFetching}
        >
          <ArrowDownUp className={`${isAscending && "text-primary"}`} />
        </Button>
      }
    >
      <BarChart
        data={chartData}
        config={chartConfig}
        yAxisKey="name"
        barKey="fixedCosts"
        layout="horizontal"
        barRadius={8}
        className="h-72 lg:aspect-square"
        pending={isPending}
        tooltip={
          <CustomChartTooltip chartConfig={chartConfig} type="percentage" />
        }
      />
    </ChartCard>
  );
};

export default ProductsFixedCostsRankingChart;
