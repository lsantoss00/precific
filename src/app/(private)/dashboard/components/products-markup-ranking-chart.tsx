import BarChart from "@/src/app/(private)/dashboard/components/bar-chart";
import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/custom-chart-tooltip";
import { getProductsMarkup } from "@/src/app/(private)/dashboard/services/get-products-markup";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { Button } from "@/src/components/core/button";
import { ChartConfig } from "@/src/components/core/chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

interface ProductsMarkupRankingChartProps {
  filters?: ChartFiltersType;
}

const ProductsMarkupRankingChart = ({
  filters,
}: ProductsMarkupRankingChartProps) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data: products,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "products-markup", sortDirection, filters],
    queryFn: () => getProductsMarkup({ sortDirection, filters }),
    placeholderData: keepPreviousData,
  });

  const isAscending = sortDirection === "asc";

  const chartData = (products || []).map((product, index, currentArray) => {
    const colorIndex = isAscending
      ? (currentArray.length - 1 - index) % 10
      : index % 10;

    return {
      key: index,
      name: product.name,
      markup: product.markup,
      fill: `var(--chart-${colorIndex + 1})`,
    };
  });

  const chartConfig: ChartConfig = {
    markup: {
      label: "Markup (%)",
    },
  };

  const chartCardDescription = isAscending
    ? "Mostrando produtos com menor markup."
    : "Mostrando produtos com maior markup.";

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <ChartCard
      title="Ranking de Markup"
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
        barKey="markup"
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

export default ProductsMarkupRankingChart;
