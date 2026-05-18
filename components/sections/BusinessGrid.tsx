"use client";
import Link from "next/link";
import SectionLabel from "../ui/SectionLabel";
import { useLang } from "@/context/LanguageContext";

const units = [
  {
    num: "01", icon: "", name: "Credit Connect",
    tagline: "Connecting EV Credit to End Users",
    badge: "EV Financing", href: "/business/credit-connect",
    desc: {
      id: "Platform pembiayaan kendaraan listrik roda dua yang menghubungkan lembaga keuangan dengan calon pengguna motor EV. Misi: 100.000 unit motor EV tersalurkan pada 2035.",
      en: "A two-wheeler EV financing platform connecting financial institutions with prospective EV motorcycle users. Mission: distribute 100,000 EV motorcycles by 2035.",
    },
  },
  {
    num: "02", icon: "", name: "Credit Trading",
    tagline: "Carbon Credit from EV Ride Mobility",
    badge: "Carbon Market", href: "/business/credit-trading",
    desc: {
      id: "Platform perdagangan karbon kredit terverifikasi dari aktivitas ride mobility EV. Setiap kilometer perjalanan bebas emisi menghasilkan carbon credit yang dapat diperdagangkan.",
      en: "A verified carbon credit trading platform from EV ride mobility. Every emission-free kilometre generates tradeable carbon credits.",
    },
  },
  {
    num: "03", icon: "", name: "EV Battery Recycling",
    tagline: "From Waste Battery to Solar Energy Support",
    badge: "Circular Economy", href: "/business/recycling",
    desc: {
      id: "Pengolahan baterai bekas kendaraan listrik menjadi komponen pendukung sistem penyimpanan energi untuk panel surya. Circular economy dari limbah menjadi sumber energi baru.",
      en: "Processing used EV batteries into energy storage components for solar panels. A true circular economy — from waste to new energy.",
    },
  },
  {
    num: "04", icon: "", name: "Green Energy",
    tagline: "Solar, Geothermal & Waste-to-Energy Power",
    badge: "Renewable Power", href: "/business/green-energy",
    desc: {
      id: "Pembangkit listrik energi terbarukan: panel surya (PLTS), panas bumi (PLTPB), dan Pembangkit Listrik Tenaga Sampah (PLTSa). Menyuplai kebutuhan energi bersih nasional.",
      en: "Renewable power generation: solar (PLTS), geothermal (PLTPB), and waste-to-energy (PLTSa). Supplying Indonesia's national clean energy needs.",
    },
  },
];

const dict = {
  id: { label: "Unit Bisnis", h2: "Empat Pilar" },
  en: { label: "Business Units", h2: "Four Pillars of" },
};

export default function BusinessGrid() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <section style={{ padding: "96px 40px", background: "#0B0F0E" }}>
      <style>{`
        .biz-card { transition: transform 0.2s ease, border-color 0.2s ease; }
        .biz-card:hover { transform: translateY(-3px); border-color: #2E8B57 !important; }
        .biz-card .accent-bar { transform-origin: left; transform: scaleX(0); transition: transform 0.3s ease; }
        .biz-card:hover .accent-bar { transform: scaleX(1); }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionLabel text={t.label} />
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", letterSpacing: -1, marginBottom: 48, maxWidth: 480 }}>
          {t.h2} <span style={{ color: "#B8F53A" }}>{lang === "id" ? "Bisnis Hijau" : "Green Business"}</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {units.map((u) => (
            <Link key={u.num} href={u.href} style={{ textDecoration: "none" }}>
              <div className="biz-card" style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 32, position: "relative", overflow: "hidden", height: "100%" }}>
                <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A", borderRadius: "12px 12px 0 0" }} />
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(93,207,138,0.35)", letterSpacing: "2px", marginBottom: 16 }}>{u.num}</p>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{u.icon}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 4 }}>{u.name}</h3>
                <p style={{ fontSize: 12, color: "#B8F53A", marginBottom: 12 }}>{u.tagline}</p>
                <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.65, fontWeight: 300 }}>{u.desc[lang]}</p>
                <div style={{ marginTop: 20, display: "inline-block", background: "rgba(184,245,58,0.08)", border: "0.5px solid #B8F53A", borderRadius: 100, padding: "4px 12px" }}>
                  <span style={{ fontSize: 10, color: "#B8F53A" }}>{u.badge}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
