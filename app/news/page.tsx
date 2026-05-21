"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { articles } from "@/lib/articles";

const categoryList = {
  id: ["Semua", "Ekosistem EV", "Carbon Market", "Energi Terbarukan", "Kemitraan"],
  en: ["All", "EV Ecosystem", "Carbon Market", "Renewable Energy", "Partnership"],
};

const tagLabel = {
  news: { id: "Berita", en: "News" },
  insight: { id: "Insight", en: "Insight" },
  featured: { id: "Featured", en: "Featured" },
};

const dict = {
  id: {
    label: "News & Insights",
    h1: "Berita & Wawasan",
    h1Highlight: "Ekosistem Hijau",
    desc: "Pembaruan terkini, analisis, dan wawasan dari ekosistem energi hijau dan mobilitas EV Renewa.",
    readMore: "Baca Selengkapnya →",
    noResult: "Tidak ada artikel dalam kategori ini.",
    stayUpdated: "Tetap Update",
    stayDesc: "Dapatkan perkembangan terbaru ekosistem Renewa langsung di inbox Anda.",
    emailPlaceholder: "Email Anda",
    subscribe: "Subscribe",
  },
  en: {
    label: "News & Insights",
    h1: "News & Insights from",
    h1Highlight: "the Green Ecosystem",
    desc: "Latest updates, analyses, and insights from Renewa's green energy and EV mobility ecosystem.",
    readMore: "Read More →",
    noResult: "No articles in this category.",
    stayUpdated: "Stay Updated",
    stayDesc: "Get the latest Renewa ecosystem developments delivered to your inbox.",
    emailPlaceholder: "Your email",
    subscribe: "Subscribe",
  },
};

