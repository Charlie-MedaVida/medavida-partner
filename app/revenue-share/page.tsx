"use client";

import { api } from "@/lib/api";
import { bps, money, pct } from "@/lib/format";
import type { RevenueShare } from "@/lib/types";
import { KpiCard, PageTitle } from "../components/ui";
import { useApi } from "../components/useApi";

const COLS = ["Portfolio", "Attribution", "TPV", "Rate", "Gross Share", "Refund Adj", "CB Adj", "Net Earnings"];

export default function RevenueSharePage() {
  const { data, error, loading } = useApi<RevenueShare>(() => api.revenueShare());
  if (loading) return <p style={{ color: "var(--text-sub)" }}>Loading…</p>;
  if (error) return <p style={{ color: "var(--danger)" }}>{error}</p>;
  const rs = data!;

  return (
    <>
      <PageTitle title="Revenue Share" subtitle="Your earnings, by portfolio" />
      {rs.detail ? (
        <div className="panel" style={{ padding: 20, color: "var(--text-sub)", fontSize: 13 }}>{rs.detail}</div>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            <KpiCard label="Est. Revenue Share" value={money(rs.est_share)} />
            <KpiCard label="Net Earnings" value={money(rs.net_earnings)} sub="After clawback" />
            <KpiCard label="Blended Rate" value={bps(rs.blended_rate_bps)} sub="Of TPV" />
            <KpiCard label="Status" value={(rs.status || "").toUpperCase()} sub={rs.period?.join(" → ")} />
          </div>
          <div className="panel">
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
              <h2 style={{ fontSize: 13, fontWeight: 600 }}>Breakdown</h2>
            </div>
            <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {COLS.map((h, i) => (
                    <th key={h} className="th" style={{ textAlign: i === 0 ? "left" : "right", padding: "8px 20px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(rs.lines || []).map((l, idx) => (
                  <tr key={idx} style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 500 }}>{l.portfolio}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right" }}>{l.attribution_pct}%</td>
                    <td style={{ padding: "12px 20px", textAlign: "right" }}>{money(l.portfolio_tpv)}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right" }}>{bps(l.rate_bps)}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right" }}>{money(l.gross_share)}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right", color: "var(--text-sub)" }}>−{money(l.refund_adj)}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right", color: "var(--text-sub)" }}>−{money(l.cb_adj)}</td>
                    <td style={{ padding: "12px 20px", textAlign: "right", fontWeight: 600 }}>{money(l.net_earnings)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
