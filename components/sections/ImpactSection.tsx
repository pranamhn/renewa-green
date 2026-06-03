"use client";
import SectionLabel from "../ui/SectionLabel";
import AnimatedCounter from "../ui/AnimatedCounter";
import { useLang } from "@/context/LanguageContext";

const impactValues = [
  { value: 100000, suffix: "", unit: "Unit" },
  { value: 500000, suffix: "", unit: "Ton" },
  { value: 10000, suffix: "+", unit: "Ton" },
  { value: 500, suffix: "+", unit: "MW" },
];

const dict = {
  id: {
    h2: "Target Dampak Nyata",
    impacts: [
      { label: "Motor EV Target", sub: "Credit Connect 2035" },
      { label: "CO₂ Direduksi", sub: "Emisi terhindar dari EV" },
      { label: "Battery Recycled", sub: "Limbah B3 diproses" },
      { label: "Green Energy", sub: "Kapasitas terpasang" },
    ],
  },
  en: {
    h2: "Real Impact Targets",
    impacts: [
      { label: "EV Motorcycle Target", sub: "Credit Connect 2035" },
      { label: "CO₂ Reduced", sub: "Emissions avoided from EV" },
      { label: "Battery Recycled", sub: "Hazardous waste processed" },
      { label: "Green Energy", sub: "Installed capacity" },
    ],
  },
};

export default function ImpactSection() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <section id="impact" className="impact-section" style={{ padding: "96px 40px", background: "#000" }}>
      <style>{`
        @media (max-width: 768px) {
          .impact-section { padding: 64px 20px !important; }
          .impact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .impact-num { font-size: 28px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text="Impact 2035" />
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", letterSpacing: -1, marginBottom: 48 }}>
          Target <span style={{ color: "#B8F53A" }}>{lang === "id" ? "Dampak Nyata" : "Real Impact"}</span>
        </h2>
        <div className="impact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {impactValues.map((iv, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <p className="impact-num" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 40, fontWeight: 500, color: "#B8F53A", lineHeight: 1 }}>
                <AnimatedCounter end={iv.value} suffix={iv.suffix} />
              </p>
              <p style={{ fontSize: 13, color: "#7A9E85", marginTop: 4 }}>{iv.unit}</p>
              <p style={{ fontSize: 15, color: "#F2F5EF", fontWeight: 500, marginTop: 12 }}>{t.impacts[i].label}</p>
              <p style={{ fontSize: 12, color: "#7A9E85", marginTop: 4, fontWeight: 300 }}>{t.impacts[i].sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
