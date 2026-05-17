"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLang } from "@/context/LanguageContext";

const values = [
  {
    icon: "", title: "Sustainability First",
    desc: {
      id: "Setiap keputusan bisnis diukur dari dampak lingkungan jangka panjang, bukan hanya profitabilitas jangka pendek.",
      en: "Every business decision is measured by long-term environmental impact, not just short-term profitability.",
    },
  },
  {
    icon: "", title: "Integrated Ecosystem",
    desc: {
      id: "Kami percaya solusi terbaik lahir dari koneksi antar elemen — kredit, karbon, daur ulang, dan energi saling memperkuat.",
      en: "We believe the best solutions emerge from connections — credit, carbon, recycling, and energy mutually reinforcing one another.",
    },
  },
  {
    icon: "", title: "Data-Driven Impact",
    desc: {
      id: "Setiap ton CO₂ yang direduksi, setiap unit EV tersalurkan, setiap kilowatt energi hijau dihasilkan — semua terukur.",
      en: "Every ton of CO₂ reduced, every EV unit deployed, every kilowatt of green energy generated — all measurable.",
    },
  },
  {
    icon: "", title: "Indonesia-Centric",
    desc: {
      id: "Solusi yang kami bangun dirancang khusus untuk konteks Indonesia — dari regulasi, infrastruktur, hingga perilaku konsumen lokal.",
      en: "The solutions we build are designed specifically for the Indonesian context — from regulations and infrastructure to local consumer behaviour.",
    },
  },
];

const dict = {
  id: {
    h1Tag: "01 / About",
    h1: "Membangun Ekosistem Energi Hijau",
    h1Highlight: "Pertama Indonesia",
    storyLabel: "Our Story",
    h2Story: "Kenapa Renewa?",
    p1: "PT Renewa Green Energy lahir dari keyakinan bahwa transisi energi Indonesia tidak bisa diselesaikan oleh satu solusi tunggal. Dibutuhkan ekosistem di mana kredit kendaraan listrik, perdagangan karbon, daur ulang baterai, dan pembangkit energi terbarukan saling terhubung dan saling menguatkan.",
    p2: "Renewa adalah upaya menjawab tantangan itu. Kami membangun platform terintegrasi yang menutup full loop dari pengguna motor EV di jalanan hingga energi bersih yang mengalir ke grid nasional.",
    missionLabel: "Our Mission",
    h2Mission: "Misi Kami",
    missions: [
      "Menyalurkan 100.000 unit motor EV ke masyarakat Indonesia pada 2030",
      "Mereduksi 500.000 ton emisi CO₂ melalui ekosistem EV mobility",
      "Membangun infrastruktur energi terbarukan yang merata dan terjangkau",
      "Menciptakan circular economy baterai EV yang bertanggung jawab",
    ],
    valuesLabel: "Our Values",
    h2Values: "Nilai yang",
    h2ValuesHighlight: "Menggerakkan Kami",
  },
  en: {
    h1Tag: "01 / About",
    h1: "Building Indonesia's First",
    h1Highlight: "Integrated Green Energy Ecosystem",
    storyLabel: "Our Story",
    h2Story: "Why Renewa?",
    p1: "PT Renewa Green Energy was founded on the belief that Indonesia's energy transition cannot be solved by a single solution. It requires an ecosystem where EV credit, carbon trading, battery recycling, and renewable power generation are interconnected and mutually reinforcing.",
    p2: "Renewa is our answer to that challenge. We are building an integrated platform that closes the full loop from EV motorcycle users on the road to clean energy flowing into the national grid.",
    missionLabel: "Our Mission",
    h2Mission: "Our Mission",
    missions: [
      "Distribute 100,000 EV motorcycles to Indonesian society by 2030",
      "Reduce 500,000 tons of CO₂ emissions through the EV mobility ecosystem",
      "Build equitable and affordable renewable energy infrastructure",
      "Create a responsible circular economy for EV batteries",
    ],
    valuesLabel: "Our Values",
    h2Values: "The Values That",
    h2ValuesHighlight: "Drive Us",
  },
};

export default function About() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text="About Renewa" />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, maxWidth: 700, marginTop: 8 }}>
              {t.h1} <span style={{ color: "#B8F53A" }}>{t.h1Highlight}</span>
            </h1>
          </div>
        </section>

        <section style={{ padding: "64px 40px", background: "#0D2B1E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <div>
              <SectionLabel text={t.storyLabel} />
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 32, color: "#fff", letterSpacing: -1, marginBottom: 20 }}>{t.h2Story}</h2>
              <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.8, marginBottom: 16, fontWeight: 300 }}>{t.p1}</p>
              <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.8, fontWeight: 300 }}>{t.p2}</p>
            </div>
            <div>
              <SectionLabel text={t.missionLabel} />
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 32, color: "#fff", letterSpacing: -1, marginBottom: 20 }}>{t.h2Mission}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {t.missions.map((m, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#B8F53A", marginTop: 2, flexShrink: 0 }}>0{i + 1}</span>
                    <p style={{ fontSize: 15, color: "#F2F5EF", lineHeight: 1.6 }}>{m}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "80px 40px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.valuesLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: "#fff", letterSpacing: -1, marginBottom: 40 }}>
              {t.h2Values} <span style={{ color: "#B8F53A" }}>{t.h2ValuesHighlight}</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {values.map((v) => (
                <div key={v.title} style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 28 }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.65, fontWeight: 300 }}>{v.desc[lang]}</p>
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
