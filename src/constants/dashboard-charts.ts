export const DASHBOARD_CHARTS = [
  "Preço Médio de Venda",
  "Custo Médio",
  "Lucro Líquido Médio",
  "Rentabilidade Média",
  "Ranking de Lucro Líquido",
  "Ranking de Markup",
  "Ranking de Custo Fixo",
  "Ranking de Frete",
  "Preço de Venda X Custo de Aquisição",
  "Preço de Venda X Lucro Líquido",
  "Histórico de Preços",
  "Histórico de Lucros Líquidos",
] as const;

export type ChartName = (typeof DASHBOARD_CHARTS)[number];

export const BASIC_PLAN_CHARTS = new Set<ChartName>([
  "Preço Médio de Venda",
  "Custo Médio",
  "Ranking de Lucro Líquido",
  "Ranking de Markup",
]);

export function isChartAvailable(
  chartName: ChartName,
  planId: string | undefined,
): boolean {
  if (planId === "free") return false;
  if (planId === "basic") return BASIC_PLAN_CHARTS.has(chartName);
  return true;
}
