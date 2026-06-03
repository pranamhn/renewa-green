"use client";
import AnimatedCounter from "../ui/AnimatedCounter";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    title: "100.000 Unit Motor EV",
    desc: "Target Credit Connect — jangkau 100 ribu pengguna motor listrik di seluruh Indonesia",
    stats: ["Target Unit EV", "Target Year", "Business Pillars"],
  },
  en: {
    title: "100,000 EV Motorcycles",
    desc: "Credit Connect Target — reach 100 thousand electric motorcycle users across Indonesia",
    stats: ["EV Unit Target", "Target Year", "Business Pillars"],
  },
};

const statValues = [
  { value: 100000, suffix: "", noFormat: false },
  { value: 2035, suffix: "", noFormat: true },
  { value: 4, suffix: "", noFormat: false },
];

export default function VisionBanner() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <div className="vision-banner" style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderLeft: "none", borderRight: "none", padding: "32px 40px" }}>
      <style>{`
        @media (max-width: 768px) {
          .vision-banner { padding: 28px 20px !important; }
          .vision-inner { flex-direction: column !important; align-items: flex-start !important; }
          .vision-stats { gap: 24px !important; flex-wrap: wrap !important; width: 100% !important; }
        }
      `}</style>
      <div className="vision-inner" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: 10, color: "#B8F53A", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>● Vision 2035</p>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(20px, 3vw, 28px)", color: "#fff", letterSpacing: -1 }}>
            <span style={{ color: "#B8F53A" }}>{t.title}</span>
          </h2>
          <p style={{ fontSize: 14, color: "#7A9E85", marginTop: 4, fontWeight: 300 }}>{t.desc}</p>
        </div>
        <div className="vision-stats" style={{ display: "flex", gap: 40, flexShrink: 0, flexWrap: "wrap" }}>
          {statValues.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 500, color: "#B8F53A" }}>
                <AnimatedCounter end={s.value} suffix={s.suffix} noFormat={s.noFormat} />
              </p>
              <p style={{ fontSize: 12, color: "#7A9E85", marginTop: 2 }}>{t.stats[i]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
