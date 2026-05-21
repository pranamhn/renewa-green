"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Leaf, Zap, TrendingUp, Laptop, BookOpen, Globe } from "lucide-react";

const openings = [
  {
    id: 1,
    dept: { id: "Teknologi", en: "Technology" },
    title: "Full-Stack Engineer (EV Credit Platform)",
    type: { id: "Penuh Waktu", en: "Full-time" },
    level: { id: "Mid–Senior", en: "Mid–Senior" },
    location: "Jakarta, Indonesia",
    desc: {
      id: "Membangun dan mengembangkan platform Credit Connect — sistem pembiayaan EV yang menghubungkan 20+ lembaga keuangan dengan pengguna motor listrik. Stack: Next.js, Node.js, PostgreSQL.",
      en: "Build and develop the Credit Connect platform — an EV financing system connecting 20+ financial institutions with electric motorcycle users. Stack: Next.js, Node.js, PostgreSQL.",
    },
    skills: ["Next.js", "Node.js", "PostgreSQL", "REST API", "TypeScript"],
  },
  {
    id: 2,
    dept: { id: "Teknologi", en: "Technology" },
    title: "Carbon Credit Data Engineer",
    type: { id: "Penuh Waktu", en: "Full-time" },
    level: { id: "Mid", en: "Mid" },
    location: "Jakarta, Indonesia",
    desc: {
      id: "Merancang pipeline data untuk pelacakan, verifikasi, dan pelaporan carbon credit dari aktivitas EV mobility. Integrasi dengan platform IDXCarbon dan standar Verra/Gold Standard.",
      en: "Design data pipelines for tracking, verifying, and reporting carbon credits from EV mobility activity. Integration with IDXCarbon and Verra/Gold Standard frameworks.",
    },
    skills: ["Python", "dbt", "Apache Airflow", "BigQuery", "Data Modelling"],
  },
  {
    id: 3,
    dept: { id: "Bisnis", en: "Business" },
    title: "Business Development Manager – EV Financing",
    type: { id: "Penuh Waktu", en: "Full-time" },
    level: { id: "Senior", en: "Senior" },
    location: "Jakarta, Indonesia",
    desc: {
      id: "Membangun dan mengelola kemitraan dengan lembaga pembiayaan (bank, BPR, multifinance) untuk memperluas akses kredit motor EV. Target: 10 mitra baru dalam 6 bulan.",
      en: "Build and manage partnerships with financing institutions (banks, rural banks, multifinance) to expand EV motorcycle credit access. Target: 10 new partners in 6 months.",
    },
    skills: ["B2B Sales", "Financial Products", "Partnership Management", "Negotiation"],
  },
  {
    id: 4,
    dept: { id: "Operasional", en: "Operations" },
    title: "EV Fleet Operations Coordinator",
    type: { id: "Penuh Waktu", en: "Full-time" },
    level: { id: "Junior–Mid", en: "Junior–Mid" },
    location: "Jabodetabek",
    desc: {
      id: "Mengelola operasional harian armada motor EV pilot — mulai dari distribusi unit, monitoring kondisi baterai, jadwal maintenance, hingga pelaporan kepada mitra pembiayaan.",
      en: "Manage daily operations of the EV motorcycle pilot fleet — unit distribution, battery condition monitoring, maintenance scheduling, and reporting to financing partners.",
    },
    skills: ["Fleet Management", "Logistics", "EV Knowledge", "MS Excel", "Reporting"],
  },
  {
    id: 5,
    dept: { id: "Energi", en: "Energy" },
    title: "Solar Energy Project Engineer",
    type: { id: "Penuh Waktu", en: "Full-time" },
    level: { id: "Mid–Senior", en: "Mid–Senior" },
    location: "Jakarta / Site (Jawa Tengah)",
    desc: {
      id: "Mengelola konstruksi dan commissioning PLTS pertama Renewa di Jawa Tengah (5 MW). Bertanggung jawab atas desain sistem, koordinasi kontraktor, dan integrasi ke grid PLN.",
      en: "Manage construction and commissioning of Renewa's first solar plant in Central Java (5 MW). Responsible for system design, contractor coordination, and PLN grid integration.",
    },
    skills: ["Solar PV Design", "Grid Integration", "AutoCAD", "Project Management", "ETAP"],
  },
  {
    id: 6,
    dept: { id: "Bisnis", en: "Business" },
    title: "ESG & Carbon Market Analyst",
    type: { id: "Penuh Waktu", en: "Full-time" },
    level: { id: "Mid", en: "Mid" },
    location: "Jakarta, Indonesia",
    desc: {
      id: "Menganalisis dan mengembangkan strategi ESG Renewa, mempersiapkan dokumentasi untuk listing carbon credit, dan memantau perkembangan regulasi karbon Indonesia & internasional.",
      en: "Analyse and develop Renewa's ESG strategy, prepare documentation for carbon credit listings, and monitor Indonesian & international carbon regulation developments.",
    },
    skills: ["ESG Reporting", "Carbon Markets", "Verra/VCS", "GHG Protocol", "Excel/Python"],
  },
];

