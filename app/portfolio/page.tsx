"use client";

import { api } from "@/lib/api";
import { money, pct } from "@/lib/format";
import type { PortfolioRow } from "@/lib/types";
import { PageTitle, StatusPill } from "../components/ui";
import { useApi } from "../components/useApi";

const COLS = ["Portfolio", "Practices", "TPV", "Net Volume", "Refund Rate", "CB Rate", "VAMP", "Status"];

export default function Portfolio() {
  const { data, error, loading } = useApi<PortfolioRow[]>(() => api.portfolios());
  if (loading) return <p style={{ color: "var(--text-sub)" }}>Loading…</p>;
  if (error) return <p style={{ color: "var(--danger)" }}>{error}</p>;
  const rows = data!;

  return (
    <>
      <PageTitle title="Portfolio" subtitle="Performance by portfolio company" />
      <div className="panel">
        <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {COLS.map((h, i) => (
                <th key={h} className="th" style={{ textAlign: i === 0 ? "left" : "right", padding: "10px 20px" }}>
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
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{money(r.measures.net_volume)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{pct(r.measures.refund_rate)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{pct(r.measures.cb_rate)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>{pct(r.measures.vamp)}</td>
                <td style={{ padding: "12px 20px", textAlign: "right" }}>
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
