"use client";

import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { Button } from "@/src/components/core/button";
import Flex from "@/src/components/core/flex";
import Row from "@/src/components/core/row";
import { useAuth } from "@/src/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { Calculator, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { getProductById } from "../services/get-product-by-id";
import { ProductResponseType } from "../types/product-type";
import AcquisitionCostForm from "./acquisition-cost-form";
import PricingForm from "./pricing-form";
import ProductDetailsForm from "./product-details-form";

interface ProductFormProps {
  productId?: ProductResponseType["id"];
}

const ProductForm = ({ productId }: ProductFormProps) => {
  const { isLoadingAuth } = useAuth();
  const { form, isEditMode } = useProductForm();

  const { data: product } = useQuery({
    queryFn: () => getProductById({ productId: productId! }),
    queryKey: ["product", productId],
    enabled: !!productId && isEditMode,
  });

  useEffect(() => {
    if (product && isEditMode) {
      form.reset({
        name: product.name,
        sku: product.sku,
        ncm: product.ncm,
        observations: product.observations,
        unitPrice: product.unitPrice,
        icms: product.icms,
        pisCofins: product.pisCofins,
        icmsSt: product.icmsSt,
        ipi: product.ipi,
        others: product.others,
        fixedCosts: product.fixedCosts,
        salesIcms: product.salesIcms,
        salesPisCofins: product.salesPisCofins,
        shipping: product.shipping,
        otherCosts: product.otherCosts,
        profit: product.profit,
        interstateSale: product.interstateSale,
        stateDestination: product.stateDestination,
        importedProduct: product.importedProduct,
        costumerTaxpayer: product.costumerTaxpayer,
        irpjPercent: product.irpjPercent,
        mva: product.mva,
        hasUserProductPrice: product.hasUserProductPrice,
        userProductPrice: product.userProductPrice,
        hasIcmsSt: product.hasIcmsSt,
      });
    }
  }, [product, form, isEditMode]);

  const isFormValid = form.formState.isValid && form.getValues("profit") > 0;

  const resultPath =
    isEditMode && productId
      ? `/produtos/${productId}/resultado`
      : `/produtos/novo/resultado`;

  if (isLoadingAuth)
    return <Loader2 className="text-primary animate-spin m-auto w-10 h-10" />;

  return (
    <Flex className="flex flex-col lg:flex-row w-full flex-1 gap-4">
      <ProductDetailsForm />
      <AcquisitionCostForm />
      <PricingForm />
      <Row className="gap-2 md:w-fit md:self-end lg:self-auto">
        <Button asChild className="lg:hidden h-full" variant="outline">
          <Link href="/produtos">
            <ChevronLeft className="w-6! h-6!" />
          </Link>
        </Button>
        <Button
          asChild
          className="flex-1 md:flex-none md:w-40 lg:h-full! lg:w-20 flex items-center"
          disabled={!isFormValid}
        >
          <Link
            href={resultPath}
            aria-disabled={!isFormValid}
            tabIndex={!isFormValid ? -1 : undefined}
            className={!isFormValid ? "opacity-50 pointer-events-none" : ""}
          >
            <Calculator className="lg:hidden" />
            <ChevronRight className="max-lg:hidden w-12! h-12!" />
            <span className="lg:hidden">Calcular</span>
          </Link>
        </Button>
      </Row>
    </Flex>
  );
};

export default ProductForm;
