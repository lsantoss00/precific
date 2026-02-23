import { postCompany } from "@/src/app/(private)/perfil/services/post-company";
import {
  REVENUE_RANGE_LABELS,
  SECTOR_LABELS,
  TAX_REGIME_LABELS,
} from "@/src/app/(private)/perfil/utils/company-labels";
import SelectStateInput from "@/src/app/(private)/produtos/components/select-state-input";
import { Button } from "@/src/components/core/button";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import { MaskedInput } from "@/src/components/core/masked-input";
import SelectInput from "@/src/components/core/select-input";
import Show from "@/src/components/core/show";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { supabaseErrorsTranslator } from "@/src/utils/supabase-errors-translator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const CompanyFormSchema = z
  .object({
    companyName: z.string().min(1, "O campo nome é obrigatório."),
    cnpj: z
      .string()
      .min(14, "O campo CNPJ é obrigatório.")
      .length(14, "CNPJ inválido."),
    sector: z.enum(["business", "industry"], {
      message: "O campo setor é obrigatório.",
    }),
    taxRegime: z.enum(["real_profit", "presumed_profit", "simple_national"], {
      message: "O campo regime tributário é obrigatório.",
    }),
    revenueRange: z
      .enum(["range_1", "range_2", "range_3", "range_4", "range_5", "range_6"])
      .optional(),
    state: z
      .string()
      .min(2, "O campo estado é obrigatório.")
      .max(2, "Estado inválido.")
      .toUpperCase(),
    postalCode: z
      .string()
      .min(8, "O campo CEP é obrigatório.")
      .length(8, "CEP inválido."),
    streetAddress: z.string().min(1, "O campo endereço é obrigatório."),
    streetNumber: z.string().min(1, "O campo número é obrigatório."),
    addressComplement: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.taxRegime === "simple_national") {
        return data.revenueRange && data.revenueRange.length > 0;
      }
      return true;
    },
    {
      message: "O campo faixa de faturamento é obrigatório.",
      path: ["revenue_range"],
    },
  );

type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>;

