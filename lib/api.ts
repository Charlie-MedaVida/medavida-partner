// Thin client for /api/v1/partner (aggregates-only; scoped server-side to the
// caller's membership). Bearer JWT from lib/auth; one transparent refresh on 401.
import { getAccess, refresh } from "./auth";
import type { Overview, PortfolioRow, RevenueShare } from "./types";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function req<T>(path: string, retry = true): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${getAccess() ?? ""}` },
  });
  if (res.status === 401 && retry && (await refresh())) return req<T>(path, false);
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new ApiError((data as { detail?: string })?.detail || `Request failed (${res.status})`, res.status);
  }
  return data as T;
}

function qs(params: Record<string, string | undefined>): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) p.set(k, v);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const api = {
  overview: (scope: Record<string, string | undefined> = {}) =>
    req<Overview>(`/api/v1/partner/overview/${qs(scope)}`),
  portfolios: (scope: Record<string, string | undefined> = {}) =>
    req<PortfolioRow[]>(`/api/v1/partner/portfolios/${qs(scope)}`),
  revenueShare: () => req<RevenueShare>(`/api/v1/partner/revenue-share/`),
};
