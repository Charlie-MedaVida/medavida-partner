"use client";

import { api } from "@/lib/api";
import { money, num, pct } from "@/lib/format";
import type { Overview, PortfolioRow } from "@/lib/types";
import { KpiCard, PageTitle, StatusPill } from "./components/ui";
import { useApi } from "./components/useApi";

const COLS = ["Portfolio", "Practices", "TPV", "Refund Rate", "CB Rate", "VAMP", "Status"];

export default function Performance() {
  const { data, error, loading } = useApi<[Overview, PortfolioRow[]]>(() =>
    Promise.all([api.overview(), api.portfolios()]),
  );
  if (loading) return <p style={{ color: "var(--text-sub)" }}>Loading…</p>;
  if (error) return <p style={{ color: "var(--danger)" }}>{error}</p>;
  const [ov, rows] = data!;

  return (
    <>
      <PageTitle title="Partner Performance" subtitle="Performance across your referred practices · Last 30 days" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Total TPV" value={money(ov.tpv)} sub="Last 30 days" />
        <KpiCard label="Net Volume" value={money(ov.net_volume)} sub="After refunds & fees" />
        <KpiCard label="Transactions" value={num(ov.transactions)} sub="All portfolios" />
        <KpiCard label="Approval Rate" value={pct(ov.approval_rate)} sub="Auth success" />
        <KpiCard label="Refund Rate" value={pct(ov.refund_rate)} sub="Of volume" />
        <KpiCard label="VAMP" value={pct(ov.vamp)} sub="Disputes ÷ settled" />
      </div>

      <div className="panel">
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
          <h2 style={{ fontSize: 13, fontWeight: 600 }}>Portfolio Companies</h2>
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
            {rows.map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid var(--line)" }}>
                <td style={{ padding: "12px 20px", fontWeight: 500 }}>{r.name}</td>
                <td style={{ padding: "12px 20px", textAlign: "right", color: "var(--text-sub)" }}>{r.practices}</td>
                <td style={{ padding: "12px 20px", textAlign: "right", fontWeight: 600 }}>{money(r.measures.tpv)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{pct(r.measures.refund_rate)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{pct(r.measures.cb_rate)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{pct(r.measures.vamp)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 20, color: "var(--text-sub)" }}>
                  No portfolios in scope.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
