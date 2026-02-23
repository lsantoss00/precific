"use client";

import { useProductForm } from "@/src/app/(private)/produtos/contexts/product-form-context";
import { getICMSRate } from "@/src/app/(private)/produtos/utils/icms-table";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import Row from "@/src/components/core/row";
import SelectInput from "@/src/components/core/select-input";
import Show from "@/src/components/core/show";
import CustomTooltip from "@/src/components/custom-tooltip";
import { useAuth } from "@/src/providers/auth-provider";
import { useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";

const PricingForm = () => {
  const { company } = useAuth();
  const { form } = useProductForm();
  const {
    control,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = form;

  const isRealProfit = company?.taxRegime === "real_profit";
  const isPresumedProfit = company?.taxRegime === "presumed_profit";
  const isSimpleNational = company?.taxRegime === "simple_national";

  const icmsSt = watch("icmsSt") ?? 0;
  const isImportedProduct = watch("importedProduct");
  const isInterstateSale = watch("interstateSale");
  const stateDestination = watch("stateDestination");
  const hasIcmsSt = watch("hasIcmsSt");
  const isSixthRevenueRange = company?.revenueRange === "range_6";

  const isSalesIcmsDisabled = useMemo(() => {
    return (
      icmsSt > 0 ||
      isImportedProduct ||
      isInterstateSale ||
      (isSimpleNational && !isSixthRevenueRange)
    );
  }, [
    icmsSt,
    isImportedProduct,
    isInterstateSale,
    isSimpleNational,
    isSixthRevenueRange,
  ]);

  useEffect(() => {
    if (isSalesIcmsDisabled) {
      clearErrors("salesIcms");
    }
  }, [isSalesIcmsDisabled, clearErrors]);

  useEffect(() => {
    if (icmsSt > 0) {
      setValue("salesIcms", 0);
      return;
    }

    if (isImportedProduct) {
      setValue("salesIcms", 4);
      return;
    }

    if (isInterstateSale && stateDestination && company?.state) {
      const icmsRate = getICMSRate(company.state, stateDestination);
      setValue("salesIcms", icmsRate);
      return;
    }
  }, [
    icmsSt,
    isImportedProduct,
    isInterstateSale,
    stateDestination,
    company?.state,
    setValue,
  ]);

  useEffect(() => {
    if (!hasIcmsSt) {
      setValue("mva", 0);
    }
  }, [hasIcmsSt, setValue]);

  return (
    <Card className="w-full p-6 rounded-md flex flex-col space-y-6 flex-1">
      <h3 className="text-lg">Precificação</h3>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
        <Column className="space-y-2">
          <Label htmlFor="fixedCosts">Custos Fixos (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="fixedCosts"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="fixedCosts"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.fixedCosts?.message}
                  />
                )}
              />
              <CustomTooltip message="Insira o percentual dos custos fixos da sua empresa que deve ser atribuído a este produto." />
            </Row>
            <Show when={!!errors.fixedCosts?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.fixedCosts?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="salesIcms" required={!isSalesIcmsDisabled}>
            ICMS Venda (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="salesIcms"
                control={control}
                rules={{
                  required: isSalesIcmsDisabled ? false : "Campo obrigatório",
                  validate: (value) => {
                    if (isSalesIcmsDisabled) return true;
                    if (
                      value === null ||
                      value === undefined ||
                      Number(value) === 0
                    ) {
                      return "O valor deve ser maior que 0";
                    }
                    return true;
                  },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="salesIcms"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.salesIcms?.message}
                    disabled={isSalesIcmsDisabled}
                  />
                )}
              />
              <CustomTooltip message="Informe a alíquota de ICMS da venda. Pode variar conforme destino e regime tributário." />
            </Row>
            <Show when={!!errors.salesIcms?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.salesIcms?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="salesPisCofins" required={!isSimpleNational}>
            PIS/COFINS Venda (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="salesPisCofins"
                control={control}
                rules={{
                  required: isSimpleNational ? false : "Campo obrigatório",
                  validate: (value) => {
                    if (isSimpleNational) return true;
                    if (
                      value === null ||
                      value === undefined ||
                      Number(value) === 0
                    ) {
                      return "O valor deve ser maior que 0";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="salesPisCofins"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.salesPisCofins?.message}
                    disabled={isSimpleNational}
                  />
                )}
              />
              <CustomTooltip message="Digite a alíquota de PIS e COFINS sobre a venda." />
            </Row>
            <Show when={!!errors.salesPisCofins?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.salesPisCofins?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Show when={isRealProfit}>
          <Column className="space-y-2">
            <Label htmlFor="irpjPercent" required>
              IRPJ/CSLL (%)
            </Label>
            <Column className="gap-2">
              <Row className="items-center gap-2">
                <Controller
                  name="irpjPercent"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field: { value, onChange } }) => (
                    <SelectInput
                      triggerProps={{ id: "irpjPercent" }}
                      placeholder="Selecione"
                      options={realProfitIrpjPercentOptions}
                      value={value}
                      onChange={(val) => onChange(Number(val))}
                      className={`${errors.irpjPercent && "border-red-600"}`}
                    />
                  )}
                />
                <CustomTooltip message="Selecione o percentual do IRPJ aplicado." />
              </Row>
              <Show when={!!errors.irpjPercent?.message}>
                <span className="text-xs text-red-500 -mt-1">
                  {errors.irpjPercent?.message}
                </span>
              </Show>
            </Column>
          </Column>
        </Show>
        <Show when={isPresumedProfit}>
          <Column className="space-y-2">
            <Label htmlFor="irpjPercent" required>
              IRPJ/CSLL (%)
            </Label>
            <Column className="gap-2">
              <Row className="items-center gap-2">
                <Controller
                  name="irpjPercent"
                  control={control}
                  rules={{ required: "Campo obrigatório" }}
                  render={({ field: { value, onChange } }) => (
                    <SelectInput
                      triggerProps={{ id: "irpjPercent" }}
                      placeholder="Selecione"
                      options={presumedProfitIrpjPercentOptions}
                      value={value}
                      onChange={(val) => onChange(Number(val))}
                      className={`${errors.irpjPercent && "border-red-600"}`}
                    />
                  )}
                />
                <CustomTooltip message="Selecione o percentual do IRPJ aplicado." />
              </Row>
              <Show when={!!errors.irpjPercent?.message}>
                <span className="text-xs text-red-500 -mt-1">
                  {errors.irpjPercent?.message}
                </span>
              </Show>
            </Column>
          </Column>
        </Show>
        <Show when={!isSimpleNational}>
          <Column className="space-y-2">
            <Label htmlFor="mva">MVA (%)</Label>
            <Column className="gap-2">
              <Row className="items-center gap-2">
                <Controller
                  name="mva"
                  control={control}
                  rules={{
                    min: { value: 0, message: "Valor mínimo é 0%" },
                    max: { value: 150, message: "Valor máximo é 150%" },
                  }}
                  render={({ field }) => (
                    <Input
                      id="mva"
                      type="number"
                      placeholder="0,00%"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? null : Number(value));
                      }}
                      error={errors.mva?.message}
                      disabled={!hasIcmsSt}
                    />
                  )}
                />
                <CustomTooltip message="A MVA é utilizada no cálculo do ICMS ST." />
              </Row>
              <Show when={!!errors.mva?.message}>
                <span className="text-xs text-red-500 -mt-1">
                  {errors.mva?.message}
                </span>
              </Show>
            </Column>
          </Column>
        </Show>
        <Column className="space-y-2">
          <Label htmlFor="shipping">Frete (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="shipping"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="shipping"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.shipping?.message}
                  />
                )}
              />
              <CustomTooltip message="Custo percentual do frete para envio ao cliente." />
            </Row>
            <Show when={!!errors.shipping?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.shipping?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="otherCosts">Outros Custos (%)</Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="otherCosts"
                control={control}
                rules={{
                  min: { value: 0, message: "Valor mínimo é 0" },
                  max: { value: 100, message: "Valor máximo é 100" },
                }}
                render={({ field }) => (
                  <Input
                    id="otherCosts"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.otherCosts?.message}
                  />
                )}
              />
              <CustomTooltip message="Taxas de marketplace, embalagem, etc." />
            </Row>
            <Show when={!!errors.otherCosts?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.otherCosts?.message}
              </span>
            </Show>
          </Column>
        </Column>
        <Column className="space-y-2">
          <Label htmlFor="profit" required>
            Lucro Desejado (%)
          </Label>
          <Column className="gap-2">
            <Row className="items-center gap-2">
              <Controller
                name="profit"
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
                }}
                render={({ field }) => (
                  <Input
                    id="profit"
                    type="number"
                    placeholder="0,00%"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? null : Number(value));
                    }}
                    error={errors.profit?.message}
                  />
                )}
              />
              <CustomTooltip message="Defina sua margem de lucro desejada." />
            </Row>
            <Show when={!!errors.profit?.message}>
              <span className="text-xs text-red-500 -mt-1">
                {errors.profit?.message}
              </span>
            </Show>
          </Column>
        </Column>
      </form>
    </Card>
  );
};

export default PricingForm;

const presumedProfitIrpjPercentOptions = [
  { value: 0, label: "0%" },
  { value: 0.15, label: "24%" },
  { value: 0.25, label: "34%" },
];

const realProfitIrpjPercentOptions = [
  { value: 0, label: "0%" },
  { value: 24, label: "24%" },
  { value: 34, label: "34%" },
];