const perkIcons = [Leaf, Zap, TrendingUp, Laptop, BookOpen, Globe];

const perks = {
  id: [
    { title: "Misi yang Bermakna", desc: "Bekerja langsung pada solusi nyata untuk transisi energi Indonesia." },
    { title: "Ekosistem Berkembang", desc: "Bergabung di fase awal — setiap kontribusi Anda terlihat langsung dalam pertumbuhan bisnis." },
    { title: "Pertumbuhan Karir", desc: "Lingkungan yang mendorong kepemilikan, eksperimen, dan pengembangan skill cepat." },
    { title: "Fleksibilitas Kerja", desc: "Hybrid work — keseimbangan kerja dari kantor Jakarta dan remote." },
    { title: "Learning Budget", desc: "Anggaran tahunan untuk kursus, sertifikasi, dan konferensi industri." },
    { title: "Dampak Regional", desc: "Potensi kontribusi pada ekspansi Renewa ke pasar Asia Tenggara." },
  ],
  en: [
    { title: "Meaningful Mission", desc: "Work directly on real solutions for Indonesia's energy transition." },
    { title: "Growing Ecosystem", desc: "Join at the early stage — every contribution is directly visible in business growth." },
    { title: "Career Growth", desc: "An environment that encourages ownership, experimentation, and rapid skill development." },
    { title: "Work Flexibility", desc: "Hybrid work — balance between the Jakarta office and remote." },
    { title: "Learning Budget", desc: "Annual budget for courses, certifications, and industry conferences." },
    { title: "Regional Impact", desc: "Potential contribution to Renewa's expansion into Southeast Asian markets." },
  ],
};

const dict = {
  id: {
    label: "Karir",
    h1: "Bergabung Membangun",
    h1Highlight: "Masa Depan Energi",
    desc: "Renewa bukan sekadar perusahaan. Ini adalah gerakan membangun ekosistem energi hijau yang akan mengubah wajah mobilitas dan energi Indonesia. Kami mencari orang-orang yang ingin karyanya memberi dampak nyata.",
    whyLabel: "Kenapa Renewa",
    whyTitle: "Lebih dari Sekadar",
    whyHighlight: "Pekerjaan",
    openLabel: "Posisi Terbuka",
    openTitle: "Lowongan",
    openHighlight: "Saat Ini",
    filterAll: "Semua",
    applyBtn: "Lamar Sekarang",
    typeLabel: "Tipe",
    levelLabel: "Level",
    skillsLabel: "Skills",
    ctaTitle: "Tidak Menemukan Posisi yang Tepat?",
    ctaDesc: "Kirimkan CV dan portofolio Anda. Kami selalu tertarik bertemu orang-orang yang percaya pada misi energi hijau.",
    ctaBtn: "Kirim CV Terbuka →",
  },
  en: {
    label: "Careers",
    h1: "Join Us in Building",
    h1Highlight: "the Energy Future",
    desc: "Renewa is more than a company. It's a movement building a green energy ecosystem that will transform Indonesia's mobility and energy landscape. We're looking for people who want their work to create real impact.",
    whyLabel: "Why Renewa",
    whyTitle: "More Than Just",
    whyHighlight: "a Job",
    openLabel: "Open Positions",
    openTitle: "Current",
    openHighlight: "Openings",
    filterAll: "All",
    applyBtn: "Apply Now",
    typeLabel: "Type",
    levelLabel: "Level",
    skillsLabel: "Skills",
    ctaTitle: "Don't See the Right Role?",
    ctaDesc: "Send us your CV and portfolio. We're always keen to meet people who believe in the green energy mission.",
    ctaBtn: "Send Open Application →",
  },
};

const depts = {
  id: ["Semua", "Teknologi", "Bisnis", "Operasional", "Energi"],
  en: ["All", "Technology", "Business", "Operations", "Energy"],
};

