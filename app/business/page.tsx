"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusinessGrid from "@/components/sections/BusinessGrid";
import CTABanner from "@/components/sections/CTABanner";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    label: "Unit Bisnis",
    h1: "Empat Pilar",
    h1Highlight: "Bisnis Hijau",
    h1Rest: " Renewa",
    desc: "Ekosistem terintegrasi yang menutup full loop dari kredit kendaraan listrik hingga energi terbarukan yang memasok grid nasional.",
  },
  en: {
    label: "Business Units",
    h1: "Renewa's Four",
    h1Highlight: "Green Business",
    h1Rest: " Pillars",
    desc: "An integrated ecosystem that closes the full loop from electric vehicle credit to renewable energy supplying the national grid.",
  },
};

export default function BusinessPage() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 48px", background: "#0B0F0E", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, maxWidth: 700, marginTop: 8 }}>
              {t.h1} <span style={{ color: "#B8F53A" }}>{t.h1Highlight}</span>{t.h1Rest}
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 560, marginTop: 20, fontWeight: 300 }}>
              {t.desc}
            </p>
          </div>
        </section>
        <BusinessGrid />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
