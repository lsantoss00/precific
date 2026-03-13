import ChartCard from "@/src/app/(private)/dashboard/components/chart-card";
import CustomChartTooltip from "@/src/app/(private)/dashboard/components/custom-chart-tooltip";
import EmptyProductFilterMessage from "@/src/app/(private)/dashboard/components/empty-product-filter-message";
import LineChart from "@/src/app/(private)/dashboard/components/line-chart";
import ProductsWithNoHistoryFilterMessage from "@/src/app/(private)/dashboard/components/products-with-no-history-filter-message";
import { getProductsNetProfitHistory } from "@/src/app/(private)/dashboard/services/get-products-net-profit-history";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { createChartConfig } from "@/src/app/(private)/dashboard/utils/create-chart-config";
import { normalizeLineChartData } from "@/src/app/(private)/dashboard/utils/normalize-line-chart-data";
import Show from "@/src/components/core/show";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface ProductsNetProfitHistoryChartProps {
  filters: ChartFiltersType;
  enabled?: boolean;
}

const ProductsNetProfitHistoryChart = ({
  filters,
  enabled = true,
}: ProductsNetProfitHistoryChartProps) => {
  const hasProductsSelected = Boolean(
    filters.productIds && filters.productIds.length > 0,
  );

  const {
    data: productsNetProfitHistory,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "products-net-profit-history", filters],
    queryFn: () =>
      getProductsNetProfitHistory({
        filters,
      }),
    enabled:
      enabled && Boolean(filters.productIds && filters.productIds.length > 0),
    placeholderData: keepPreviousData,
  });

  const data = (hasProductsSelected ? productsNetProfitHistory : []) || [];

  const productsWithHistory = data.filter(
    (product) => product.dailyHistory && product.dailyHistory.length > 1,
  );

  const noProductsHaveHistory =
    hasProductsSelected && productsWithHistory.length === 0;

  const chartData = normalizeLineChartData(data, "netProfit");
  const chartConfig = createChartConfig(data, {
    getId: (product) => product.productId,
    getLabel: (product) => product.productName,
  });

  return (
    <div className="relative">
      <ChartCard
        title="Histórico de Lucros Líquidos"
        description="Evolução dos lucros líquidos no período selecionado."
        contentClassName="h-full w-full"
        pending={isPending}
        fetching={isFetching}
      >
        <LineChart
          data={chartData}
          config={chartConfig}
          xAxisKey="date"
          lineType="monotone"
          strokeWidth={3}
          className="h-72"
          margin={{ top: 5, left: 32, right: 32, bottom: 5 }}
          pending={hasProductsSelected && isPending}
          tooltip={<CustomChartTooltip chartConfig={chartConfig} />}
        />
      </ChartCard>
      <Show when={!filters.productIds || filters.productIds.length === 0}>
        <EmptyProductFilterMessage />
      </Show>
      <Show when={hasProductsSelected && noProductsHaveHistory}>
        <ProductsWithNoHistoryFilterMessage
          products={filters.productIds?.length ?? 0}
        />
      </Show>
    </div>
  );
};
export default ProductsNetProfitHistoryChart;
