"use client";

import DashboardFilters from "@/src/app/(private)/dashboard/components/dashboard-filters";
import ProductsAverageAcquisitionCostKpiCard from "@/src/app/(private)/dashboard/components/products-average-acquisition-cost-kpi-card";
import ProductsAverageNetProfitKpiCard from "@/src/app/(private)/dashboard/components/products-average-net-profit-kpi-card";
import ProductsAveragePriceKpiCard from "@/src/app/(private)/dashboard/components/products-average-price-kpi-card";
import ProductsAverageProfitabilityKpiCard from "@/src/app/(private)/dashboard/components/products-average-profitability-kpi-card";
import { ChartFiltersType } from "@/src/app/(private)/dashboard/types/chart-filters-type";
import Column from "@/src/components/core/column";
import Show from "@/src/components/core/show";
import PremiumFeatureWrapper from "@/src/components/premium-feature-wrapper";
import { ChartName, isChartAvailable } from "@/src/constants/dashboard-charts";
import PageTitle from "@/src/components/page-title";
import { useAuth } from "@/src/providers/auth-provider";
import { CircleX, LayoutDashboard } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  parseAsArrayOf,
  parseAsIsoDate,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { useEffect, useMemo } from "react";

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
  const { company, plan } = useAuth();
  const router = useRouter();

  const isFreePlan = plan?.planId === "free";

  const isPremium = (chartName: ChartName) =>
    !isChartAvailable(chartName, plan?.planId);

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

  useEffect(() => {
    if (isFreePlan) {
      router.replace("/produtos");
    }
  }, [isFreePlan, router]);

  if (isFreePlan) return null;

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
            <PremiumFeatureWrapper isPremium={isPremium("Preço Médio de Venda")}>
              <ProductsAveragePriceKpiCard filters={apiFilters} enabled={!isPremium("Preço Médio de Venda")} />
            </PremiumFeatureWrapper>
            <PremiumFeatureWrapper isPremium={isPremium("Custo Médio")}>
              <ProductsAverageAcquisitionCostKpiCard filters={apiFilters} enabled={!isPremium("Custo Médio")} />
            </PremiumFeatureWrapper>
            <PremiumFeatureWrapper isPremium={isPremium("Lucro Líquido Médio")}>
              <ProductsAverageNetProfitKpiCard filters={apiFilters} enabled={!isPremium("Lucro Líquido Médio")} />
            </PremiumFeatureWrapper>
            <PremiumFeatureWrapper isPremium={isPremium("Rentabilidade Média")}>
              <ProductsAverageProfitabilityKpiCard filters={apiFilters} enabled={!isPremium("Rentabilidade Média")} />
            </PremiumFeatureWrapper>
          </div>

          <div className="grid grid-cols-8 gap-4 items-stretch">
            <div className="col-span-8 2xl:col-span-6 h-full">
              <PremiumFeatureWrapper isPremium={isPremium("Ranking de Lucro Líquido")}>
                <ProductsNetProfitRankingChart filters={apiFilters} enabled={!isPremium("Ranking de Lucro Líquido")} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4 2xl:col-span-2">
              <PremiumFeatureWrapper isPremium={isPremium("Ranking de Markup")}>
                <ProductsMarkupRankingChart filters={apiFilters} enabled={!isPremium("Ranking de Markup")} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <PremiumFeatureWrapper isPremium={isPremium("Ranking de Custo Fixo")}>
                <ProductsFixedCostsRankingChart filters={apiFilters} enabled={!isPremium("Ranking de Custo Fixo")} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 2xl:col-span-4">
              <PremiumFeatureWrapper isPremium={isPremium("Ranking de Frete")}>
                <ProductsShippingRankingChart filters={apiFilters} enabled={!isPremium("Ranking de Frete")} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8">
              <PremiumFeatureWrapper isPremium={isPremium("Preço de Venda X Custo de Aquisição")}>
                <ProductsPricesAndAcquisitionCostsChart
                  productIds={apiFilters.productIds ?? []}
                  enabled={!isPremium("Preço de Venda X Custo de Aquisição")}
                />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8">
              <PremiumFeatureWrapper isPremium={isPremium("Preço de Venda X Lucro Líquido")}>
                <ProductsPricesAndNetProfitsChart
                  productIds={apiFilters.productIds ?? []}
                  enabled={!isPremium("Preço de Venda X Lucro Líquido")}
                />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <PremiumFeatureWrapper isPremium={isPremium("Histórico de Preços")}>
                <ProductsPriceHistoryChart filters={apiFilters} enabled={!isPremium("Histórico de Preços")} />
              </PremiumFeatureWrapper>
            </div>
            <div className="col-span-8 lg:col-span-4">
              <PremiumFeatureWrapper isPremium={isPremium("Histórico de Lucros Líquidos")}>
                <ProductsNetProfitHistoryChart filters={apiFilters} enabled={!isPremium("Histórico de Lucros Líquidos")} />
              </PremiumFeatureWrapper>
            </div>
          </div>
        </Column>
      </Show>
    </Column>
  );
};

export default DashboardPageContent;
