"use client";

import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { acquisitionCostCalc } from "@/src/app/(private)/produtos/utils/calcs/acquisition-cost-calc";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import Row from "@/src/components/core/row";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { currencyFormatter } from "@/src/helpers/currency-formatter";
import { useAuth } from "@/src/providers/auth-provider";
import { Controller } from "react-hook-form";
import MetricCard from "./metric-card";

const AcquisitionCostForm = () => {
  const { form } = useProductForm();
  const { company } = useAuth();

  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const data = watch();

  const acquisitionCost = acquisitionCostCalc({
    unitPrice: data?.unitPrice ?? 0,
    icms: data.icms ?? 0,
    pisCofins: data?.pisCofins ?? 0,
    icmsSt: data.icmsSt ?? 0,
    ipi: data.ipi ?? 0,
    others: data.others ?? 0,
  });

  const ísPresumedProfit = company?.taxRegime === "presumed_profit";

  return (
    <Card className="w-full p-6 rounded-md flex flex-col space-y-6 flex-1">
      <h3 className="text-lg">Custo de Aquisição</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="unitPrice" required>
            Preço Unitário NF-e (R$)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="unitPrice"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                  validate: (value) => {
                    if (
                      value === null ||
                      value === undefined ||
                      Number(value) === 0
                    ) {
                      return "O valor deve ser maior que zero.";
                    }
                    return true;
                  },
                  min: {
                    value: 0.01,
                    message: "O valor deve ser maior que zero.",
                  },
                }}
                render={({ field }) => {
                  const numericValue = field.value ?? 0;
                  return (
                    <Input
                      id="unitPrice"
                      placeholder="R$ 0,00"
                      type="numeric"
                      {...field}
                      value={
                        field.value === null || field.value === undefined
                          ? ""
                          : currencyFormatter(numericValue * 100)
                      }
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        const numberValue =
                          raw === "" ? null : Number(raw) / 100;

                        field.onChange(numberValue);
                      }}
                      error={errors.unitPrice?.message}
                    />
                  );
                }}
              />
              <CustomTooltip message="Informe o valor do produto conforme destacado na Nota Fiscal de compra." />
            </Row>
            <Show when={errors.unitPrice?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.unitPrice?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="icms" required>
            ICMS (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="icms"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                  validate: (value) => {
                    if (
                      value === null ||
                      value === undefined ||
                      Number(value) === 0
                    ) {
                      return "O valor deve ser maior que 0";
                    }
                    return true;
                  },
                  min: { value: 0.01, message: "O valor deve ser maior que 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="icms"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={
                      field.value === null || field.value === undefined
                        ? ""
                        : field.value
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.icms?.message}
                  />
                )}
              />
              <CustomTooltip message="Insira a alíquota de ICMS (Imposto sobre Circulação de Mercadorias e Serviços) que veio na nota fiscal de compra. Se sua empresa tiver direito, este valor será usado como crédito." />
            </Row>
            <Show when={errors.icms?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.icms?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="pisCofins" required={!ísPresumedProfit}>
            PIS/COFINS (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="pisCofins"
                control={control}
                rules={{
                  required: ísPresumedProfit ? false : "Campo obrigatório",
                  validate: (value) => {
                    if (ísPresumedProfit) return true;
                    if (
                      value === null ||
                      value === undefined ||
                      Number(value) === 0
                    ) {
                      return "O valor deve ser maior que 0";
                    }
                    return true;
                  },
                  min: { value: 0.01, message: "O valor deve ser maior que 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="pisCofins"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={
                      field.value === null || field.value === undefined
                        ? ""
                        : field.value
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.pisCofins?.message}
                    disabled={ísPresumedProfit}
                  />
                )}
              />
              <CustomTooltip message="Informe a alíquota de PIS/COFINS da compra. Relevante para empresas do regime Lucro Real que podem se creditar deste imposto para abater no cálculo da venda" />
            </Row>
            <Show when={errors.pisCofins?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.pisCofins?.message}
              </span>
            </Show>
          </Column>
        </Column>

        <Column className="space-y-2">
          <Label htmlFor="icmsSt">ICMS ST (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="icmsSt"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="icmsSt"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={
                      field.value === null || field.value === undefined
                        ? ""
                        : field.value
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.icmsSt?.message}
                  />
                )}
              />
              <CustomTooltip message="Informe a alíquota ou valor do ICMS por Substituição Tributária (ST) pago na entrada." />
            </Row>
            <Show when={errors.icmsSt?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.icmsSt?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="ipi">IPI (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="ipi"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="ipi"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={
                      field.value === null || field.value === undefined
                        ? ""
                        : field.value
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.ipi?.message}
                  />
                )}
              />
              <CustomTooltip message="Digite a alíquota do IPI (Imposto sobre Produtos Industrializados) destacada na nota de compra." />
            </Row>
            <Show when={errors.ipi?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.ipi?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="others">Outros (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="others"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="others"
                    type="number"
                    placeholder="0,00%"
                    min="0"
                    max="100"
                    {...field}
                    value={
                      field.value === null || field.value === undefined
                        ? ""
                        : field.value
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.others?.message}
                  />
                )}
              />
              <CustomTooltip message="Adicione outras despesas que incidiram diretamente na compra, como frete de compra (FOB), seguros ou taxas, em percentual sobre o preço unitário." />
            </Row>
            <Show when={errors.others?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.others?.message}
              </span>
            </Show>
          </Column>
        </Column>
      </form>
      <MetricCard
        title="Valor de Aquisição"
        value={acquisitionCost || 0}
        className="max-h-30"
      />
    </Card>
  );
};

export default AcquisitionCostForm;
