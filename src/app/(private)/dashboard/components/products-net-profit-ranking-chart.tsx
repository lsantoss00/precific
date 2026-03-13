import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/custom-chart-tooltip";
import { getProductsNetProfit } from "@/src/app/(private)/dashboard/services/get-products-net-profit";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core/button";
import { ChartConfig } from "@/src/components/core/chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

interface ProductsNetProfitRankingChartProps {
  filters?: ChartFiltersType;
  enabled?: boolean;
}

const ProductsNetProfitRankingChart = ({
  filters,
  enabled = true,
}: ProductsNetProfitRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data: products,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "products-net-profit", sortDirection, filters],
    queryFn: () => getProductsNetProfit({ sortDirection, filters }),
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
      netProfit: product.netProfit,
      fill: `var(--chart-${colorIndex + 1})`,
    };
  });

  const chartConfig: ChartConfig = {
    netProfit: {
      label: "Lucro Líquido",
    },
  };

  const chartCardDescription = isAscending
    ? "Mostrando produtos com menor lucro líquido."
    : "Mostrando produtos com maior lucro líquido.";

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <ChartCard
      title="Ranking de Lucro Líquido"
      description={chartCardDescription}
      pending={isPending}
      fetching={isFetching}
      headerAction={
        <Button
          onClick={toggleSortDirection}
          variant="outline"
          className="w-8 h-8 relative"
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
        barKey="netProfit"
        layout="vertical"
        barRadius={8}
        className="h-72"
        tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        pending={isPending}
      />
    </ChartCard>
  );
};

export default ProductsNetProfitRankingChart;
