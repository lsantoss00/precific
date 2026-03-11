"use client";

import { getCompanyActivePlan } from "@/src/app/(private)/perfil/services/get-company-active-plan";
import { getCompanyById } from "@/src/app/(private)/perfil/services/get-company-by-id";
import { getUserProfile } from "@/src/app/(private)/perfil/services/get-user-profile";
import { CompanyType } from "@/src/app/(private)/perfil/types/company-type";
import { ProfileType } from "@/src/app/(private)/perfil/types/profile-type";
import { CompanyActivePlanType } from "@/src/app/(private)/planos/types/plan-type";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { createClient } from "../libs/supabase/client";

interface AuthContextType {
  profile: ProfileType | null;
  company: CompanyType | null;
  isPremium: boolean;
  expiresAt: string | null;
  isLoadingAuth: boolean;
  plan: CompanyActivePlanType | null;
  hasReachedProductLimit: boolean;
}

const AuthContext = createContext<AuthContextType>({
  profile: null,
  company: null,
  isPremium: false,
  expiresAt: null,
  isLoadingAuth: true,
  plan: null,
  hasReachedProductLimit: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const { data: user, isLoading: isLoadingUser } = useQuery<User | null>({
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
    queryKey: ["user"],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: true,
  });

  const { data: profile, isLoading: isLoadingProfile } = useQuery<ProfileType>({
    queryFn: () => getUserProfile({ userId: user!.id }),
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
  });

  const { data: company, isLoading: isLoadingCompany } = useQuery<CompanyType>({
    queryFn: () => getCompanyById({ companyId: profile!.companyId! }),
    queryKey: ["company", profile?.companyId],
    enabled: !!profile?.companyId,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 60,
  });

  const { data: plan, isLoading: isLoadingPlan } =
    useQuery<CompanyActivePlanType>({
      queryFn: () => getCompanyActivePlan({ companyId: profile!.companyId! }),
      queryKey: ["company-active-plan", profile?.companyId],
      enabled: !!profile?.companyId,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 60 * 5,
    });

  useEffect(() => {
    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange((event) => {
      const relevantAuthEvents =
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED";

      if (relevantAuthEvents) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }

      if (event === "SIGNED_OUT") {
        queryClient.clear();
      }
    });

    return () => authSubscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!profile?.companyId) return;

    const channel = supabase
      .channel("company-subscription-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "company_subscriptions",
          filter: `company_id=eq.${profile.companyId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["company-active-plan", profile.companyId],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.companyId, supabase]);

  const isLoadingAuth =
    isLoadingUser ||
    (!!user && isLoadingProfile) ||
    (!!profile?.companyId && isLoadingCompany) ||
    (!!profile?.companyId && isLoadingPlan);

  const isPremium = plan?.planStatus === "active";
  const expiresAt = plan?.expiresAt ?? null;

  const hasReachedProductLimit =
    plan?.maxProducts != null
      ? (company?.productsQuantity ?? 0) >= plan.maxProducts
      : false;

  return (
    <AuthContext.Provider
      value={{
        profile: profile ?? null,
        company: company ?? null,
        isPremium,
        expiresAt,
        isLoadingAuth,
        plan: plan ?? null,
        hasReachedProductLimit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