export default function News() {
  const lang = useLang();
  const t = dict[lang];
  const cats = categoryList[lang];
  const [activeCategory, setActiveCategory] = useState(cats[0]);

  const featured = articles[0];
  const gridArticles = articles
    .slice(1)
    .filter((a) => activeCategory === cats[0] || a.category[lang] === activeCategory);

  const showFeatured =
    activeCategory === cats[0] || featured.category[lang] === activeCategory;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        {/* ── Hero ── */}
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", color: "#F2F5EF", letterSpacing: -2, lineHeight: 1.05, marginBottom: 16, maxWidth: 720 }}>
              {t.h1} <span style={{ color: "#B8F53A" }}>{t.h1Highlight}</span>
            </h1>
            <p style={{ fontSize: 16, color: "#7A9E85", fontWeight: 300, maxWidth: 520 }}>{t.desc}</p>
          </div>
        </section>

        {/* ── Featured Article ── */}
        {showFeatured && (
          <section style={{ padding: "56px 40px 0", background: "#0B0F0E" }}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              <Link href={`/news/${featured.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#0D2B1E",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "48px 52px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 56,
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                  cursor: "pointer",
                }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(46,139,87,0.5)")}
                  onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#B8F53A,rgba(184,245,58,0.15))" }} />
                  <div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                      <span style={{ fontSize: 11, background: "#B8F53A", color: "#0D2B1E", padding: "3px 10px", borderRadius: 100, fontWeight: 700, letterSpacing: "0.5px" }}>
                        {tagLabel.featured[lang]}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(184,245,58,0.5)", fontFamily: "JetBrains Mono, monospace" }}>{featured.category[lang]}</span>
                    </div>
                    <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(22px, 2.5vw, 32px)", color: "#F2F5EF", letterSpacing: -0.8, lineHeight: 1.2, marginBottom: 16 }}>
                      {featured.title[lang]}
                    </h2>
                    <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>
                      {featured.excerpt[lang]}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <span style={{ fontSize: 12, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace" }}>{featured.date}</span>
                      <span style={{ fontSize: 12, color: "#7A9E85" }}>·</span>
                      <span style={{ fontSize: 12, color: "#7A9E85" }}>{featured.readTime} read</span>
                      <span style={{ fontSize: 13, color: "#B8F53A", marginLeft: "auto" }}>{t.readMore}</span>
                    </div>
                  </div>
                  <div style={{ background: "rgba(184,245,58,0.04)", border: "0.5px solid rgba(184,245,58,0.1)", borderRadius: 12, padding: "36px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
                    {[
                      { val: "20+", label: lang === "id" ? "Mitra Pembiayaan" : "Financing Partners" },
                      { val: "500", label: lang === "id" ? "Unit EV Pilot 2026" : "EV Units Pilot 2026" },
                      { val: "5 MW", label: lang === "id" ? "Kapasitas PLTS Pertama" : "First PLTS Capacity" },
                    ].map((s) => (
                      <div key={s.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ fontSize: 13, color: "#7A9E85", fontWeight: 300 }}>{s.label}</span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 600, color: "#B8F53A" }}>{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── Filter + Grid ── */}
        <section style={{ padding: "56px 40px 96px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 40, flexWrap: "wrap" }}>
              {cats.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: "8px 18px", borderRadius: 100, fontSize: 13, cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif", fontWeight: activeCategory === cat ? 500 : 300,
                  border: activeCategory === cat ? "1px solid #B8F53A" : "0.5px solid rgba(255,255,255,0.1)",
                  background: activeCategory === cat ? "rgba(184,245,58,0.1)" : "transparent",
                  color: activeCategory === cat ? "#B8F53A" : "#7A9E85",
                  transition: "all 0.15s",
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {gridArticles.length === 0 ? (
              <p style={{ fontSize: 15, color: "#7A9E85" }}>{t.noResult}</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {gridArticles.map((a) => (
                  <Link key={a.id} href={`/news/${a.slug}`} style={{ textDecoration: "none" }}>
                    <article style={{
                      background: "#0D2B1E",
                      border: "0.5px solid rgba(255,255,255,0.07)",
                      borderRadius: 14,
                      padding: "28px 28px 24px",
                      display: "flex", flexDirection: "column",
                      height: "100%",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                      cursor: "pointer",
                    }}
                      onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(46,139,87,0.5)"; }}
                      onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <span style={{ fontSize: 11, color: "#B8F53A", background: "rgba(184,245,58,0.07)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 100, padding: "2px 10px" }}>
                          {a.category[lang]}
                        </span>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}>
                          {tagLabel[a.tag][lang]}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "#F2F5EF", letterSpacing: -0.3, lineHeight: 1.3, marginBottom: 12, flexGrow: 1 }}>
                        {a.title[lang]}
                      </h3>
                      <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.7, fontWeight: 300, marginBottom: 20, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                        {a.excerpt[lang]}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono, monospace" }}>{a.date}</span>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>· {a.readTime}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "#B8F53A" }}>{t.readMore}</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section style={{ padding: "80px 40px", background: "#0D2B1E", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 16 }}>NEWSLETTER</p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: "#F2F5EF", letterSpacing: -1, marginBottom: 12 }}>
              {t.stayUpdated}
            </h2>
            <p style={{ fontSize: 15, color: "#7A9E85", fontWeight: 300, marginBottom: 32, lineHeight: 1.7 }}>
              {t.stayDesc}
            </p>
            <div style={{ display: "flex", gap: 8, maxWidth: 440, margin: "0 auto" }}>
              <input type="email" placeholder={t.emailPlaceholder} style={{
                flex: 1, padding: "12px 18px", borderRadius: 8, fontSize: 14,
                background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.12)",
                color: "#F2F5EF", outline: "none", fontFamily: "DM Sans, sans-serif",
              }} />
              <button style={{
                padding: "12px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                background: "#B8F53A", color: "#0D2B1E", border: "none", cursor: "pointer",
                fontFamily: "Syne, sans-serif", whiteSpace: "nowrap",
              }}
                onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
              >
                {t.subscribe}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
