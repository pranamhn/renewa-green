"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLang } from "@/context/LanguageContext";

const statValues = [
  { val: 500, suf: "+" },
  { val: 3, suf: "" },
  { val: 27000, suf: "" },
  { val: 100, suf: "%" },
];

const dict = {
  id: {
    heroDesc: "Pembangunan infrastruktur energi terbarukan Indonesia — tiga sumber energi bersih yang saling melengkapi untuk menjawab kebutuhan energi nasional yang terus tumbuh.",
    statLabels: ["MW Kapasitas Target", "Sumber Energi", "MW Potensi Geothermal ID", "Zero Carbon Operation"],
    secLabel: "Energy Sources",
    h2: "Tiga Pilar Energi Hijau",
    sources: [
      {
        icon: "", badge: "Solar Power",
        title: "PLTS — Panel Surya",
        desc: "Instalasi pembangkit listrik tenaga surya rooftop dan ground-mounted. Melayani segmen residensial, komersial, dan industri dengan skema SPPA dan net metering.",
        features: ["Rooftop & Ground-Mounted", "Skema SPPA & Net Metering", "Monitoring Real-Time", "Integrasi Battery Storage ESS"],
      },
      {
        icon: "", badge: "Geothermal",
        title: "PLTPB — Panas Bumi",
        desc: "Indonesia memiliki potensi panas bumi terbesar ke-2 di dunia (27 GW). Renewa mengembangkan pembangkit geothermal skala menengah di lokasi berpotensi tinggi.",
        features: ["Kapasitas 27 GW Potensi Indonesia", "Kemitraan dengan PLN & ESDM", "Base Load 24/7", "Zero Emisi Operasional"],
      },
      {
        icon: "", badge: "Waste-to-Energy",
        title: "PLTSa — Tenaga Sampah",
        desc: "Solusi ganda: menyelesaikan masalah sampah kota sekaligus menghasilkan listrik bersih. Teknologi gasifikasi dan insinerasi modern dengan standar emisi ketat.",
        features: ["Gasifikasi & Insinerasi Modern", "Standar Emisi Internasional", "Kemitraan Pemda", "Solusi Masalah TPA Kota"],
      },
    ],
  },
  en: {
    heroDesc: "Building Indonesia's renewable energy infrastructure — three complementary clean energy sources to meet the country's growing national energy needs.",
    statLabels: ["MW Capacity Target", "Energy Sources", "MW Geothermal Potential ID", "Zero Carbon Operation"],
    secLabel: "Energy Sources",
    h2: "Three Pillars of Green Energy",
    sources: [
      {
        icon: "", badge: "Solar Power",
        title: "PLTS — Solar Panels",
        desc: "Rooftop and ground-mounted solar power plant installations. Serving residential, commercial, and industrial segments under SPPA and net metering schemes.",
        features: ["Rooftop & Ground-Mounted", "SPPA & Net Metering Scheme", "Real-Time Monitoring", "Battery Storage ESS Integration"],
      },
      {
        icon: "", badge: "Geothermal",
        title: "PLTPB — Geothermal",
        desc: "Indonesia holds the world's 2nd largest geothermal potential (27 GW). Renewa develops mid-scale geothermal plants at high-potential sites.",
        features: ["27 GW Indonesia Potential Capacity", "Partnership with PLN & ESDM", "24/7 Base Load", "Zero Operational Emissions"],
      },
      {
        icon: "", badge: "Waste-to-Energy",
        title: "PLTSa — Waste-to-Energy",
        desc: "A dual solution: solving urban waste problems while generating clean electricity. Modern gasification and incineration technology with strict emission standards.",
        features: ["Modern Gasification & Incineration", "International Emission Standards", "Local Government Partnerships", "Urban Landfill Problem Solved"],
      },
    ],
  },
};

export default function GreenEnergy() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(93,207,138,0.5)", letterSpacing: "2px", marginBottom: 16 }}>04 / Green Energy</p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, maxWidth: 700, marginTop: 8 }}>
              Solar, Geothermal &<br /><span style={{ color: "#B8F53A" }}>Waste-to-Energy Power</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 560, marginTop: 20, fontWeight: 300 }}>
              {t.heroDesc}
            </p>
          </div>
        </section>

        <section style={{ padding: "48px 40px", background: "#000" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {statValues.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24, textAlign: "center" }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 32, fontWeight: 500, color: "#B8F53A" }}><AnimatedCounter end={s.val} suffix={s.suf} /></p>
                <p style={{ fontSize: 13, color: "#7A9E85", marginTop: 8 }}>{t.statLabels[i]}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "80px 40px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.secLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", letterSpacing: -1, marginBottom: 40 }}>{t.h2}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {t.sources.map((e) => (
                <div key={e.title} className="card-hover" style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, position: "relative", overflow: "hidden" }}>
                  <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
                  <div>
                    <div style={{ fontSize: 36, marginBottom: 16 }}>{e.icon}</div>
                    <div style={{ display: "inline-block", background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.3)", borderRadius: 100, padding: "4px 12px", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "#B8F53A" }}>{e.badge}</span>
                    </div>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 12 }}>{e.title}</h3>
                    <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.7, fontWeight: 300 }}>{e.desc}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
                    {e.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8F53A", flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "#F2F5EF" }}>{f}</span>
                      </div>
                    ))}
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
