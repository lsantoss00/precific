export type PlanType = {
  id: string;
  name: "BÁSICO" | "INTERMEDIÁRIO" | "AVANÇADO" | "CUSTOMIZADO";
  description: string;
  price: string;
  benefits: string[];
  isMostPopular?: boolean;
};
