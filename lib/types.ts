// Shapes mirror the backend partners.api serializers (aggregates only).
export interface Measures {
  tpv: string;
  net_volume: string;
  transactions: number;
  avg_ticket: string;
  refund_volume: string;
  refund_rate: string;
  cb_volume: string;
  cb_count: number;
  cb_rate: string;
  vamp: string;
  approval_rate: string;
}

export interface Overview extends Measures {
  period: [string, string];
}

export interface PortfolioRow {
  id: string;
  name: string;
  practices: number;
  status: "Healthy" | "Monitor" | "Elevated";
  measures: Measures;
}

export interface CommissionLine {
  portfolio: string;
  attribution_pct: string;
  portfolio_tpv: string;
  rate_bps: number;
  gross_share: string;
  refund_adj: string;
  cb_adj: string;
  net_earnings: string;
}

export interface RevenueShare {
  period?: [string, string];
  est_share?: string;
  net_earnings?: string;
  blended_rate_bps?: number;
  status?: string;
  lines?: CommissionLine[];
  detail?: string;
}
