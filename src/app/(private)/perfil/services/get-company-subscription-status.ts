import { createClient } from "@/src/libs/supabase/client";
import { camelizeKeys } from "humps";

interface GetCompanySubscriptionStatusProps {
  companyId: string;
}

export async function getCompanySubscriptionStatus({
  companyId,
}: GetCompanySubscriptionStatusProps) {
  const supabase = createClient();

  const { data: subscription, error } = await supabase
    .from("company_subscriptions")
    .select("id, status, expires_at")
    .eq("company_id", companyId)
    .eq("status", "active")
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const data = camelizeKeys(subscription);

  if (error) {
    return {
      hasActiveSubscription: false,
      expiresAt: null,
    };
  }

  const isActive = data ? new Date(data.expiresAt) > new Date() : false;

  return {
    hasActiveSubscription: isActive,
    expiresAt: data?.expiresAt ?? null,
  };
}