export default function Careers() {
  const lang = useLang();
  const t = dict[lang];
  const deptList = depts[lang];
  const [activeDept, setActiveDept] = useState(deptList[0]);

  const filtered = openings.filter((o) =>
    activeDept === deptList[0] ? true : o.dept[lang] === activeDept
  );

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* ── Hero ── */}
        <section style={{ padding: "80px 40px 72px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <SectionLabel text={t.label} />
              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 4.5vw, 60px)", color: "#F2F5EF", letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
                {t.h1}<br /><span style={{ color: "#B8F53A" }}>{t.h1Highlight}</span>
              </h1>
              <p style={{ fontSize: 16, color: "#7A9E85", fontWeight: 300, lineHeight: 1.75, maxWidth: 480, marginBottom: 36 }}>
                {t.desc}
              </p>
              <a href="#openings" style={{
                display: "inline-block", padding: "14px 28px", borderRadius: 8,
                background: "#B8F53A", color: "#0D2B1E", textDecoration: "none",
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14,
              }}
                onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
              >
                {lang === "id" ? "Lihat Lowongan" : "View Openings"}
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { val: `${openings.length}`, label: lang === "id" ? "Posisi Terbuka" : "Open Positions" },
                { val: "4", label: lang === "id" ? "Unit Bisnis" : "Business Units" },
                { val: "2025", label: lang === "id" ? "Tahun Berdiri" : "Founded" },
                { val: "Jakarta", label: "HQ" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 20px" }}>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 600, color: "#B8F53A", letterSpacing: -1, marginBottom: 6 }}>{s.val}</p>
                  <p style={{ fontSize: 13, color: "#7A9E85", fontWeight: 300 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Renewa ── */}
        <section style={{ padding: "80px 40px", background: "#0D2B1E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.whyLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#F2F5EF", letterSpacing: -1.5, marginBottom: 48 }}>
              {t.whyTitle} <span style={{ color: "#B8F53A" }}>{t.whyHighlight}</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {perks[lang].map((p, i) => {
                const Icon = perkIcons[i];
                return (
                <div key={p.title} style={{ background: "rgba(0,0,0,0.2)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "28px 24px" }}>
                  <div style={{ marginBottom: 16, width: 40, height: 40, borderRadius: 8, background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color="#B8F53A" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#F2F5EF", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.65, fontWeight: 300 }}>{p.desc}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section id="openings" style={{ padding: "80px 40px 96px", background: "#0B0F0E", scrollMarginTop: 80 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.openLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#F2F5EF", letterSpacing: -1.5, marginBottom: 32 }}>
              {t.openTitle} <span style={{ color: "#B8F53A" }}>{t.openHighlight}</span>
            </h2>

            {/* Dept filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
              {deptList.map((d) => (
                <button key={d} onClick={() => setActiveDept(d)} style={{
                  padding: "8px 18px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif", fontWeight: activeDept === d ? 500 : 300,
                  border: activeDept === d ? "1px solid #B8F53A" : "0.5px solid rgba(255,255,255,0.1)",
                  background: activeDept === d ? "rgba(184,245,58,0.1)" : "transparent",
                  color: activeDept === d ? "#B8F53A" : "#7A9E85",
                  transition: "all 0.15s",
                }}>
                  {d}
                </button>
              ))}
            </div>

            {/* Job list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((job) => (
                <div key={job.id} style={{
                  background: "#0D2B1E",
                  border: "0.5px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: "28px 32px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 24,
                  alignItems: "center",
                  transition: "border-color 0.2s",
                  cursor: "default",
                }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(46,139,87,0.5)")}
                  onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: "#B8F53A", background: "rgba(184,245,58,0.07)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 100, padding: "2px 10px" }}>
                        {job.dept[lang]}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace" }}>
                        {job.type[lang]} · {job.level[lang]} · {job.location}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#F2F5EF", letterSpacing: -0.3, marginBottom: 10 }}>
                      {job.title}
                    </h3>

                    <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.7, fontWeight: 300, marginBottom: 14, maxWidth: 680 }}>
                      {job.desc[lang]}
                    </p>

                    {/* Skills */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {job.skills.map((s) => (
                        <span key={s} style={{ fontSize: 11, color: "#7A9E85", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 8px", fontFamily: "JetBrains Mono, monospace" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply button */}
                  <Link href="/contact" style={{
                    padding: "12px 24px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    background: "#B8F53A", color: "#0D2B1E", textDecoration: "none",
                    fontFamily: "Syne, sans-serif", whiteSpace: "nowrap",
                    display: "inline-block", flexShrink: 0,
                    transition: "background 0.15s",
                  }}
                    onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                    onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
                  >
                    {t.applyBtn}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Application CTA ── */}
        <section style={{ padding: "80px 40px", background: "#B8F53A" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#1A5C35", marginBottom: 12, fontWeight: 500 }}>
                {lang === "id" ? "Lamaran Terbuka" : "Open Application"}
              </p>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 40px)", color: "#0B0F0E", letterSpacing: -1.5, lineHeight: 1.1, maxWidth: 560 }}>
                {t.ctaTitle}
              </h2>
              <p style={{ fontSize: 15, color: "#1A5C35", marginTop: 12, maxWidth: 480, fontWeight: 300, lineHeight: 1.65 }}>
                {t.ctaDesc}
              </p>
            </div>
            <Link href="/contact" style={{
              padding: "16px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700,
              background: "#0D2B1E", color: "#F2F5EF", textDecoration: "none",
              fontFamily: "Syne, sans-serif", whiteSpace: "nowrap",
            }}
              onMouseOver={e => (e.currentTarget.style.background = "#0B0F0E")}
              onMouseOut={e => (e.currentTarget.style.background = "#0D2B1E")}
            >
              {t.ctaBtn}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
