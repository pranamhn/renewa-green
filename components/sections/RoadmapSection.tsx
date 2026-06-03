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
    <section className="roadmap-section" style={{ padding: "72px 40px", background: "#0B0F0E" }}>
      <style>{`
        .roadmap-scroll::-webkit-scrollbar { height: 4px; }
        .roadmap-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 2px; }
        .roadmap-scroll::-webkit-scrollbar-thumb { background: rgba(184,245,58,0.35); border-radius: 2px; }
        .roadmap-scroll::-webkit-scrollbar-thumb:hover { background: rgba(184,245,58,0.6); }
        @media (max-width: 768px) {
          .roadmap-section { padding: 56px 20px !important; }
          .roadmap-header { flex-direction: column !important; align-items: flex-start !important; gap: 8px !important; margin-bottom: 20px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="Roadmap" />

        <div className="roadmap-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", letterSpacing: -1 }}>
            Journey to <span style={{ color: "#B8F53A" }}>2035</span>
          </h2>
          <Link href="/vision-2035" style={{ fontSize: 16, color: "#B8F53A", textDecoration: "none" }}>{t.cta}</Link>
        </div>

        <div style={{
          background: "#0D2B1E",
          border: "0.5px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          position: "relative",
        }}>
          {/* Right fade — hints at scrollable content */}
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 100,
            background: "linear-gradient(to right, transparent, #0D2B1E)",
            zIndex: 5, pointerEvents: "none", borderRadius: "0 16px 16px 0",
          }} />

          <div className="roadmap-scroll" style={{ overflowX: "auto", paddingBottom: 6 }}>
            <div style={{ display: "flex" }}>
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  style={{
                    flex: "0 0 16.667%",
                    position: "relative",
                    textAlign: "center",
                    background: m.status === "active" ? "rgba(184,245,58,0.025)" : "transparent",
                  }}
                >
                  {/* Active top accent bar */}
                  {m.status === "active" && (
                    <div style={{
                      position: "absolute",
                      top: 0, left: "10%", right: "10%", height: 2,
                      background: "linear-gradient(to right, transparent, #B8F53A 35%, #B8F53A 65%, transparent)",
                      borderRadius: 1,
                    }} />
                  )}

                  {/* Connector — left half */}
                  {i > 0 && (
                    <div style={{
                      position: "absolute",
                      top: 50, left: 0, width: "50%", height: 1,
                      background: "rgba(255,255,255,0.07)",
                    }} />
                  )}
                  {/* Connector — right half */}
                  {i < milestones.length - 1 && (
                    <div style={{
                      position: "absolute",
                      top: 50, left: "50%", right: 0, height: 1,
                      background: "rgba(255,255,255,0.07)",
                    }} />
                  )}

                  <div style={{ padding: "28px 16px 24px" }}>
                    {/* Node */}
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      margin: "0 auto 14px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", zIndex: 1,
                      background: m.status === "active" ? "#B8F53A" : "rgba(255,255,255,0.04)",
                      border: m.status === "active" ? "none" : "1px solid rgba(255,255,255,0.1)",
                      boxShadow: m.status === "active"
                        ? "0 0 0 7px rgba(184,245,58,0.07), 0 0 22px rgba(184,245,58,0.28)"
                        : "none",
                      color: m.status === "active" ? "#0B0F0E" : "rgba(255,255,255,0.2)",
                      fontSize: m.status === "active" ? 14 : 7,
                      fontWeight: 800,
                    }}>
                      {m.status === "active" ? "▶" : "●"}
                    </div>

                    {/* Year */}
                    <p style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: 20,
                      fontWeight: 800,
                      color: m.status === "active" ? "#B8F53A" : "rgba(255,255,255,0.78)",
                      marginBottom: 5,
                      letterSpacing: -0.5,
                    }}>
                      {m.year}
                    </p>

                    {/* Label */}
                    <p style={{
                      fontSize: 16,
                      lineHeight: 1.35,
                      color: m.status === "active" ? "rgba(255,255,255,0.68)" : "rgba(255,255,255,0.35)",
                      marginBottom: 8,
                      minHeight: 34,
                    }}>
                      {m.label}
                    </p>

                    {/* EV count */}
                    <p style={{
                      fontSize: 14,
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 600,
                      color: "#B8F53A",
                      opacity: m.status === "active" ? 1 : 0.5,
                    }}>
                      {m.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
