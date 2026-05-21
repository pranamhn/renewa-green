"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLang } from "@/context/LanguageContext";
import { articles, type Lang, type ArticleBody } from "@/lib/articles";

const tagLabel = {
  news: { id: "Berita", en: "News" },
  insight: { id: "Insight", en: "Insight" },
  featured: { id: "Featured", en: "Featured" },
};

function BodyBlock({ block, lang }: { block: ArticleBody; lang: Lang }) {
  if (block.type === "paragraph" && block.text) {
    return (
      <p style={{ fontSize: 16, color: "#7A9E85", lineHeight: 1.85, fontWeight: 300, marginBottom: 0 }}>
        {block.text[lang]}
      </p>
    );
  }

  if (block.type === "subheading" && block.text) {
    return (
      <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, color: "#F2F5EF", letterSpacing: -0.4, marginBottom: 0, marginTop: 8 }}>
        {block.text[lang]}
      </h2>
    );
  }

  if (block.type === "quote" && block.text && block.author) {
    return (
      <blockquote style={{
        margin: 0,
        padding: "24px 28px",
        background: "rgba(184,245,58,0.05)",
        borderLeft: "3px solid #B8F53A",
        borderRadius: "0 10px 10px 0",
      }}>
        <p style={{ fontSize: 16, color: "#D4F87A", lineHeight: 1.8, fontWeight: 400, fontStyle: "italic", marginBottom: 14 }}>
          &ldquo;{block.text[lang]}&rdquo;
        </p>
        <p style={{ fontSize: 12, color: "rgba(184,245,58,0.6)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.5px" }}>
          — {block.author[lang]}
        </p>
      </blockquote>
    );
  }

  if (block.type === "bullet" && block.items) {
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {block.items.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ color: "#B8F53A", fontSize: 13, lineHeight: "28px", flexShrink: 0, fontWeight: 700 }}>→</span>
            <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>
              {item[lang]}
            </p>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}

export default function ArticleDetail() {
  const params = useParams();
  const lang = useLang() as Lang;
  const slug = params?.slug as string;

  const article = articles.find((a) => a.slug === slug);
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: 68, minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B0F0E" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(184,245,58,0.5)", marginBottom: 16 }}>404</p>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 32, color: "#F2F5EF", marginBottom: 16 }}>
              {lang === "id" ? "Artikel tidak ditemukan" : "Article not found"}
            </h1>
            <Link href="/news" style={{ color: "#B8F53A", fontSize: 14, textDecoration: "none" }}>
              ← {lang === "id" ? "Kembali ke News" : "Back to News"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* ── Hero ── */}
        <section style={{ padding: "72px 40px 56px", background: "#0B0F0E", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {/* Back */}
            <Link href="/news" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#7A9E85", textDecoration: "none", marginBottom: 32 }}
              onMouseOver={e => (e.currentTarget.style.color = "#B8F53A")}
              onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}
            >
              ← {lang === "id" ? "News & Insights" : "News & Insights"}
            </Link>

            {/* Tags */}
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
              <span style={{
                fontSize: 11, borderRadius: 100, padding: "3px 12px", fontWeight: 600, letterSpacing: "0.5px",
                background: article.tag === "featured" ? "#B8F53A" : "rgba(184,245,58,0.08)",
                color: article.tag === "featured" ? "#0D2B1E" : "#B8F53A",
                border: article.tag === "featured" ? "none" : "0.5px solid rgba(184,245,58,0.3)",
              }}>
                {tagLabel[article.tag][lang]}
              </span>
              <span style={{ fontSize: 12, color: "rgba(184,245,58,0.5)", fontFamily: "JetBrains Mono, monospace" }}>
                {article.category[lang]}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", color: "#F2F5EF", letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20 }}>
              {article.title[lang]}
            </h1>

            {/* Excerpt */}
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>
              {article.excerpt[lang]}
            </p>

            {/* Meta */}
            <div style={{ display: "flex", gap: 20, alignItems: "center", paddingTop: 20, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "JetBrains Mono, monospace" }}>{article.date}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>·</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{article.readTime} read</span>
            </div>
          </div>
        </section>

        {/* ── Article Body ── */}
        <section style={{ padding: "64px 40px 80px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
            {article.body.map((block, i) => (
              <BodyBlock key={i} block={block} lang={lang} />
            ))}
          </div>
        </section>

        {/* ── Author Cards ── */}
        <section style={{ padding: "0 40px 80px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.4)", letterSpacing: "2px", marginBottom: 20 }}>
              {lang === "id" ? "TENTANG NARASUMBER" : "ABOUT THE SPEAKERS"}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                {
                  name: "Hendry Donald",
                  title: { id: "Chief Executive Officer", en: "Chief Executive Officer" },
                  bio: {
                    id: "Hendry Donald adalah pendiri dan CEO PT Renewa Green Energy. Ia memimpin visi strategis perusahaan dalam membangun ekosistem energi hijau terintegrasi pertama Indonesia — dari kredit EV hingga energi terbarukan.",
                    en: "Hendry Donald is the founder and CEO of PT Renewa Green Energy. He leads the company's strategic vision in building Indonesia's first integrated green energy ecosystem — from EV credit to renewable energy.",
                  },
                },
                {
                  name: "Zaki Umari",
                  title: { id: "Chief Commercial Officer", en: "Chief Commercial Officer" },
                  bio: {
                    id: "Zaki Umari menjabat sebagai Chief Commercial Officer PT Renewa Green Energy, bertanggung jawab atas strategi pertumbuhan komersial, pengembangan kemitraan, dan ekspansi pasar ekosistem Renewa.",
                    en: "Zaki Umari serves as Chief Commercial Officer of PT Renewa Green Energy, responsible for commercial growth strategy, partnership development, and market expansion of the Renewa ecosystem.",
                  },
                },
              ].map((person) => (
                <div key={person.name} style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 22px" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(184,245,58,0.12)", border: "0.5px solid rgba(184,245,58,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14, color: "#B8F53A" }}>
                        {person.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#F2F5EF", marginBottom: 2 }}>{person.name}</p>
                      <p style={{ fontSize: 11, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.5px" }}>{person.title[lang]}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.7, fontWeight: 300 }}>{person.bio[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── More Articles ── */}
        <section style={{ padding: "64px 40px 96px", background: "#0D2B1E", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 28 }}>
              {lang === "id" ? "ARTIKEL LAINNYA" : "MORE ARTICLES"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {others.map((a) => (
                <Link key={a.id} href={`/news/${a.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "0.5px solid rgba(255,255,255,0.06)",
                    borderRadius: 12,
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    transition: "border-color 0.2s",
                  }}
                    onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(184,245,58,0.3)")}
                    onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 11, color: "#B8F53A", marginBottom: 6 }}>{a.category[lang]} · {a.date}</p>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 15, color: "#F2F5EF", lineHeight: 1.3 }}>
                        {a.title[lang]}
                      </p>
                    </div>
                    <span style={{ fontSize: 16, color: "#B8F53A", flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link href="/news" style={{
                fontSize: 13, color: "#7A9E85", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 18px", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 100,
              }}>
                {lang === "id" ? "← Semua Artikel" : "← All Articles"}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
