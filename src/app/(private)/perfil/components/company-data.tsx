"use client";

import {
  REVENUE_RANGE_LABELS,
  SECTOR_LABELS,
  TAX_REGIME_LABELS,
} from "@/src/app/(private)/perfil/utils/company-labels";
import { stateSelectOptions } from "@/src/app/(private)/produtos/components/select-state-input";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import { MaskedInput } from "@/src/components/core/masked-input";
import Show from "@/src/components/core/show";
import { useAuth } from "@/src/providers/auth-provider";

const CompanyData = () => {
  const { company } = useAuth();

  const isSimpleNational = company?.taxRegime === "simple_national";

  const stateLabel =
    stateSelectOptions.find((state) => state.value === company?.state)?.label ??
    "";

  return (
    <Card className="w-full p-6 rounded-md flex space-y-4 flex-1">
      <h3 className="text-lg">Dados da Empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input id="companyName" disabled value={company?.companyName ?? ""} />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <MaskedInput
            id="cnpj"
            mask="00.000.000/0000-00"
            value={company?.cnpj ?? ""}
            unmask={true}
            disabled
          />
        </Column>
        <Column
          className={`space-y-2 ${
            isSimpleNational ? "col-span-2" : "col-span-2 md:col-span-1"
          }`}
        >
          <Label htmlFor="sector">Setor</Label>
          <Input
            id="sector"
            disabled
            value={SECTOR_LABELS[company?.sector as keyof typeof SECTOR_LABELS]}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="taxRegime">Regime Tributário</Label>
          <Input
            id="taxRegime"
            disabled
            value={
              TAX_REGIME_LABELS[
                company?.taxRegime as keyof typeof TAX_REGIME_LABELS
              ]
            }
          />
        </Column>
        <Show when={isSimpleNational}>
          <Column className="space-y-2 col-span-2 md:col-span-1">
            <Label htmlFor="revenueRange">Faixa de Faturamento</Label>
            <Input
              id="revenueRange"
              disabled
              value={
                REVENUE_RANGE_LABELS[
                  company?.revenueRange as keyof typeof REVENUE_RANGE_LABELS
                ]
              }
            />
          </Column>
        </Show>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" maxLength={2} disabled value={stateLabel} />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="postal_code">CEP</Label>
          <MaskedInput
            id="cnpj"
            mask="00000-000"
            value={company?.postalCode ?? ""}
            unmask={true}
            disabled
          />
        </Column>
        <Column className="space-y-2 col-span-2">
          <Label htmlFor="streetAddress">Endereço</Label>
          <Input
            id="streetAddress"
            disabled
            value={company?.streetAddress ?? ""}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="streetNumber">Número</Label>
          <Input
            id="streetNumber"
            disabled
            value={company?.streetNumber ?? ""}
          />
        </Column>
        <Column className="space-y-2 col-span-2 md:col-span-1">
          <Label htmlFor="addressComplement">Complemento</Label>
          <Input
            id="addressComplement"
            disabled
            value={company?.addressComplement ?? ""}
          />
        </Column>
      </div>
    </Card>
  );
};

export default CompanyData;
