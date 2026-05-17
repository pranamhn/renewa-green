"use client";
import SectionLabel from "../ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const milestones = [
  { year: "2026", label: "Credit Connect Pilot",    status: "active", sub: "500 unit EV" },
  { year: "2027", label: "Carbon Credit Go-Live",   status: "future", sub: "2.000 unit EV" },
  { year: "2028", label: "Battery Recycling",       status: "future", sub: "5.000 unit EV" },
  { year: "2029", label: "Regional Expansion",      status: "future", sub: "12.000 unit EV" },
  { year: "2030", label: "Green Energy Grid",       status: "future", sub: "22.000 unit EV" },
  { year: "2031", label: "Geothermal & PLTSa",      status: "future", sub: "35.000 unit EV" },
  { year: "2032", label: "Intl Carbon Trading",     status: "future", sub: "50.000 unit EV" },
  { year: "2033", label: "National Coverage",       status: "future", sub: "68.000 unit EV" },
  { year: "2034", label: "Full Integration",        status: "future", sub: "85.000 unit EV" },
  { year: "2035", label: "Full Ecosystem Maturity", status: "future", sub: "100.000 unit ✓" },
];

const dict = {
  id: { cta: "Lihat Roadmap Lengkap →" },
  en: { cta: "View Full Roadmap →" },
};

export default function RoadmapSection() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <section style={{ padding: "96px 40px", background: "#0B0F0E" }}>
      <style>{`
        .roadmap-scroll::-webkit-scrollbar { height: 4px; }
        .roadmap-scroll::-webkit-scrollbar-track { background: transparent; }
        .roadmap-scroll::-webkit-scrollbar-thumb { background: rgba(184,245,58,0.25); border-radius: 2px; }
        .roadmap-scroll::-webkit-scrollbar-thumb:hover { background: rgba(184,245,58,0.5); }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="Roadmap" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", letterSpacing: -1 }}>
            Journey to <span style={{ color: "#B8F53A" }}>2035</span>
          </h2>
          <Link href="/vision-2030" style={{ fontSize: 13, color: "#B8F53A", textDecoration: "none" }}>{t.cta}</Link>
        </div>

        <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "40px 32px" }}>
          <div
            className="roadmap-scroll"
            style={{ overflowX: "auto", overflowY: "visible", paddingBottom: 8 }}
          >
            <div style={{ position: "relative", display: "flex", minWidth: 800 }}>
              {/* connector line */}
              <div style={{ position: "absolute", top: 14, left: "5%", right: "5%", height: 1, background: "rgba(255,255,255,0.07)" }} />

              {milestones.map((m) => (
                <div key={m.year} style={{ flex: 1, textAlign: "center", position: "relative", minWidth: 80 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", margin: "0 auto 14px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", zIndex: 1,
                    background: m.status === "done" ? "#2E8B57" : m.status === "active" ? "#B8F53A" : "#0B0F0E",
                    border: m.status === "future" ? "1px solid rgba(255,255,255,0.15)" : "none",
                    color: m.status === "active" ? "#0D2B1E" : "#fff",
                    fontFamily: "Syne, sans-serif", fontSize: 10, fontWeight: 700,
                  }}>
                    {m.status === "done" ? "✓" : m.status === "active" ? "▶" : "○"}
                  </div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontSize: 11, fontWeight: 700, color: m.status === "active" ? "#B8F53A" : "#7A9E85", marginBottom: 5 }}>{m.year}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", lineHeight: 1.4, maxWidth: 80, margin: "0 auto 4px" }}>{m.label}</p>
                  <p style={{ fontSize: 9, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace" }}>{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
