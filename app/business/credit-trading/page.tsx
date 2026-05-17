"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const statValues = [
  { val: 500000, suf: "" },
  { val: 100000, suf: "+" },
  { val: 50, suf: "+" },
];

const dict = {
  id: {
    heroDesc: "Setiap kilometer perjalanan menggunakan motor EV menghasilkan carbon credit terverifikasi. Renewa mengagregasi, memverifikasi, dan memperdagangkan karbon kredit dari ekosistem mobilitas EV.",
    cta1: "Beli Carbon Credit",
    cta2: "Daftarkan Kendaraanmu →",
    statLabels: ["Ton CO₂ Target Offset", "Unit EV Berkontribusi", "Corporate Carbon Buyers"],
    mechLabel: "Mekanisme",
    mechTitle: "Bagaimana Km → Carbon Credit?",
    steps: [
      { num: "01", icon: "", title: "Ride EV", desc: "Pengguna berkendara motor EV. Setiap km dicatat oleh sistem telematics Renewa." },
      { num: "02", icon: "", title: "Kalkulasi Emisi", desc: "Sistem menghitung reduksi emisi vs motor BBM setara. Metodologi Verra / Gold Standard." },
      { num: "03", icon: "", title: "Verifikasi", desc: "Carbon credit diverifikasi oleh auditor independen dan didaftarkan ke IDXCarbon." },
      { num: "04", icon: "", title: "Trading", desc: "Credit siap diperdagangkan ke korporasi yang butuh offset emisi untuk ESG compliance." },
    ],
  },
  en: {
    heroDesc: "Every kilometre ridden on an EV motorcycle generates a verified carbon credit. Renewa aggregates, verifies, and trades carbon credits from the EV mobility ecosystem.",
    cta1: "Buy Carbon Credit",
    cta2: "Register Your Vehicle →",
    statLabels: ["Tons CO₂ Target Offset", "EV Units Contributing", "Corporate Carbon Buyers"],
    mechLabel: "Mechanism",
    mechTitle: "How Does Km → Carbon Credit Work?",
    steps: [
      { num: "01", icon: "", title: "Ride EV", desc: "Users ride an EV motorcycle. Every km is recorded by Renewa's telematics system." },
      { num: "02", icon: "", title: "Emission Calculation", desc: "The system calculates emission reduction vs an equivalent petrol motorcycle. Verra / Gold Standard methodology." },
      { num: "03", icon: "", title: "Verification", desc: "Carbon credits are verified by an independent auditor and registered with IDXCarbon." },
      { num: "04", icon: "", title: "Trading", desc: "Credits are ready to be traded to corporations needing emission offsets for ESG compliance." },
    ],
  },
};

export default function CreditTrading() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(93,207,138,0.5)", letterSpacing: "2px", marginBottom: 16 }}>02 / Credit Trading</p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, maxWidth: 700, marginTop: 8 }}>
              Carbon Credit from<br /><span style={{ color: "#B8F53A" }}>EV Ride Mobility</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 560, marginTop: 20, marginBottom: 40, fontWeight: 300 }}>
              {t.heroDesc}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/contact?cat=carbon" style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 500, background: "#B8F53A", color: "#0D2B1E", textDecoration: "none" }}>{t.cta1}</Link>
              <Link href="/contact?cat=rider" style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 400, background: "transparent", color: "#F2F5EF", textDecoration: "none", border: "0.5px solid rgba(255,255,255,0.2)" }}>{t.cta2}</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "48px 40px", background: "#000" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
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
            <SectionLabel text={t.mechLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", letterSpacing: -1, marginBottom: 40 }}>{t.mechTitle}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {t.steps.map((s) => (
                <div key={s.num} className="card-hover" style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 28, position: "relative", overflow: "hidden" }}>
                  <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(93,207,138,0.4)", letterSpacing: "2px", marginBottom: 12 }}>{s.num}</p>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
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
