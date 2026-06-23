"use client";

import { api } from "@/lib/api";
import { money, num, pct } from "@/lib/format";
import type { Overview } from "@/lib/types";
import { KpiCard, PageTitle } from "../components/ui";
import { useApi } from "../components/useApi";

export default function Payments() {
  const { data, error, loading } = useApi<Overview>(() => api.overview());
  if (loading) return <p style={{ color: "var(--text-sub)" }}>Loading…</p>;
  if (error) return <p style={{ color: "var(--danger)" }}>{error}</p>;
  const ov = data!;

  return (
    <>
      <PageTitle title="Payments" subtitle="Volume, settlement, and payment mix · Last 30 days" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Gross TPV" value={money(ov.tpv)} />
        <KpiCard label="Net Settled" value={money(ov.net_volume)} />
        <KpiCard label="Transactions" value={num(ov.transactions)} />
        <KpiCard label="Approval Rate" value={pct(ov.approval_rate)} />
        <KpiCard label="Avg Ticket" value={money(ov.avg_ticket)} />
        <KpiCard label="Refund Rate" value={pct(ov.refund_rate)} />
      </div>
      <div className="panel" style={{ padding: 20 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600 }}>Payment Mix — by method</h2>
        <p style={{ fontSize: 12, color: "var(--text-sub)", marginTop: 8 }}>
          Card / ACH / Financing split is pending <code>Transaction.method</code> (ERD change G3); the
          backend models only card brand today. Wired once that field lands.
        </p>
      </div>
    </>
  );
}
