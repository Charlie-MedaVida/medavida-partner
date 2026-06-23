"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

const LINKS = [
  { href: "/", label: "Performance" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/payments", label: "Payments" },
  { href: "/risk", label: "Risk & Disputes" },
  { href: "/revenue-share", label: "Revenue Share" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/login") return null;

  return (
    <header
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--line)",
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        height: 56,
        gap: 24,
      }}
    >
      <span style={{ fontWeight: 700 }}>
        Meda<span style={{ color: "var(--accent)" }}>Vida</span>
      </span>
      <nav style={{ display: "flex", gap: 4, flex: 1 }}>
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                padding: "6px 12px",
                borderRadius: 8,
                color: active ? "var(--text)" : "var(--text-sub)",
                background: active ? "var(--fill)" : "transparent",
                fontWeight: active ? 600 : 400,
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        style={{ fontSize: 13, color: "var(--text-sub)", background: "none", border: "none", cursor: "pointer" }}
      >
        Sign out
      </button>
    </header>
  );
}
