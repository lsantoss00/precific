import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageNetProfit } from "@/src/app/(private)/dashboard/services/get-products-average-net-profit";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { HandCoins } from "lucide-react";

interface ProductsAverageNetProfitKpiCardProps {
  filters?: ChartFiltersType;
  enabled?: boolean;
}

const ProductsAverageNetProfitKpiCard = ({
  filters,
  enabled = true,
}: ProductsAverageNetProfitKpiCardProps) => {
  const {
    data: averageNetProfit,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "products-average-net-profit", filters],
    queryFn: () =>
      getProductsAverageNetProfit({
        filters,
      }),
    placeholderData: keepPreviousData,
    enabled,
  });

  return (
    <KpiCard
      title="Lucro Líquido Médio"
      icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
      value={averageNetProfit ?? 0}
      type="currency"
      pending={isPending}
      fetching={isFetching}
    />
  );
};

export default ProductsAverageNetProfitKpiCard;
