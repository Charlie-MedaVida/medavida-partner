"use client";

import { api } from "@/lib/api";
import { money, num, pct } from "@/lib/format";
import type { Overview } from "@/lib/types";
import { KpiCard, PageTitle } from "../components/ui";
import { useApi } from "../components/useApi";

export default function Risk() {
  const { data, error, loading } = useApi<Overview>(() => api.overview());
  if (loading) return <p style={{ color: "var(--text-sub)" }}>Loading…</p>;
  if (error) return <p style={{ color: "var(--danger)" }}>{error}</p>;
  const ov = data!;

  return (
    <>
      <PageTitle title="Risk & Disputes" subtitle="Chargebacks, refunds, and VAMP · Last 30 days" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 20 }}>
        <KpiCard label="Chargeback Volume" value={money(ov.cb_volume)} />
        <KpiCard label="Chargeback Rate" value={pct(ov.cb_rate)} />
        <KpiCard label="Chargeback Count" value={num(ov.cb_count)} />
        <KpiCard label="Refund Volume" value={money(ov.refund_volume)} />
        <KpiCard label="Refund Rate" value={pct(ov.refund_rate)} />
        <KpiCard label="VAMP" value={pct(ov.vamp)} />
      </div>
      <div className="panel" style={{ padding: 20 }}>
        <h2 style={{ fontSize: 13, fontWeight: 600 }}>Dispute detail</h2>
        <p style={{ fontSize: 12, color: "var(--text-sub)", marginTop: 8 }}>
          Individual dispute / transaction records are <strong>MedaVida-internal only</strong> — partners
          see rolled-up risk metrics (aggregates-only policy). Counts and rates above reflect your scope.
        </p>
      </div>
    </>
  );
}
