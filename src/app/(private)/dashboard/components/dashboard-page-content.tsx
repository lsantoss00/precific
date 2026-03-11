"use client";

import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import ProductsAverageAcquisitionCostKpiCard from "@/src/app/(private)/dashboard/components/products-average-acquisition-cost-kpi-card";
import ProductsAverageNetProfitKpiCard from "@/src/app/(private)/dashboard/components/products-average-net-profit-kpi-card";
import ProductsAveragePriceKpiCard from "@/src/app/(private)/dashboard/components/products-average-price-kpi-card";
import ProductsAverageProfitabilityKpiCard from "@/src/app/(private)/dashboard/components/products-average-profitability-kpi-card";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import PageTitle from "@/src/components/page-title";
import { useAuth } from "@/src/providers/auth-provider";
import { CircleX, LayoutDashboard } from "lucide-react";
import dynamic from "next/dynamic";
import {
  parseAsArrayOf,
  parseAsIsoDate,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useMemo } from "react";

const ProductsNetProfitRankingChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-net-profit-ranking-chart"),
  { ssr: false },
);

const ProductsMarkupRankingChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-markup-ranking-chart"),
  { ssr: false },
);

const ProductsFixedCostsRankingChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-fixed-costs-ranking-chart"),
  { ssr: false },
);

const ProductsShippingRankingChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-shipping-ranking-chart"),
  { ssr: false },
);

const ProductsPricesAndAcquisitionCostsChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-prices-and-acquisition-costs-chart"),
  {
    ssr: false,
  },
);

const ProductsPricesAndNetProfitsChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-prices-and-net-profits-chart"),
  {
    ssr: false,
  },
);

const ProductsPriceHistoryChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-price-history-chart"),
  {
    ssr: false,
  },
);

const ProductsNetProfitHistoryChart = dynamic(
  () =>
    import("@/src/app/(private)/dashboard/components/products-net-profit-history-chart"),
  {
    ssr: false,
  },
);

const DashboardPageContent = () => {
  const { company, isPremium } = useAuth();

  const [filters, setFilters] = useQueryStates(
    {
      dataInicial: parseAsIsoDate,
      dataFinal: parseAsIsoDate,
      produtos: parseAsArrayOf(parseAsString),
    },
    {
      shallow: false,
      history: "replace",
      clearOnDefault: true,
    },
  );

  const apiFilters = useMemo(() => {
    const from = filters.dataInicial
      ? new Date(filters.dataInicial)
      : undefined;
    const to = filters.dataFinal ? new Date(filters.dataFinal) : undefined;

    if (from) from.setHours(0, 0, 0, 0);
    if (to) to.setHours(23, 59, 59, 999);

    return {
      fromDate: from,
      toDate: to,
      productIds: filters.produtos ?? undefined,
    };
  }, [filters]);

  const handleFilterChange = (newFilters: ChartFiltersType) => {
    setFilters({
      dataInicial: newFilters.fromDate || null,
      dataFinal: newFilters.toDate || null,
      produtos: newFilters.productIds?.length ? newFilters.productIds : null,
    });
  };

  const companyHasProducts = company ? company.productsQuantity > 0 : null;

  return (
    <Column className="gap-4 relative flex-1">
      <PageTitle
        icon={<LayoutDashboard size={26} className="shrink-0" />}
        title="Dashboard"
      />
      <Show
        when={companyHasProducts}
        fallback={
          <Column className="grow items-center justify-center gap-4">
            <div className="relative">
              <LayoutDashboard size={64} />
              <CircleX
                size={32}
                className="absolute -right-3 -bottom-2 bg-red-400 text-white rounded-full"
              />
            </div>
            <Column className="text-center gap-2">
              <p className="text-lg md:text-xl">Seu dashboard está vazio...</p>
              <span className="text-sm md:text-base text-muted-foreground">
                Assim que você adicionar um produto, as informações vão aparecer
                aqui.
              </span>
            </Column>
          </Column>
        }
      >
        <Column className="gap-4">
          <DashboardFilters
            value={{
              fromDate: filters.dataInicial ?? undefined,
              toDate: filters.dataFinal ?? undefined,
              productIds: filters.produtos ?? undefined,
            }}
            onChange={handleFilterChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full gap-4">
            <ProductsAveragePriceKpiCard filters={apiFilters} />
            <ProductsAverageAcquisitionCostKpiCard filters={apiFilters} />
            <ProductsAverageNetProfitKpiCard filters={apiFilters} />
            <ProductsAverageProfitabilityKpiCard filters={apiFilters} />
          </div>

          <div className="grid grid-cols-8 gap-4 items-stretch">
            <div className="col-span-8 2xl:col-span-6 h-full">
              <ProductsNetProfitRankingChart filters={apiFilters} />
            </div>
            <div className="col-span-8 lg:col-span-4 2xl:col-span-2">
              <ProductsMarkupRankingChart filters={apiFilters} />
            </div>
            <div className="col-span-8 lg:col-span-4">
              <ProductsFixedCostsRankingChart filters={apiFilters} />
            </div>
            <div className="col-span-8 2xl:col-span-4">
              <ProductsShippingRankingChart filters={apiFilters} />
            </div>
            <div className="col-span-8">
              <ProductsPricesAndAcquisitionCostsChart
                productIds={apiFilters.productIds ?? []}
              />
            </div>
            <div className="col-span-8">
              <ProductsPricesAndNetProfitsChart
                productIds={apiFilters.productIds ?? []}
              />
            </div>
            <div className="col-span-8 lg:col-span-4">
              <ProductsPriceHistoryChart filters={apiFilters} />
            </div>
            <div className="col-span-8 lg:col-span-4">
              <ProductsNetProfitHistoryChart filters={apiFilters} />
            </div>
          </div>
        </Column>
      </Show>
    </Column>
  );
};

export default DashboardPageContent;
