"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLang } from "@/context/LanguageContext";
import { Check } from "lucide-react";

const statValues = [
  { val: 100000, suf: "" },
  { val: 500000, suf: "" },
  { val: 10000, suf: "+" },
  { val: 500, suf: "+" },
];

const milestoneBase = [
  { year: "2026", unit: "500 unit EV",      status: "active" },
  { year: "2027", unit: "2.000 unit EV",    status: "future" },
  { year: "2028", unit: "5.000 unit EV",    status: "future" },
  { year: "2029", unit: "12.000 unit EV",   status: "future" },
  { year: "2030", unit: "22.000 unit EV",   status: "future" },
  { year: "2031", unit: "35.000 unit EV",   status: "future" },
  { year: "2032", unit: "50.000 unit EV",   status: "future" },
  { year: "2033", unit: "68.000 unit EV",   status: "future" },
  { year: "2034", unit: "85.000 unit EV",   status: "future" },
  { year: "2035", unit: "100.000 unit EV", status: "future" },
];

const dict = {
  id: {
    h1: "Menuju",
    h1Highlight: "100.000 Unit",
    h1Rest: " Motor EV pada 2035",
    heroDesc: "Komitmen Renewa untuk mewujudkan mobilitas listrik yang inklusif dan berkelanjutan di seluruh Indonesia — satu unit motor pada satu waktu.",
    statLabels: ["Unit EV Target", "Ton CO₂ Offset", "Ton Battery Recycled", "MW Green Energy"],
    roadmapLabel: "Roadmap Detail",
    roadmapTitle: "Milestone",
    roadmapHighlight: "2026 → 2035",
    milestones: [
      { label: "Pendirian & Credit Connect Pilot", detail: "Perusahaan didirikan dengan fokus awal Credit Connect. Pilot program 500 unit motor EV di Jabodetabek." },
      { label: "Carbon Credit Platform Go-Live", detail: "Platform carbon credit resmi beroperasi. 2.000 unit EV tersalurkan. Integrasi dengan IDXCarbon dimulai." },
      { label: "Battery Recycling Facility Operasional", detail: "Fasilitas daur ulang baterai EV pertama beroperasi. Ekosistem circular economy mulai berjalan." },
      { label: "Ekspansi Regional Fase 1", detail: "Coverage diperluas ke 20+ kota. 12.000 unit EV tersalurkan. Kemitraan pembiayaan bertambah." },
      { label: "Integrasi Green Energy Grid", detail: "PLTS pertama grid-connected beroperasi. 22.000 unit EV aktif. Geothermal pipeline dimulai." },
      { label: "Pengembangan Geothermal & PLTSa", detail: "PLTPB dan PLTSa pertama beroperasi. 35.000 unit EV tersalurkan." },
      { label: "Carbon Credit International Trading", detail: "Listing di platform karbon internasional. 50.000 unit EV aktif menghasilkan carbon credit." },
      { label: "Ekspansi Nasional Penuh", detail: "Coverage 50+ kota. 68.000 unit EV tersalurkan. Kapasitas green energy mencapai 300 MW." },
      { label: "Integrasi Ekosistem Penuh", detail: "85.000 unit EV aktif. Circular economy baterai berjalan penuh. ESG baseline established." },
      { label: "Full Ecosystem Maturity", detail: "Target tercapai: 100.000 unit motor EV. Ekosistem penuh beroperasi. ESG Report internasional." },
    ],
  },
  en: {
    h1: "Towards",
    h1Highlight: "100,000 EV",
    h1Rest: " Motorcycles by 2035",
    heroDesc: "Renewa's commitment to realising inclusive and sustainable electric mobility across Indonesia — one motorcycle unit at a time.",
    statLabels: ["EV Unit Target", "Tons CO₂ Offset", "Tons Battery Recycled", "MW Green Energy"],
    roadmapLabel: "Detailed Roadmap",
    roadmapTitle: "Milestones",
    roadmapHighlight: "2026 → 2035",
    milestones: [
      { label: "Founding & Credit Connect Pilot", detail: "Company founded with an initial focus on Credit Connect. Pilot programme of 500 EV motorcycles in Greater Jakarta." },
      { label: "Carbon Credit Platform Go-Live", detail: "Carbon credit platform officially launched. 2,000 EV units distributed. IDXCarbon integration begins." },
      { label: "Battery Recycling Facility Operational", detail: "First EV battery recycling facility operational. Circular economy ecosystem begins running." },
      { label: "Regional Expansion Phase 1", detail: "Coverage expanded to 20+ cities. 12,000 EV units distributed. Financing partnerships grow." },
      { label: "Green Energy Grid Integration", detail: "First grid-connected PLTS operational. 22,000 active EV units. Geothermal pipeline commences." },
      { label: "Geothermal & PLTSa Development", detail: "First PLTPB and PLTSa operational. 35,000 EV units distributed." },
      { label: "Carbon Credit International Trading", detail: "Listed on international carbon platforms. 50,000 active EV units generating carbon credits." },
      { label: "Full National Coverage", detail: "Coverage in 50+ cities. 68,000 EV units distributed. Green energy capacity reaches 300 MW." },
      { label: "Full Ecosystem Integration", detail: "85,000 active EV units. Battery circular economy fully operational. ESG baseline established." },
      { label: "Full Ecosystem Maturity", detail: "Target achieved: 100,000 EV motorcycles. Full ecosystem operational. International ESG Report." },
    ],
  },
};

export default function Vision2030() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text="Vision 2035" />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 6vw, 64px)", color: "#fff", letterSpacing: -2, lineHeight: 1.04, maxWidth: 800, marginTop: 8 }}>
              {t.h1} <span style={{ color: "#B8F53A" }}>{t.h1Highlight}</span>{t.h1Rest}
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 560, marginTop: 20, fontWeight: 300 }}>
              {t.heroDesc}
            </p>
          </div>
        </section>

        <section style={{ padding: "64px 40px", background: "#000" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {statValues.map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px", textAlign: "center" }}>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 36, fontWeight: 500, color: "#B8F53A" }}>
                    <AnimatedCounter end={s.val} suffix={s.suf} />
                  </p>
                  <p style={{ fontSize: 13, color: "#7A9E85", marginTop: 8 }}>{t.statLabels[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 40px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <SectionLabel text={t.roadmapLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: "#fff", letterSpacing: -1, marginBottom: 48 }}>
              {t.roadmapTitle} <span style={{ color: "#B8F53A" }}>{t.roadmapHighlight}</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {milestoneBase.map((m, i) => (
                <div key={m.year} style={{ display: "flex", gap: 24 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 40 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1,
                      background: m.status === "done" ? "#2E8B57" : m.status === "active" ? "#B8F53A" : "#0D2B1E",
                      border: m.status === "future" ? "0.5px solid rgba(255,255,255,0.15)" : "none",
                      color: m.status === "active" ? "#0D2B1E" : "#fff",
                      fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700,
                    }}>
                      {m.status === "done" ? <Check size={14} /> : i + 1}
                    </div>
                    {i < milestoneBase.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.07)", margin: "4px 0" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: 40 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: m.status === "active" ? "#B8F53A" : "#7A9E85", fontWeight: 500 }}>{m.year}</span>
                      <span style={{ background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.3)", borderRadius: 100, padding: "2px 10px", fontSize: 10, color: "#B8F53A" }}>{m.unit}</span>
                    </div>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 8 }}>{t.milestones[i].label}</h3>
                    <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.65, fontWeight: 300 }}>{t.milestones[i].detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
