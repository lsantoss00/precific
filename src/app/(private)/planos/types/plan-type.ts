export enum PlanDisplayName {
  basic = "Básico",
  standard = "Intermediário",
  pro = "Avançado",
  custom = "Customizado",
}

export type PlanType = {
  id: string;
  name: "basic" | "standard" | "pro" | "custom";
  description: string;
  price: string;
  benefits: string[];
  isMostPopular?: boolean;
};

export interface PlanUser {
  id: string;
  username: string;
  email: string;
}

export interface CompanyActivePlanType {
  companyId: string;
  planId: string;
  description: string;
  price: number;
  planType: string;
  planStatus: string;
  maxProducts: number | null;
  maxUsers: number | null;
  canDeleteProducts: boolean;
  canUpdateProducts: boolean;
  startedAt: string | null;
  expiresAt: string | null;
  users: PlanUser[];
}