const CompanyForm = () => {
  const { handleSubmit, control, watch } = useForm<CompanyFormSchemaType>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      sector: undefined,
      taxRegime: undefined,
      revenueRange: undefined,
      state: "",
      postalCode: "",
      streetAddress: "",
      streetNumber: "",
      addressComplement: "",
    },
  });

  const { mutate: post, isPending: pendingPostCompany } = useMutation({
    mutationFn: postCompany,
    onSuccess: async () => {
      toast.success("Empresa registrada com sucesso!", {
        className: "!bg-green-600 !text-white",
      });
      await queryClient?.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(supabaseErrorsTranslator(error.message), {
        className: "!bg-red-600 !text-white",
      });
    },
  });

  const handleSubmitCompany = (company: CompanyFormSchemaType) => {
    post({ company });
  };

  const {
    companyName,
    cnpj,
    sector,
    taxRegime,
    revenueRange,
    state,
    postalCode,
    streetAddress,
    streetNumber,
  } = watch();

  const requiredFields = [
    companyName,
    cnpj,
    sector,
    taxRegime,
    state,
    postalCode,
    streetAddress,
    streetNumber,
  ];

  if (taxRegime === "simple_national") {
    requiredFields.push(revenueRange || "");
  }

  const formInputFieldIsBlank = requiredFields.some((value) => value === "");

  return (
    <form
      id="company-form"
      onSubmit={handleSubmit(handleSubmitCompany)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="companyName" required>
            Nome da Empresa
          </Label>
          <Controller
            name="companyName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="companyName"
                  placeholder="Informe o nome da empresa"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="cnpj" required>
            CNPJ
          </Label>
          <Controller
            name="cnpj"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <MaskedInput
                  id="cnpj"
                  mask="00.000.000/0000-00"
                  placeholder="00.000.000/0000-00"
                  value={value}
                  onAccept={onChange}
                  unmask={true}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="sector" required>
            Setor
          </Label>
          <Controller
            name="sector"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <SelectInput
                  triggerProps={{
                    id: "sector",
                  }}
                  options={sectorSelectOptions}
                  value={value}
                  placeholder="Selecione o setor de atuação"
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="taxRegime" required>
            Regime Tributário
          </Label>
          <Controller
            name="taxRegime"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <SelectInput
                  triggerProps={{
                    id: "taxRegime",
                  }}
                  placeholder="Selecione o regime tributário"
                  options={taxRegimeSelectOptions}
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Show when={taxRegime === "simple_national"}>
          <Column className="space-y-2 col-span-2">
            <Label htmlFor="revenueRange" required>
              Faixa de Faturamento
            </Label>
            <Controller
              name="revenueRange"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Column>
                  <SelectInput
                    triggerProps={{
                      id: "revenueRange",
                    }}
                    options={revenueRangeSelectOptions}
                    value={value || ""}
                    placeholder={"Selecione a faixa de faturamento"}
                    onChange={onChange}
                    className={`${error && "border-red-600"}`}
                  />
                  <div className="h-2 -mt-1">
                    <Show when={error}>
                      <span className="text-xs text-red-600">
                        {error?.message}
                      </span>
                    </Show>
                  </div>
                </Column>
              )}
            />
          </Column>
        </Show>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state" required>
            Estado
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <SelectStateInput
                  id="state"
                  value={value}
                  placeholder="Selecione o estado"
                  onChange={onChange}
                  error={Boolean(error)}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postalCode" required>
            CEP
          </Label>
          <Controller
            name="postalCode"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <MaskedInput
                  id="postalCode"
                  mask="00000-000"
                  placeholder="00000-000"
                  value={value}
                  onAccept={onChange}
                  unmask={true}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="streetAddress" required>
            Endereço
          </Label>
          <Controller
            name="streetAddress"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="streetAddress"
                  placeholder="Informe o endereço"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="streetNumber" required>
            Número
          </Label>
          <Controller
            name="streetNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="streetNumber"
                  placeholder="Nº"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="addressComplement">Complemento</Label>
          <Controller
            name="addressComplement"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Column>
                <Input
                  id="addressComplement"
                  placeholder="Apto, bloco, torre, loja"
                  value={value}
                  onChange={onChange}
                  className={`${error && "border-red-600"}`}
                />
                <div className="h-2 -mt-1">
                  <Show when={error}>
                    <span className="text-xs text-red-600">
                      {error?.message}
                    </span>
                  </Show>
                </div>
              </Column>
            )}
          />
        </Column>
      </div>
      <Button
        className="hover:cursor-pointer w-full h-12 mt-6"
        type="submit"
        disabled={formInputFieldIsBlank || pendingPostCompany}
      >
        <Show when={pendingPostCompany}>
          <Loader2Icon className="animate-spin" />
        </Show>
        Cadastrar
      </Button>
    </form>
  );
};

export default CompanyForm;

const sectorSelectOptions = [
  { value: "business", label: SECTOR_LABELS.business },
  { value: "industry", label: SECTOR_LABELS.industry },
];

const taxRegimeSelectOptions = [
  { value: "real_profit", label: TAX_REGIME_LABELS.real_profit },
  { value: "presumed_profit", label: TAX_REGIME_LABELS.presumed_profit },
  { value: "simple_national", label: TAX_REGIME_LABELS.simple_national },
];

const revenueRangeSelectOptions = [
  { value: "range_1", label: REVENUE_RANGE_LABELS.range_1 },
  { value: "range_2", label: REVENUE_RANGE_LABELS.range_2 },
  { value: "range_3", label: REVENUE_RANGE_LABELS.range_3 },
  { value: "range_4", label: REVENUE_RANGE_LABELS.range_4 },
  { value: "range_5", label: REVENUE_RANGE_LABELS.range_5 },
  { value: "range_6", label: REVENUE_RANGE_LABELS.range_6 },
];
