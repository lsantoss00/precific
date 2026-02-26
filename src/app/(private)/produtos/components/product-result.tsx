"use client";

import { TaxRegimeType } from "@/src/app/(private)/perfil/types/company-type";
import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { difalCalc } from "@/src/app/(private)/produtos/utils/calcs/difal-calc";
import { icmsStCalc } from "@/src/app/(private)/produtos/utils/calcs/icms-st-calc";
import { markupCalc } from "@/src/app/(private)/produtos/utils/calcs/markup-calc";
import { presumedProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/presumed-profit-calc";
import { ProfitabilityCalc } from "@/src/app/(private)/produtos/utils/calcs/profitability-calc";
import { realProfitCalc } from "@/src/app/(private)/produtos/utils/calcs/real-profit-calc";
import { realProfitInverseCalc } from "@/src/app/(private)/produtos/utils/calcs/real-profit-inverse-calc";
import { simpleNationalCalc } from "@/src/app/(private)/produtos/utils/calcs/simple-national-calc";
import { suggestedProductPriceCalc } from "@/src/app/(private)/produtos/utils/calcs/suggested-product-price-calc";
import { getICMSRate } from "@/src/app/(private)/produtos/utils/icms-table";
import { getRevenueRangeDataPercentage } from "@/src/app/(private)/produtos/utils/revenue-range-data-percentage";
import { Button } from "@/src/components/core/button";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronLeft, CircleAlert, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { postProduct } from "../services/post-product";
import { updateProduct } from "../services/update-product";
import { ProductType } from "../types/product-type";
import { acquisitionCostCalc } from "../utils/calcs/acquisition-cost-calc";
import { ibsCbsCalc } from "../utils/calcs/ibs-cbs-calc";
import { percentageValueCalc } from "../utils/calcs/percentage-value-calc";
import { taxCalc } from "../utils/calcs/tax-calc";
import LoadingResultState from "./loading-result-state";
import MetricCard, { MetricCardProps } from "./metric-card";

const ProductResult = () => {
  const { company } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { form, isEditMode, productId } = useProductForm();
  const formData = form.watch();

  const unitPrice = formData?.unitPrice ?? 0;

  const hasEssentialData = unitPrice !== undefined && unitPrice > 0;

  if (!hasEssentialData) {
    const redirectPath =
      isEditMode && productId ? `/produtos/${productId}` : `/produtos/novo`;
    router.replace(redirectPath);

    return <Loader2 className="text-primary animate-spin m-auto w-12 h-12" />;
  }

  const { mutate: post, isPending: pendingPostProduct } = useMutation({
    mutationFn: postProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({ queryKey: ["product"] });
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      await queryClient?.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Produto adicionado com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      router.replace("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const { mutate: update, isPending: pendingUpdateProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: async () => {
      await queryClient?.invalidateQueries({
        queryKey: ["product", productId],
      });
      await queryClient?.invalidateQueries({ queryKey: ["products"] });
      await queryClient?.invalidateQueries({ queryKey: ["company"] });
      await queryClient?.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Produto atualizado com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      router.push("/produtos");
    },
    onError: (error) => {
      toast.error(error.message, {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const pending = pendingPostProduct || pendingUpdateProduct;

  const icmsStInputExists =
    formData?.icmsSt !== 0 && formData?.icmsSt !== undefined;
  const userProductPriceExists =
    formData?.userProductPrice !== 0 &&
    formData?.userProductPrice !== undefined;
  const companyRegime = company?.taxRegime;
  const isSimpleNational = company?.taxRegime === "simple_national";
  const business = company?.sector === "business";
  const hasIcmsSt = formData?.hasIcmsSt === true;
  const isInterstate = formData?.interstateSale === true;
  const isCostumerTaxPayer = formData?.costumerTaxpayer === true;
  const userAcquisitionCostValue = formData.unitPrice;

  const acquisitionCost = acquisitionCostCalc({
    unitPrice: unitPrice ?? 0,
    icms: formData.icms ?? 0,
    pisCofins: formData?.pisCofins ?? 0,
    icmsSt: formData.icmsSt ?? 0,
    ipi: formData.ipi ?? 0,
    others: formData.others ?? 0,
  });

  const percentSum =
    ((formData.fixedCosts ?? 0) +
      (formData.shipping ?? 0) +
      (formData.otherCosts ?? 0)) /
    100;

  // const markupBase = acquisitionCost + acquisitionCost * percentSum;

  const markup = markupCalc({
    fixedCosts: formData?.fixedCosts ?? 0,
    othersCosts: formData?.otherCosts ?? 0,
    profit: formData?.profit ?? 0,
    salesIcms: formData?.salesIcms ?? 0,
    salesPisCofins: formData?.salesPisCofins ?? 0,
    shipping: formData?.shipping ?? 0,
    range: company?.revenueRange,
    business,
    isSimpleNational,
  });

  const suggestedProductPrice = suggestedProductPriceCalc({
    acquisitionCost,
    markup,
  });

  const taxes = taxCalc({
    suggestedProductPrice: suggestedProductPrice,
    salesIcms: formData?.salesIcms ?? 0,
    salesPisCofins: formData?.salesPisCofins ?? 0,
  });

  const salesIcmsValue = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: formData?.salesIcms,
  });

  const salesPisCofinsValue = percentageValueCalc({
    base: suggestedProductPrice - salesIcmsValue,
    percentage: formData?.salesPisCofins,
  });

  const suggestedProductPriceIbsCbsBase =
    suggestedProductPrice - salesIcmsValue - salesPisCofinsValue;

  const ibs = ibsCbsCalc({
    base: suggestedProductPriceIbsCbsBase,
  }).ibs;

  const cbs = ibsCbsCalc({
    base: suggestedProductPriceIbsCbsBase,
  }).cbs;

  const icmsSt = icmsStCalc({
    mva: formData?.mva ?? 0,
    suggestedProductPrice,
    salesIcmsInput: formData?.salesIcms,
    stateDestination: formData?.stateDestination,
    isInterstate,
  });

  const fixedCosts = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: formData?.fixedCosts ?? 0,
  });

  const othersCosts = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: formData?.otherCosts ?? 0,
  });

  const shipping = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: formData?.shipping ?? 0,
  });

  const icmsValue = percentageValueCalc({
    base: unitPrice ?? 0,
    percentage: formData?.icms ?? 0,
  });

  const pisCofinsBase = unitPrice - icmsValue;
  const pisCofinsValue = percentageValueCalc({
    base: pisCofinsBase,
    percentage: formData?.pisCofins ?? 0,
  });

  const conditionalIcmsSt = icmsStInputExists && hasIcmsSt ? 0 : icmsSt;

  // IRPJ + CSLL LUCRO PRESUMIDO =======================
  const calcBaseIrpj = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: 8,
  });

  const calcBaseCsll = percentageValueCalc({
    base: suggestedProductPrice,
    percentage: 12,
  });

  const irpj = calcBaseIrpj < 0 ? 0 : calcBaseIrpj * formData?.irpjPercent;
  const csll = calcBaseCsll < 0 ? 0 : calcBaseCsll * 0.09;

  const presumedProfitIrpjCsll = irpj + csll;

  const companyState = company?.state;
  const stateDestination = formData?.stateDestination;
  const isImportedProduct = formData?.importedProduct === true;

  const internalTaxRate = companyState
    ? getICMSRate(stateDestination!, stateDestination!)
    : 0;

  const interstateTaxRate = stateDestination
    ? getICMSRate(companyState!, stateDestination)
    : 0;

  const difal = difalCalc({
    suggestedProductPrice,
    internalTaxRate,
    interstateTaxRate: isImportedProduct ? 4 : interstateTaxRate,
  });

  const conditionalDifal = isCostumerTaxPayer ? difal : 0;

  // IRPJ + CSLL LUCRO REAL =======================
  const baseIrpjCsll =
    suggestedProductPrice -
    unitPrice -
    fixedCosts -
    salesIcmsValue -
    salesPisCofinsValue -
    shipping -
    othersCosts -
    conditionalIcmsSt -
    conditionalDifal;

  const realProfitIrpjCsllCalc =
    baseIrpjCsll < 0
      ? 0
      : percentageValueCalc({
          base: baseIrpjCsll,
          percentage: formData?.irpjPercent,
        });

  const netProfit = (() => {
    const baseCalcParams = {
      suggestedProductPrice,
      acquisitionCost: userAcquisitionCostValue,
      icms: icmsValue,
      pisCofins: pisCofinsValue,
      fixedCosts,
      salesIcms: salesIcmsValue,
      salesPisCofins: salesPisCofinsValue,
      shipping: shipping,
      othersCosts,
    };

    const revenueRangeData = getRevenueRangeDataPercentage({ business });
    const revenueRangeKey = (company?.revenueRange ??
      "range_1") as keyof typeof revenueRangeData;

    const das = percentageValueCalc({
      base: suggestedProductPrice ?? 0,
      percentage: revenueRangeData[revenueRangeKey],
    });

    if (companyRegime === "presumed_profit") {
      return presumedProfitCalc({
        ...baseCalcParams,
        irpjCsll: presumedProfitIrpjCsll,
      });
    }

    if (
      companyRegime === "simple_national" &&
      company?.revenueRange &&
      company?.sector
    ) {
      return simpleNationalCalc({
        ...baseCalcParams,
        range: company.revenueRange,
        das,
      });
    }
    return realProfitCalc({
      ...baseCalcParams,
      irpjCsll: realProfitIrpjCsllCalc,
    });
  })();

  const suggestedProductPriceWithDifal = difalCalc({
    suggestedProductPrice,
    internalTaxRate,
    interstateTaxRate: isImportedProduct ? 4 : interstateTaxRate,
  });

  const finalSalePrice = !isCostumerTaxPayer
    ? suggestedProductPrice + conditionalIcmsSt
    : suggestedProductPrice + suggestedProductPriceWithDifal;

  const revenueRangeData = getRevenueRangeDataPercentage({ business });

  const revenueRangeKey = (company?.revenueRange ??
    "range_1") as keyof typeof revenueRangeData;

  const das = percentageValueCalc({
    base: suggestedProductPrice ?? 0,
    percentage: revenueRangeData[revenueRangeKey],
  });

  const profitability = ProfitabilityCalc({
    netProfit,
    suggestedProductPrice,
  });

  const inverseTaxRegimeCalculators = {
    real_profit: () => {
      const realProfitInverse = realProfitInverseCalc({
        userProductPrice: formData?.userProductPrice!,
        fixedCosts: formData?.fixedCosts ?? 0,
        othersCosts: formData?.otherCosts ?? 0,
        salesIcms: formData?.salesIcms ?? 0,
        salesPisCofins: formData?.salesPisCofins ?? 0,
        shipping: formData?.shipping ?? 0,
      });

      const realProfitInverseIcmsSt = icmsStCalc({
        mva: formData?.mva ?? 0,
        suggestedProductPrice: formData.userProductPrice!,
        salesIcmsInput: formData?.salesIcms,
        stateDestination: formData?.stateDestination,
        isInterstate,
      });

      const userProductPriceFixedCosts = percentageValueCalc({
        base: formData.userProductPrice!,
        percentage: formData?.fixedCosts ?? 0,
      });

      const userProductPriceOthersCosts = percentageValueCalc({
        base: formData.userProductPrice!,
        percentage: formData?.otherCosts ?? 0,
      });

      const userProductPriceShipping = percentageValueCalc({
        base: formData?.userProductPrice!,
        percentage: formData?.shipping ?? 0,
      });

      const userProductPriceSalesIcms = percentageValueCalc({
        base: formData?.userProductPrice!,
        percentage: formData?.salesIcms ?? 0,
      });

      const userProductPriceSalesPisCofins = percentageValueCalc({
        base: (formData?.userProductPrice ?? 0) - userProductPriceSalesIcms,
        percentage: formData?.salesPisCofins ?? 0,
      });

      const baseInverseIrpjCsll =
        formData?.userProductPrice! -
        unitPrice -
        userProductPriceFixedCosts -
        userProductPriceSalesIcms -
        userProductPriceSalesPisCofins -
        userProductPriceShipping -
        userProductPriceOthersCosts -
        conditionalIcmsSt;

      const realProfitInverseIrpjCsllCalc =
        baseInverseIrpjCsll < 0
          ? 0
          : percentageValueCalc({
              base: baseInverseIrpjCsll,
              percentage: formData?.irpjPercent,
            });

      const userRealNetProfit = realProfitCalc({
        suggestedProductPrice: formData.userProductPrice ?? 0,
        acquisitionCost: userAcquisitionCostValue,
        icms: icmsValue,
        pisCofins: pisCofinsValue,
        fixedCosts: userProductPriceFixedCosts,
        salesIcms: userProductPriceSalesIcms,
        salesPisCofins: userProductPriceSalesPisCofins,
        shipping: userProductPriceShipping,
        othersCosts: userProductPriceOthersCosts,
        irpjCsll: realProfitInverseIrpjCsllCalc,
      });

      const inverseProfitability = ProfitabilityCalc({
        netProfit: userRealNetProfit,
        suggestedProductPrice: formData?.userProductPrice ?? 0,
      });

      const userFinalSalePrice =
        (formData?.userProductPrice ?? 0) + realProfitInverseIcmsSt;

      const inverseTaxes = taxCalc({
        suggestedProductPrice: formData?.userProductPrice ?? 0,
        salesIcms: formData?.salesIcms ?? 0,
        salesPisCofins: formData?.salesPisCofins ?? 0,
      });

      const userProductPriceIbsCbsBase =
        (formData?.userProductPrice ?? 0) -
        userProductPriceSalesIcms -
        userProductPriceSalesPisCofins;

      const userProductIbs = ibsCbsCalc({
        base: userProductPriceIbsCbsBase,
      }).ibs;

      const userProductCbs = ibsCbsCalc({
        base: userProductPriceIbsCbsBase,
      }).cbs;

      return {
        realProfitInverse,
        realProfitInverseIcmsSt,
        realProfitInverseIrpjCsllCalc,
        userRealNetProfit,
        inverseProfitability,
        userFinalSalePrice,
        inverseTaxes,
        userProductPriceIbsCbsBase,
        userProductIbs,
        userProductCbs,
      };
    },
    presumed_profit: () => {
      const realProfitInverse = realProfitInverseCalc({
        userProductPrice: formData?.userProductPrice!,
        fixedCosts: formData?.fixedCosts ?? 0,
        othersCosts: formData?.otherCosts ?? 0,
        salesIcms: formData?.salesIcms ?? 0,
        salesPisCofins: formData?.salesPisCofins ?? 0,
        shipping: formData?.shipping ?? 0,
      });

      const realProfitInverseIcmsSt = icmsStCalc({
        mva: formData?.mva ?? 0,
        suggestedProductPrice: formData.userProductPrice!,
        salesIcmsInput: formData?.salesIcms,
        stateDestination: formData?.stateDestination,
        isInterstate,
      });

      const userProductPriceFixedCosts = percentageValueCalc({
        base: formData.userProductPrice!,
        percentage: formData?.fixedCosts ?? 0,
      });

      const userProductPriceOthersCosts = percentageValueCalc({
        base: formData.userProductPrice!,
        percentage: formData?.otherCosts ?? 0,
      });

      const userProductPriceShipping = percentageValueCalc({
        base: formData?.userProductPrice!,
        percentage: formData?.shipping ?? 0,
      });

      const userProductPriceSalesIcms = percentageValueCalc({
        base: formData?.userProductPrice!,
        percentage: formData?.salesIcms ?? 0,
      });

      const userProductPriceSalesPisCofins = percentageValueCalc({
        base: (formData?.userProductPrice ?? 0) - userProductPriceSalesIcms,
        percentage: formData?.salesPisCofins ?? 0,
      });

      const calcBaseIrpj = percentageValueCalc({
        base: realProfitInverse,
        percentage: 8,
      });

      const calcBaseCsll = percentageValueCalc({
        base: realProfitInverse,
        percentage: 12,
      });

      const irpj = calcBaseIrpj < 0 ? 0 : calcBaseIrpj * formData?.irpjPercent;
      const csll = calcBaseCsll < 0 ? 0 : calcBaseCsll * 0.09;

      const presumedProfitIrpjCsll = irpj + csll;

      const userPresumedNetProfit = presumedProfitCalc({
        suggestedProductPrice: formData.userProductPrice ?? 0,
        acquisitionCost: userAcquisitionCostValue,
        icms: icmsValue,
        pisCofins: pisCofinsValue,
        fixedCosts: userProductPriceFixedCosts,
        salesIcms: userProductPriceSalesIcms,
        salesPisCofins: userProductPriceSalesPisCofins,
        shipping: userProductPriceShipping,
        othersCosts: userProductPriceOthersCosts,
        irpjCsll: presumedProfitIrpjCsll,
      });

      const inverseProfitability = ProfitabilityCalc({
        netProfit: userPresumedNetProfit,
        suggestedProductPrice: formData?.userProductPrice ?? 0,
      });

      const userFinalSalePrice =
        (formData?.userProductPrice ?? 0) + realProfitInverseIcmsSt;

      const inverseTaxes = taxCalc({
        suggestedProductPrice: formData?.userProductPrice ?? 0,
        salesIcms: formData?.salesIcms ?? 0,
        salesPisCofins: formData?.salesPisCofins ?? 0,
      });

      const userProductPriceIbsCbsBase =
        (formData?.userProductPrice ?? 0) -
        userProductPriceSalesIcms -
        userProductPriceSalesPisCofins;

      const userProductIbs = ibsCbsCalc({
        base: userProductPriceIbsCbsBase,
      }).ibs;

      const userProductCbs = ibsCbsCalc({
        base: userProductPriceIbsCbsBase,
      }).cbs;

      return {
        realProfitInverse,
        realProfitInverseIcmsSt,
        realProfitInverseIrpjCsllCalc: presumedProfitIrpjCsll,
        userRealNetProfit: userPresumedNetProfit,
        inverseProfitability,
        userFinalSalePrice,
        inverseTaxes,
        userProductPriceIbsCbsBase,
        userProductIbs,
        userProductCbs,
      };
    },
    simple_national: () => undefined,
  };

  const inverseCalculations = (() => {
    if (!userProductPriceExists) {
      return {
        realProfitInverse: undefined,
        realProfitInverseIcmsSt: undefined,
        realProfitInverseIrpjCsllCalc: undefined,
        userRealNetProfit: undefined,
        inverseProfitability: undefined,
        userFinalSalePrice: undefined,
        inverseTaxes: undefined,
        userProductPriceIbsCbsBase: undefined,
        userProductIbs: undefined,
        userProductCbs: undefined,
      };
    }

    return inverseTaxRegimeCalculators[companyRegime as TaxRegimeType]();
  })();

  const irpjCsll =
    companyRegime === "presumed_profit"
      ? presumedProfitIrpjCsll
      : companyRegime === "real_profit"
        ? realProfitIrpjCsllCalc
        : 0;

  const metrics2025: (MetricCardProps & {
    gridSpan?: string;
    condition?: boolean;
  })[] = [
    {
      title: "Valor de aquisição",
      value: acquisitionCost || 0,
    },
    {
      title: "Outros custos",
      value: suggestedProductPrice * ((formData?.otherCosts ?? 0) / 100),
      secondValue:
        (formData?.userProductPrice ?? 0) * ((formData?.otherCosts ?? 0) / 100),
    },
    {
      title: "Custos fixos",
      value: suggestedProductPrice * ((formData?.fixedCosts ?? 0) / 100),
      secondValue:
        (formData?.userProductPrice ?? 0) * ((formData?.fixedCosts ?? 0) / 100),
    },
    {
      title: "Frete",
      value: suggestedProductPrice * ((formData?.shipping ?? 0) / 100),
      secondValue:
        (formData?.userProductPrice ?? 0) * ((formData?.shipping ?? 0) / 100),
    },
    {
      title: "ICMS + PIS/COFINS",
      value: taxes,
      secondValue: inverseCalculations?.inverseTaxes,
    },
    {
      title: "ICMS ST",
      value: icmsSt,
      secondValue: inverseCalculations?.realProfitInverseIcmsSt,
    },
    {
      title: "DAS",
      value: das,
      variant: "neutral" as const,
      condition: isSimpleNational,
    },
    {
      title: "IRPJ + CSLL",
      value: irpjCsll,
      secondValue: inverseCalculations?.realProfitInverseIrpjCsllCalc,
      condition: !isSimpleNational,
    },
    {
      title: "Markup",
      value: markup,
      type: "percentage" as const,
    },
    {
      title: "Rentabilidade",
      value: profitability,
      secondValue: inverseCalculations?.inverseProfitability,
      type: "percentage" as const,
    },
    {
      title: "Lucro líquido",
      value: netProfit,
      secondValue: inverseCalculations?.userRealNetProfit,
      gridSpan: "col-span-1",
    },
    {
      title: "Preço de venda final",
      value: finalSalePrice,
      secondValue: inverseCalculations?.userFinalSalePrice,
      variant: "success" as const,
      gridSpan: "col-span-1 md:col-span-2",
    },
  ];

  const metrics2026: (MetricCardProps & {
    gridSpan?: string;
    condition?: boolean;
  })[] = [
    {
      title: "Base de cálculo IBS/CBS",
      value: suggestedProductPriceIbsCbsBase,
      secondValue: inverseCalculations?.userProductPriceIbsCbsBase,
      gridSpan: "col-span-1 md:col-span-2",
    },
    {
      title: "IBS (0.1%)",
      value: ibs,
      secondValue: inverseCalculations?.userProductIbs,
    },
    {
      title: "CBS (0.9%)",
      value: cbs,
      secondValue: inverseCalculations?.userProductCbs,
    },
    {
      title: "Preço de venda final",
      value: finalSalePrice,
      secondValue: inverseCalculations?.userFinalSalePrice,
      variant: "success" as const,
      gridSpan: "col-span-1 md:col-span-2 row-6",
    },
  ];

  const handleFinishForm = () => {
    const productPayload: ProductType = {
      ...formData,
      status: "ACTIVE",
      priceToday: inverseCalculations?.userFinalSalePrice ?? 0,
      priceIn2026: finalSalePrice,
      markup,
      netProfit,
      acquisitionCost,
      profitability,
      taxes,
      das,
      irpjCsll,
      ibsCbsBase: suggestedProductPriceIbsCbsBase,
      ibs,
      cbs,
    };

    if (isEditMode && productId) {
      return update({
        product: {
          id: productId,
          ...productPayload,
        },
      });
    }

    return post({ product: productPayload });
  };

  const backPath =
    isEditMode && productId ? `/produtos/${productId}` : `/produtos/novo`;

  return (
    <Show
      when={!isLoading}
      fallback={
        <Card className="flex-1 w-full h-full p-6 rounded-md">
          <LoadingResultState onComplete={() => setIsLoading(false)} />
        </Card>
      }
    >
      <Column className="h-full gap-4">
        <Flex className="flex-col lg:flex-row w-full flex-1 gap-4">
          <Button
            asChild
            className="hidden lg:flex h-full w-20"
            disabled={isLoading || pendingPostProduct}
          >
            <Link href={backPath}>
              <ChevronLeft className="w-12! h-12!" />
            </Link>
          </Button>
          <Card className="flex-1 w-full p-6 rounded-md flex flex-col">
            <Column className="space-y-4 w-full flex-1">
              <h3 className="text-lg">
                Pré-Reforma Tributária <strong>2025</strong>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full auto-rows-fr gap-4">
                {metrics2025
                  .filter(
                    (metric) =>
                      metric.condition === undefined || metric.condition,
                  )
                  .map((metric, index) => (
                    <div
                      key={`metric-2025-${index}`}
                      className={metric.gridSpan}
                    >
                      <MetricCard
                        title={metric.title}
                        value={metric.value}
                        secondValue={metric.secondValue}
                        variant={metric.variant}
                        type={metric.type}
                      />
                    </div>
                  ))}
              </div>
            </Column>
          </Card>
          <Card className="flex-1 w-full p-6 rounded-md flex flex-col">
            <Column className="space-y-4 flex-1">
              <Row className="gap-1 items-center">
                <h3 className="text-lg">
                  Transição Reforma Tributária <strong>2026</strong>
                </h3>
                <CustomTooltip
                  icon={<CircleAlert className="w-4 h-4" />}
                  message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
                />
              </Row>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-5! gap-4">
                {metrics2026.map((metric, index) => (
                  <div
                    key={`metric-2026-${index}`}
                    className={`${inverseCalculations && "h-30"}${metric.gridSpan}`}
                  >
                    <MetricCard
                      title={metric.title}
                      value={metric.value}
                      secondValue={metric.secondValue}
                      variant={metric.variant}
                      type={metric.type}
                    />
                  </div>
                ))}
              </div>
            </Column>
          </Card>
        </Flex>
        <Row className="gap-2 md:w-fit md:self-end">
          <Button
            asChild
            className="lg:hidden h-full"
            variant="outline"
            disabled={isLoading || pendingPostProduct}
          >
            <Link href={backPath}>
              <ChevronLeft className="w-6 h-6" />
            </Link>
          </Button>
          <Button
            className="flex-1 md:flex-none md:w-40 h-12 flex items-center disabled:bg-primary/90 disabled:text-white"
            onClick={handleFinishForm}
            disabled={pending}
          >
            <Show when={pending} fallback={<Check />}>
              <Loader2 className="animate-spin" />
            </Show>
            Finalizar
          </Button>
        </Row>
      </Column>
    </Show>
  );
};

export default ProductResult;
