import type { Metadata } from "next";
import "./globals.css";
import TopNav from "./components/TopNav";

export const metadata: Metadata = {
  title: "MedaVida — Partner Portal",
  description: "Referral partner performance, portfolios, and earnings.",
  // External partner surface — never index.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 48px" }}>{children}</main>
      </body>
    </html>
  );
}
