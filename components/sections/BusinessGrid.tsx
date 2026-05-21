"use client";
import Link from "next/link";
import SectionLabel from "../ui/SectionLabel";
import { useLang } from "@/context/LanguageContext";

const units = [
  {
    num: "01", icon: "", name: "Credit Connect",
    tagline: { id: "Kredit EV untuk Pengguna Akhir", en: "Connecting EV Credit to End Users" },
    badge: { id: "Pembiayaan EV", en: "EV Financing" },
    href: "/business/credit-connect",
    desc: {
      id: "Platform pembiayaan kendaraan listrik roda dua yang menghubungkan lembaga keuangan dengan calon pengguna motor EV. Misi: 100.000 unit motor EV tersalurkan pada 2035.",
      en: "A two-wheeler EV financing platform connecting financial institutions with prospective EV motorcycle users. Mission: distribute 100,000 EV motorcycles by 2035.",
    },
  },
  {
    num: "02", icon: "", name: "Credit Trading",
    tagline: { id: "Karbon Kredit dari Mobilitas EV", en: "Carbon Credit from EV Ride Mobility" },
    badge: { id: "Pasar Karbon", en: "Carbon Market" },
    href: "/business/credit-trading",
    desc: {
      id: "Platform perdagangan karbon kredit terverifikasi dari aktivitas ride mobility EV. Setiap kilometer perjalanan bebas emisi menghasilkan carbon credit yang dapat diperdagangkan.",
      en: "A verified carbon credit trading platform from EV ride mobility. Every emission-free kilometre generates tradeable carbon credits.",
    },
  },
  {
    num: "03", icon: "", name: "EV Battery Recycling",
    tagline: { id: "Daur Ulang Baterai ke Energi Surya", en: "From Waste Battery to Solar Energy Support" },
    badge: { id: "Ekonomi Sirkular", en: "Circular Economy" },
    href: "/business/recycling",
    desc: {
      id: "Pengolahan baterai bekas kendaraan listrik menjadi komponen pendukung sistem penyimpanan energi untuk panel surya. Circular economy dari limbah menjadi sumber energi baru.",
      en: "Processing used EV batteries into energy storage components for solar panels. A true circular economy — from waste to new energy.",
    },
  },
  {
    num: "04", icon: "", name: "Green Energy",
    tagline: { id: "Surya, Geothermal & Sampah ke Energi", en: "Solar, Geothermal & Waste-to-Energy Power" },
    badge: { id: "Energi Terbarukan", en: "Renewable Power" },
    href: "/business/green-energy",
    desc: {
      id: "Pembangkit listrik energi terbarukan: panel surya (PLTS), panas bumi (PLTPB), dan Pembangkit Listrik Tenaga Sampah (PLTSa). Menyuplai kebutuhan energi bersih nasional.",
      en: "Renewable power generation: solar (PLTS), geothermal (PLTPB), and waste-to-energy (PLTSa). Supplying Indonesia's national clean energy needs.",
    },
  },
];

const dict = {
  id: { label: "Unit Bisnis", h2: "Empat Pilar", h2Accent: "Bisnis Hijau", cta: "Pelajari Lebih →" },
  en: { label: "Business Units", h2: "Four Pillars of", h2Accent: "Green Business", cta: "Explore →" },
};

export default function BusinessGrid() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <section style={{ padding: "96px 40px", background: "#0B0F0E" }}>
      <style>{`
        .biz-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          display: flex; flex-direction: column;
        }
        .biz-card:hover { transform: translateY(-4px); border-color: rgba(46,139,87,0.6) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
        .biz-card .accent-bar { transform-origin: left; transform: scaleX(0); transition: transform 0.35s ease; }
        .biz-card:hover .accent-bar { transform: scaleX(1); }
        .biz-cta { transition: background 0.2s ease, color 0.2s ease, gap 0.2s ease; display: inline-flex; align-items: center; gap: 6px; }
        .biz-card:hover .biz-cta { background: rgba(184,245,58,0.15) !important; gap: 10px !important; }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text={t.label} />
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)", color: "#fff", letterSpacing: -1, marginBottom: 56, maxWidth: 520 }}>
          {t.h2} <span style={{ color: "#B8F53A" }}>{t.h2Accent}</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {units.map((u) => (
            <div key={u.num} className="biz-card" style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "36px 36px 28px", position: "relative", overflow: "hidden" }}>
              <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#B8F53A,#2E8B57)", borderRadius: "16px 16px 0 0" }} />

              {/* Header row: number + badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(184,245,58,0.4)", letterSpacing: "3px" }}>{u.num}</span>
                <span style={{ fontSize: 11, color: "#B8F53A", background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.25)", borderRadius: 100, padding: "3px 10px", letterSpacing: "0.5px" }}>
                  {u.badge[lang]}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#F2F5EF", marginBottom: 6, letterSpacing: -0.5, lineHeight: 1.2 }}>
                {u.name}
              </h3>

              {/* Tagline */}
              <p style={{ fontSize: 14, color: "#B8F53A", marginBottom: 16, fontWeight: 400, lineHeight: 1.4 }}>
                {u.tagline[lang]}
              </p>

              {/* Description */}
              <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300, flexGrow: 1 }}>
                {u.desc[lang]}
              </p>

              {/* CTA Button */}
              <div style={{ marginTop: 28 }}>
                <Link href={u.href} style={{ textDecoration: "none" }}>
                  <span className="biz-cta" style={{ background: "rgba(184,245,58,0.07)", border: "0.5px solid rgba(184,245,58,0.35)", borderRadius: 100, padding: "9px 18px", fontSize: 13, color: "#B8F53A", fontWeight: 500, cursor: "pointer" }}>
                    {t.cta}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
