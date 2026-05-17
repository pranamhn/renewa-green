"use client";
import { useLang } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Link from "next/link";

const statValues = [
  { val: 100000, suf: "" },
  { val: 5000, suf: "+" },
  { val: 20, suf: "+" },
  { val: 15, suf: "+" },
];

const dict = {
  id: {
    heroDesc: "Platform pembiayaan kendaraan listrik roda dua terbesar di Indonesia. Menghubungkan lembaga keuangan dengan jutaan calon pengguna motor EV di seluruh nusantara.",
    heroCta: "Ajukan Kredit EV Sekarang",
    statLabels: ["Target Unit 2030", "Unit Tersalurkan", "Mitra Pembiayaan", "Kota Coverage"],
    howLabel: "How It Works",
    howTitle: "Cara Kerja Credit Connect",
    steps: [
      { num: "01", title: "Ajukan Kredit", desc: "Isi formulir online, upload dokumen persyaratan. Proses cepat, tanpa perlu datang ke kantor." },
      { num: "02", title: "Verifikasi & Approval", desc: "Sistem menghubungkan pengajuan ke mitra lembaga pembiayaan terpilih. Approval dalam 1×24 jam." },
      { num: "03", title: "Terima Motor EV", desc: "Motor EV dikirim ke alamat Anda. Mulai berkendara ramah lingkungan dan hasilkan carbon credit." },
    ],
  },
  en: {
    heroDesc: "Indonesia's largest two-wheeler EV financing platform. Connecting financial institutions with millions of prospective EV motorcycle users across the archipelago.",
    heroCta: "Apply for EV Credit Now",
    statLabels: ["Target Units 2030", "Units Deployed", "Financing Partners", "Cities Covered"],
    howLabel: "How It Works",
    howTitle: "How Credit Connect Works",
    steps: [
      { num: "01", title: "Apply for Credit", desc: "Fill in the online form and upload required documents. Fast process, no need to visit our office." },
      { num: "02", title: "Verification & Approval", desc: "Our system connects your application to selected financing partners. Approval within 24 hours." },
      { num: "03", title: "Receive Your EV", desc: "The EV motorcycle is delivered to your address. Start riding green and earn carbon credits." },
    ],
  },
};

export default function CreditConnect() {
  const lang = useLang();
  const t = dict[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(93,207,138,0.5)", letterSpacing: "2px", marginBottom: 16 }}>01 / Credit Connect</p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, maxWidth: 700, marginTop: 8 }}>
              Connecting EV Credit<br />to <span style={{ color: "#B8F53A" }}>End Users</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, maxWidth: 560, marginTop: 20, marginBottom: 40, fontWeight: 300 }}>
              {t.heroDesc}
            </p>
            <Link href="/contact" style={{ padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 500, background: "#B8F53A", color: "#0D2B1E", textDecoration: "none", display: "inline-block" }}>
              {t.heroCta}
            </Link>
          </div>
        </section>

        <section style={{ padding: "48px 40px", background: "#000" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {statValues.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24, textAlign: "center" }}>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 32, fontWeight: 500, color: "#B8F53A" }}>
                  <AnimatedCounter end={s.val} suffix={s.suf} />
                </p>
                <p style={{ fontSize: 13, color: "#7A9E85", marginTop: 8 }}>{t.statLabels[i]}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "80px 40px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.howLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 36, color: "#fff", letterSpacing: -1, marginBottom: 40 }}>
              {t.howTitle}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {t.steps.map((s) => (
                <div key={s.num} className="card-hover" style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 32, position: "relative", overflow: "hidden" }}>
                  <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#B8F53A", letterSpacing: "2px", marginBottom: 20 }}>{s.num}</p>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.65, fontWeight: 300 }}>{s.desc}</p>
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
