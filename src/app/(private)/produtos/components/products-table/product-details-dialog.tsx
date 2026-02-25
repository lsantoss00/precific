"use client";

import MetricCard, {
  MetricCardProps,
} from "@/src/app/(private)/produtos/components/metric-card";
import { ProductResponseType } from "@/src/app/(private)/produtos/types/product-type";

import Column from "@/src/components/core/column";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/src/components/core/dialog";
import Flex from "@/src/components/core/flex";
import { Separator } from "@/src/components/core/separator";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import StatusBadge from "@/src/components/status-badge";
import { dateFormatter } from "@/src/helpers/date-formatter";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { useAuth } from "@/src/providers/auth-provider";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CircleAlert } from "lucide-react";

interface ProductDetailsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product: Partial<ProductResponseType>;
}

const ProductDetailsDialog = ({
  open,
  onOpenChange,
  product,
}: ProductDetailsDialogProps) => {
  const { company } = useAuth();
  const isMd = useMediaQuery(`(min-width: 768px)`);

  const isSimpleNational = company?.taxRegime === "simple_national";

  const metrics2025: (MetricCardProps & {
    gridSpan?: string;
    condition?: boolean;
  })[] = [
    {
      title: "Valor de aquisição",
      value: product?.acquisitionCost ?? 0,
    },
    {
      title: "Outros custos",
      value: product?.otherCosts ?? 0,
    },
    {
      title: "Custos fixos",
      value: product?.fixedCosts ?? 0,
    },
    {
      title: "Frete",
      value: product?.shipping ?? 0,
    },
    {
      title: "ICMS + PIS/COFINS",
      value: product?.taxes ?? 0,
    },
    {
      title: "ICMS ST",
      value: product?.icmsSt ?? 0,
    },
    {
      title: "DAS",
      value: product?.das ?? 0,
      variant: "neutral" as const,
      condition: isSimpleNational,
    },
    {
      title: "IRPJ + CSLL",
      value: product?.irpjCsll ?? 0,
      condition: !isSimpleNational,
    },
    {
      title: "Markup",
      value: product?.markup ?? 0,
      type: "percentage" as const,
    },
    {
      title: "Rentabilidade",
      value: product?.profitability ?? 0,
      type: "percentage" as const,
    },
    {
      title: "Lucro líquido",
      value: product?.netProfit ?? 0,
      gridSpan: "col-span-1",
    },
    {
      title: "Preço de venda final",
      value: product?.priceIn2026 ?? 0,
      variant: "primary" as const,
      gridSpan: "col-span-1 sm:col-span-2",
    },
  ];

  const metrics2026: (MetricCardProps & {
    gridSpan?: string;
    condition?: boolean;
  })[] = [
    {
      title: "Base de cálculo IBS/CBS",
      value: product?.ibsCbsBase ?? 0,
      gridSpan: "col-span-1 sm:col-span-2 lg:col-span-1",
    },
    {
      title: "IBS (0.1%)",
      value: product?.ibs ?? 0,
    },
    {
      title: "CBS (0.9%)",
      value: product?.cbs ?? 0,
    },
    {
      title: "Preço de venda final",
      value: product?.priceIn2026 ?? 0,
      variant: "primary" as const,
      gridSpan: "col-span-1 sm:col-span-2 lg:col-span-3",
    },
  ];

  const ncm = product?.ncm
    ?.toString()
    .replace(/^(\d{4})(\d{2})(\d{2})$/, "$1.$2.$3");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent className="flex flex-col max-w-[90dvw] md:max-w-[96dvw] lg:max-w-4xl py-10 sm:p-8 overflow-y-auto max-h-[96dvh] 2xl:max-h-full">
        <DialogHeader className="sm:gap-4 text-start">
          <Column className="sm:gap-1">
            <DialogTitle className="text-2xl text-ellipsis truncate">
              {product?.name}
            </DialogTitle>
            <Flex className="flex-col sm:flex-row gap-2">
              <span className="text-sm text-muted-foreground  text-ellipsis truncate">
                {product?.sku}
              </span>
              <Show when={Boolean(product?.ncm)}>
                <Show when={isMd}>
                  <Separator orientation="vertical" />
                </Show>
                <span className="text-sm text-muted-foreground">{ncm}</span>
              </Show>
              <Show when={isMd}>
                <Separator orientation="vertical" />
              </Show>
              <StatusBadge status={product?.status!} />
            </Flex>
          </Column>
          <Flex className="flex-col sm:flex-row gap-2 sm:gap-8 text-start">
            <Column>
              <span className="text-sm text-muted-foreground">
                Data de Criação:
              </span>
              <span>{dateFormatter(product?.createdAt!, true)}</span>
            </Column>
            <Column>
              <span className="text-sm text-muted-foreground">
                Última Atualização:
              </span>
              <span>{dateFormatter(product?.updatedAt!, true)}</span>
            </Column>
          </Flex>
          <Column>
            <span className="text-sm text-muted-foreground">Observações:</span>
            <p>
              {!product?.observations || "Nenhuma observação foi adicionada."}
            </p>
          </Column>
        </DialogHeader>
        <Separator />
        <Column className="gap-2">
          <span>
            Pré-Reforma Tributária <strong>2025</strong>
          </span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {metrics2025
              .filter(
                (metric) => metric.condition === undefined || metric.condition,
              )
              .map((metric, index) => (
                <div key={`metric-2025-${index}`} className={metric.gridSpan}>
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
        <Separator />
        <Column className="gap-2">
          <h3>
            Transição Reforma Tributária{" "}
            <span className="inline-flex items-center gap-2">
              <strong>2026</strong>
              <CustomTooltip
                icon={<CircleAlert className="w-4 h-4" />}
                message="O valor de IBS/CBS é exibido para transparência fiscal, conforme Art. 348, § 1º. O recolhimento deste tributo não é de responsabilidade do contribuinte nesta nota, sendo o destaque meramente informativo."
              />
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics2026.map((metric, index) => (
              <div key={`metric-2026-${index}`} className={metric.gridSpan}>
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
