import { CompanyActivePlanType } from "@/src/app/(private)/planos/types/plan-type";
import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetCompanyActivePlanProps {
  companyId: string;
}

export async function getCompanyActivePlan({
  companyId,
}: GetCompanyActivePlanProps): Promise<CompanyActivePlanType> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("company_active_plan")
    .select("*")
    .eq("company_id", companyId)
    .single();

  if (error) throw error;

  return camelizeKeys(data) as CompanyActivePlanType;
}
