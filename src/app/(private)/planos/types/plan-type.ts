export enum PlanDisplayName {
  free = "Grátis",
  basic = "Básico",
  standard = "Intermediário",
  pro = "Avançado",
  custom = "Customizado",
}

export type PlanType = {
  id: string;
  name: "free" | "basic" | "standard" | "pro" | "custom";
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
  maxProducts: number | null;
  maxUsers: number | null;
  canDeleteProducts: boolean;
  canUpdateProducts: boolean;
  canExportData: boolean;
  startedAt: string | null;
  expiresAt: string | null;
  users: PlanUser[];
}
