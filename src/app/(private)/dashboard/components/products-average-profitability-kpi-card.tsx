import KpiCard from "@/src/app/(private)/dashboard/components/kpi-card";
import { getProductsAverageProfitability } from "@/src/app/(private)/dashboard/services/get-products-average-profitability";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BadgePercent } from "lucide-react";

interface ProductsAverageProfitabilityKpiCardProps {
  filters?: ChartFiltersType;
  enabled?: boolean;
}

const ProductsAverageProfitabilityKpiCard = ({
  filters,
  enabled = true,
}: ProductsAverageProfitabilityKpiCardProps) => {
  const {
    data: averageProfitability,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard", "products-average-profitability", filters],
    queryFn: () =>
      getProductsAverageProfitability({
        filters,
      }),
    placeholderData: keepPreviousData,
    enabled,
  });

  return (
    <KpiCard
      title="Rentabilidade Média"
      icon={<BadgePercent className="text-muted-foreground h-4 w-4" />}
      value={averageProfitability ?? 0}
      type="percentage"
      pending={isPending}
      fetching={isFetching}
    />
  );
};

export default ProductsAverageProfitabilityKpiCard;
