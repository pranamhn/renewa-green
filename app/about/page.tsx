"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLang } from "@/context/LanguageContext";
import { ExternalLink, Briefcase, GraduationCap } from "lucide-react";

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

const founders = [
  {
    initial: "H",
    name: "Hendry Donald",
    role: { id: "Chief Executive Officer", en: "Chief Executive Officer" },
    linkedin: "https://www.linkedin.com/in/hendrydonald/",
    bio: {
      id: "Pendiri dan CEO PT Renewa Green Energy. Hendry memimpin visi strategis perusahaan dalam membangun ekosistem energi hijau terintegrasi pertama Indonesia — menggabungkan kredit EV, perdagangan karbon, daur ulang baterai, dan pembangkit energi terbarukan.",
      en: "Founder and CEO of PT Renewa Green Energy. Hendry leads the company's strategic vision to build Indonesia's first integrated green energy ecosystem — uniting EV credit, carbon trading, battery recycling, and renewable power generation.",
    },
    experiences: [
      { role: "Founder & Chief Executive Officer", company: "Renewa Asia", desc: { id: "Memimpin pengembangan ekosistem energi hijau terintegrasi pertama Indonesia.", en: "Leading the development of Indonesia's first integrated green energy ecosystem." } },
      { role: "Head of Strategy", company: "Oyika Indonesia", desc: { id: "Merancang strategi bisnis untuk platform motor listrik roda dua di kawasan Asia.", en: "Designed business strategy for a two-wheeler EV platform across Asia." } },
      { role: "EV Strategy and Lifecycle", company: "Goto / Gojek", desc: { id: "Memimpin strategi kendaraan listrik di salah satu super-app terbesar Asia Tenggara.", en: "Led EV strategy and fleet strategy initiatives at one of Southeast Asia's largest super-apps." } },
    ],
    education: [
      { degree: { id: "Master of Science (M.Sc.)", en: "Master of Science (M.Sc.)" }, school: "National University of Singapore", year: "2018 – 2020", note: { id: "Spesialisasi Power & Energy Systems. Riset: EV motor drive & powertrain.", en: "Specialization in Power & Energy Systems. Research: EV motor drive & powertrain." } },
      { degree: { id: "Bachelor of Engineering (Hons.)", en: "Bachelor of Engineering (Hons.)" }, school: "Nanyang Technological University Singapore", year: "2011 – 2015", note: { id: "Double Minor: Business & Systems Management (Nanyang Business School).", en: "Double Minor in Business and Systems Management (Nanyang Business School)." } },
    ],
  },
  {
    initial: "Z",
    name: "Zaki Umaro",
    role: { id: "Chief Commercial Officer", en: "Chief Commercial Officer" },
    linkedin: "https://www.linkedin.com/in/zaki-umaro-3b15b6101/",
    bio: {
      id: "Zaki Umaro menjabat sebagai CCO PT Renewa Green Energy, bertanggung jawab atas strategi pertumbuhan komersial dan pengembangan kemitraan ekosistem. Sebelumnya, ia adalah CEO EVRIDE Mobility — platform sharing motor EV yang mengelola lebih dari 700 unit.",
      en: "Zaki Umaro serves as CCO of PT Renewa Green Energy, overseeing commercial growth strategy and ecosystem partnership development. Previously, he was CEO of EVRIDE Mobility — an EV motorcycle sharing platform managing over 700 units.",
    },
    experiences: [
      { role: "Founder & Chief Commercial Officer", company: "Renewa Asia", desc: { id: "Strategi komersial, pengembangan kemitraan, dan ekspansi pasar ekosistem Renewa.", en: "Commercial strategy, partnership development, and Renewa ecosystem market expansion." } },
      { role: "CEO & Founder", company: "EV Ride Mobility", desc: { id: "Mengelola 700+ unit motor listrik — salah satu operator EV sharing terbesar di Indonesia.", en: "Managed 700+ EV motorcycle units — one of Indonesia's largest EV sharing operators." } },
      { role: "Fleet Expansion Manager", company: "Goto / Gojek", desc: { id: "Memimpin ekspansi armada kendaraan listrik di jaringan mitra Gojek se-Jabodetabek.", en: "Led EV fleet expansion across Gojek's partner network in Jabodetabek." } },
    ],
    education: [
      { degree: { id: "Magister Teknik Informatika (S2)", en: "Master of Informatics Engineering" }, school: "IBI Darmajaya", year: "2024 – 2026", note: { id: "Program Magister Teknik Informatika.", en: "Informatics Engineering postgraduate programme." } },
      { degree: { id: "Sarjana Komputer (S1)", en: "Bachelor of Computer Science" }, school: "DCC Bandar Lampung", year: "2004 – 2008", note: { id: "Jurusan Manajemen, Fakultas Ekonomi dan Bisnis.", en: "Management, Faculty of Economics and Business." } },
    ],
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
    foundersLabel: "Our Founders",
    h2Founders: "Orang di Balik",
    h2FoundersHighlight: "Renewa",
    linkedinBtn: "Lihat Profil LinkedIn",
    expLabel: "Pengalaman",
    eduLabel: "Pendidikan",
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
    foundersLabel: "Our Founders",
    h2Founders: "The People Behind",
    h2FoundersHighlight: "Renewa",
    linkedinBtn: "View LinkedIn Profile",
    expLabel: "Experience",
    eduLabel: "Education",
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
        {/* Founders */}
        <section style={{ padding: "80px 40px", background: "#0D2B1E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.foundersLabel} />
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: "#fff", letterSpacing: -1, marginBottom: 48 }}>
              {t.h2Founders} <span style={{ color: "#B8F53A" }}>{t.h2FoundersHighlight}</span>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {founders.map((f) => (
                <div key={f.name} style={{
                  background: "#0B1A12",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: 32,
                  display: "flex", flexDirection: "column", gap: 20,
                }}>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "linear-gradient(135deg, #1A5C35, #0D2B1E)",
                      border: "1.5px solid rgba(184,245,58,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: "#B8F53A" }}>{f.initial}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#F2F5EF", marginBottom: 3 }}>{f.name}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#B8F53A", letterSpacing: "0.5px" }}>{f.role[lang]}</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300 }}>{f.bio[lang]}</p>

                  {/* Experiences */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1.5px", marginBottom: 2 }}>
                      {t.expLabel.toUpperCase()}
                    </p>
                    {f.experiences.map((e, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        background: "rgba(255,255,255,0.03)",
                        border: "0.5px solid rgba(255,255,255,0.06)",
                        borderRadius: 8, padding: "10px 14px",
                      }}>
                        <Briefcase size={13} color="#B8F53A" style={{ marginTop: 2, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: 13, color: "#F2F5EF", fontWeight: 600, marginBottom: 1 }}>
                            {e.role} <span style={{ color: "#7A9E85", fontWeight: 400 }}>· {e.company}</span>
                          </p>
                          <p style={{ fontSize: 12, color: "#7A9E85", lineHeight: 1.5, fontWeight: 300 }}>{e.desc[lang]}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "1.5px", marginBottom: 2 }}>
                      {t.eduLabel.toUpperCase()}
                    </p>
                    {f.education.map((e, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 12, alignItems: "flex-start",
                        background: "rgba(255,255,255,0.03)",
                        border: "0.5px solid rgba(255,255,255,0.06)",
                        borderRadius: 8, padding: "10px 14px",
                      }}>
                        <GraduationCap size={13} color="#5DD6A0" style={{ marginTop: 2, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontSize: 13, color: "#F2F5EF", fontWeight: 600, marginBottom: 1 }}>
                            {e.degree[lang]} <span style={{ color: "#7A9E85", fontWeight: 400 }}>· {e.school}</span>
                          </p>
                          <p style={{ fontSize: 11, color: "#5DD6A0", fontFamily: "JetBrains Mono, monospace", marginBottom: 2 }}>{e.year}</p>
                          <p style={{ fontSize: 12, color: "#7A9E85", lineHeight: 1.5, fontWeight: 300 }}>{e.note[lang]}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* LinkedIn */}
                  <a href={f.linkedin} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    padding: "9px 16px", borderRadius: 8, fontSize: 12,
                    border: "0.5px solid rgba(184,245,58,0.25)",
                    color: "#B8F53A", textDecoration: "none",
                    fontFamily: "DM Sans, sans-serif", fontWeight: 500,
                    background: "rgba(184,245,58,0.05)",
                    alignSelf: "flex-start", transition: "all 0.15s",
                  }}
                    onMouseOver={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,245,58,0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,245,58,0.5)";
                    }}
                    onMouseOut={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,245,58,0.05)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,245,58,0.25)";
                    }}
                  >
                    <ExternalLink size={12} /> {t.linkedinBtn}
                  </a>
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
