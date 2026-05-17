"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLang } from "@/context/LanguageContext";

const statValues = [
  { val: 10000, suf: "+" },
  { val: 50, suf: "+" },
  { val: 80, suf: "%" },
];

const dict = {
  id: {
    heroDesc: "Pengolahan baterai bekas kendaraan listrik menjadi komponen pendukung sistem penyimpanan energi untuk panel surya. Circular economy sejati — dari limbah menjadi sumber energi baru.",
    statLabels: ["Ton Battery Target", "Collection Points", "Material Recovery Rate"],
    secLabel: "Proses Daur Ulang",
    h2: "4 Tahap Circular Economy",
    steps: [
      { num: "01", icon: "", title: "Collection", desc: "Pengambilan baterai bekas dari pengguna EV melalui jaringan collection point di 50+ kota." },
      { num: "02", icon: "", title: "Dismantling", desc: "Pembongkaran baterai secara aman di fasilitas bersertifikat. Pemisahan komponen layak pakai." },
      { num: "03", icon: "", title: "Refurbishment", desc: "Sel baterai yang masih memiliki kapasitas >70% direfurbish untuk second-life application." },
      { num: "04", icon: "", title: "Solar Integration", desc: "Baterai refurbish diintegrasikan sebagai Energy Storage System (ESS) untuk instalasi panel surya." },
    ],
  },
  en: {
    heroDesc: "Processing used EV batteries into energy storage components for solar panels. A true circular economy — from waste to a new energy source.",
    statLabels: ["Ton Battery Target", "Collection Points", "Material Recovery Rate"],
    secLabel: "Recycling Process",
    h2: "4 Stages of Circular Economy",
    steps: [
      { num: "01", icon: "", title: "Collection", desc: "Collection of used batteries from EV users through a network of collection points in 50+ cities." },
      { num: "02", icon: "", title: "Dismantling", desc: "Safe battery disassembly at certified facilities. Separation of reusable components." },
      { num: "03", icon: "", title: "Refurbishment", desc: "Battery cells with remaining capacity >70% are refurbished for second-life applications." },
      { num: "04", icon: "", title: "Solar Integration", desc: "Refurbished batteries are integrated as an Energy Storage System (ESS) for solar panel installations." },
    ],
  },
};

export default function Recycling() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(93,207,138,0.5)", letterSpacing: "2px", marginBottom: 16 }}>03 / EV Battery Recycling</p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, maxWidth: 700, marginTop: 8 }}>
              From Waste Battery to<br /><span style={{ color: "#B8F53A" }}>Solar Energy Support</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 560, marginTop: 20, fontWeight: 300 }}>
              {t.heroDesc}
            </p>
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
            <SectionLabel text={t.secLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", letterSpacing: -1, marginBottom: 40 }}>{t.h2}</h2>
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
