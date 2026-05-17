"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    eyebrow: "Bergabung dengan Ekosistem",
    title: <>Wujudkan Indonesia<br />yang Lebih Hijau Bersama Kami</>,
    cta1: "Hubungi Kami",
    cta2: "Ajukan Kredit EV →",
  },
  en: {
    eyebrow: "Join the Ecosystem",
    title: <>Build a Greener Indonesia<br />Together With Us</>,
    cta1: "Contact Us",
    cta2: "Apply for EV Credit →",
  },
};

export default function CTABanner() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <section style={{ padding: "80px 40px", background: "#B8F53A" }}>
      <style>{`
        .cta-btn-dark:hover { background: #0B0F0E !important; }
        .cta-btn-outline:hover { background: rgba(0,0,0,0.06) !important; }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#1A5C35", marginBottom: 12, fontWeight: 500 }}>{t.eyebrow}</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", color: "#0B0F0E", letterSpacing: -1.5, lineHeight: 1.05, maxWidth: 540 }}>
            {t.title}
          </h2>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/contact" className="cta-btn-dark"
            style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 500, background: "#0D2B1E", color: "#F2F5EF", textDecoration: "none", display: "inline-block", transition: "background 0.15s" }}>
            {t.cta1}
          </Link>
          <Link href="/business/credit-connect" className="cta-btn-outline"
            style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 400, background: "transparent", color: "#0D2B1E", textDecoration: "none", border: "1px solid rgba(0,0,0,0.2)", display: "inline-block", transition: "background 0.15s" }}>
            {t.cta2}
          </Link>
        </div>
      </div>
    </section>
  );
}
