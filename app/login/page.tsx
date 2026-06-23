"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await login(username, password);
      router.push("/");
    } catch {
      setErr("Invalid credentials");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "80px auto" }}>
      <h1 style={{ fontWeight: 700, fontSize: 24, marginBottom: 4 }}>
        Meda<span style={{ color: "var(--accent)" }}>Vida</span> Partners
      </h1>
      <p style={{ color: "var(--text-sub)", fontSize: 13, marginBottom: 24 }}>Sign in to your partner portal.</p>
      <form onSubmit={submit} className="panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 10, border: "1px solid var(--line)", borderRadius: 8 }} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, border: "1px solid var(--line)", borderRadius: 8 }} />
        {err ? <span style={{ color: "var(--danger)", fontSize: 12 }}>{err}</span> : null}
        <button disabled={busy} type="submit"
          style={{ padding: 10, borderRadius: 8, background: "var(--accent)", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
