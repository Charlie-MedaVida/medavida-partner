# medavida-partner

Referral Partner Portal — read-mostly dashboards for referral partners (PE firms,
SaaS platforms, RCM partners) over their referred practices' payment performance.

- **Stack:** Next.js 15 (App Router) · React 19 · Tailwind 4 · pnpm · TypeScript (mirrors `medavida-patient`).
- **Backend:** consumes **`/api/v1/partner/`** (the `partners` app). **Aggregates only** — no
  patient/clinical data, no transaction-level rows; the API scopes every response to the caller's
  `PartnerMembership` server-side.
- **Auth:** partner users are Django Users → JWT via `/api/token/` (see `lib/auth.ts`).

## Run
```bash
pnpm install
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 pnpm dev   # http://localhost:3003
```

## Screens (`app/`)
| Route | Endpoint | Notes |
|---|---|---|
| `/` Performance | `overview` + `portfolios` | KPI row + portfolio table |
| `/portfolio` | `portfolios` | per-PortCo aggregate table |
| `/payments` | `overview` | Payment-Mix donut pending `Transaction.method` (G3) |
| `/risk` | `overview` | aggregate risk KPIs; dispute detail is MedaVida-internal |
| `/revenue-share` | `revenue-share` | attributed earnings + breakdown lines |

Design system: tokens mirror the published MedaVida DS Figma library (Inter, orange accent). The 5
high-fidelity screens are designed in Figma (`WIrlL0a5HaQzQf2StgmXbN`); this scaffold wires them to live
data. Charts (`recharts`) to be built out next.

Design rationale: `MedaVida-Brain/PROPOSAL-partner-portal.md` + `SPEC-partner-dashboard-chart-calculations.md`.
