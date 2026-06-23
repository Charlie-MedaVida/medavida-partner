// Partner users are Django Users → JWT via the backend SimpleJWT endpoints.
// Access token kept in localStorage (this surface holds no patient/clinical data).
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const ACCESS = "mv_partner_access";
const REFRESH = "mv_partner_refresh";

export function getAccess(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(ACCESS) : null;
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = (await res.json()) as { access: string; refresh: string };
  localStorage.setItem(ACCESS, data.access);
  localStorage.setItem(REFRESH, data.refresh);
}

export async function refresh(): Promise<boolean> {
  const token = typeof window !== "undefined" ? localStorage.getItem(REFRESH) : null;
  if (!token) return false;
  const res = await fetch(`${API_BASE}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: token }),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { access: string };
  localStorage.setItem(ACCESS, data.access);
  return true;
}

export function logout(): void {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
}
