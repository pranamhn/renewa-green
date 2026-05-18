"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    h1a: "Perbarui Masa Depan.",
    h1b: "Tenagakan Bangsa.",
    desc: "Ekosistem bisnis hijau terintegrasi — dari kredit EV hingga energi terbarukan. Satu platform, satu misi: Indonesia yang lebih bersih dan berkelanjutan.",
    cta1: "Jelajahi Bisnis",
    cta2: "Visi 2035 →",
    scroll: "Gulir",
    stats: [
      { num: "100K", label: "Target Unit EV 2035", sub: "Credit Connect" },
      { num: "4", label: "Pilar Bisnis Hijau", sub: "Terintegrasi" },
      { num: "2035", label: "Target Pencapaian", sub: "Full Ecosystem" },
    ],
  },
  en: {
    h1a: "Renew the Future.",
    h1b: "Power the Nation.",
    desc: "An integrated green business ecosystem — from EV credit to renewable energy. One platform, one mission: a cleaner, more sustainable Indonesia.",
    cta1: "Explore Business",
    cta2: "Vision 2035 →",
    scroll: "Scroll",
    stats: [
      { num: "100K", label: "EV Unit Target 2035", sub: "Credit Connect" },
      { num: "4", label: "Green Business Pillars", sub: "Integrated" },
      { num: "2035", label: "Achievement Target", sub: "Full Ecosystem" },
    ],
  },
};

export default function HeroSection() {
  const lang = useLang();
  const t = dict[lang];
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (h1Ref.current) {
      h1Ref.current.style.opacity = "0";
      h1Ref.current.style.transform = "translateY(32px)";
      setTimeout(() => {
        if (h1Ref.current) {
          h1Ref.current.style.transition = "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)";
          h1Ref.current.style.opacity = "1";
          h1Ref.current.style.transform = "translateY(0)";
        }
      }, 200);
    }
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 40px 80px" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `radial-gradient(circle at 20% 50%, rgba(26,92,53,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(184,245,58,0.04) 0%, transparent 50%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(26,92,53,0.2)", border: "0.5px solid #2E8B57", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8F53A", display: "inline-block", animation: "pulseDot 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B8F53A", fontWeight: 500 }}>PT Renewa Green Energy</span>
        </div>

        <h1 ref={h1Ref} style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1.02, letterSpacing: "-3px", color: "#fff", marginBottom: 24, maxWidth: 720 }}>
          {t.h1a}<br />
          <span style={{ color: "#B8F53A" }}>{t.h1b}</span>
        </h1>

        <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 520, marginBottom: 40, fontWeight: 300 }}>
          {t.desc}
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/business"
            style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 500, background: "#B8F53A", color: "#0D2B1E", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.15s" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#D4F87A")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#B8F53A")}>
            {t.cta1}
          </Link>
          <Link href="/vision-2035"
            style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 400, background: "transparent", color: "#F2F5EF", textDecoration: "none", border: "0.5px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: 8, transition: "background 0.15s" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
            {t.cta2}
          </Link>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 64, paddingTop: 40, borderTop: "0.5px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
          {t.stats.map((s) => (
            <div key={s.num}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 500, color: "#B8F53A", lineHeight: 1 }}>{s.num}</p>
              <p style={{ fontSize: 13, color: "#F2F5EF", marginTop: 4 }}>{s.label}</p>
              <p style={{ fontSize: 11, color: "#7A9E85", marginTop: 2 }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeUp 1s ease 1s forwards", opacity: 0 }}>
        <span style={{ fontSize: 10, color: "#7A9E85", letterSpacing: "2px", textTransform: "uppercase" }}>{t.scroll}</span>
        <ArrowDown size={14} color="#7A9E85" />
      </div>
    </section>
  );
}
