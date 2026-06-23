export function KpiCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="panel" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      <span className="kpi-label">{label}</span>
      <span className="kpi-value">{value}</span>
      {sub ? <span style={{ fontSize: 11, color: "var(--text-sub)" }}>{sub}</span> : null}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const cls = status === "Elevated" ? "pill-danger" : status === "Monitor" ? "pill-warn" : "pill-ok";
  return <span className={`pill ${cls}`}>{status}</span>;
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>{title}</h1>
      {subtitle ? <p style={{ fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>{subtitle}</p> : null}
    </div>
  );
}
