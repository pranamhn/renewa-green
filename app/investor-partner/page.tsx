"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    label: "Kolaborasi & Investasi",
    h1a: "Bergabung dengan",
    h1b: "Ekosistem Renewa",
    desc: "Tiga jalur kolaborasi strategis untuk membangun masa depan energi hijau Indonesia bersama kami.",
    paths: [
      { n: "01", anchor: "#investor",  title: "Investor",         short: "Tanamkan modal di ekosistem EV & energi hijau" },
      { n: "02", anchor: "#supplier",  title: "Supplier Partner", short: "Suplai produk EV, baterai, atau teknologi hijau" },
      { n: "03", anchor: "#penerima",  title: "Penerima EV",      short: "Deploy armada EV dan hasilkan carbon credit" },
    ],

    investor: {
      id: "investor",
      label: "01 — Investor",
      title: "Menjadi Investor",
      titleAccent: "Renewa Green",
      desc: "Renewa Green membuka peluang investasi bagi individu dan institusi yang percaya pada masa depan energi bersih. Investasi Anda akan mendorong pertumbuhan ekosistem EV dan energi terbarukan terbesar di Indonesia.",
      benefits: [
        "Ekuitas dalam ekosistem bisnis hijau terintegrasi",
        "Alokasi carbon credit dari unit EV yang tersalurkan",
        "Laporan kinerja kuartalan yang transparan",
        "Akses eksklusif ke pipeline bisnis dan ekspansi regional",
        "Potensi exit melalui IPO atau strategic acquisition",
      ],
      statsLabel: "Proyeksi Ekosistem",
      stats: [
        { val: "100K", label: "Target Unit EV 2035" },
        { val: ">Rp2T", label: "Estimasi GMV 2030" },
        { val: "4", label: "Pilar Bisnis Aktif" },
      ],
      forLabel: "Cocok untuk",
      forTags: ["Angel Investor", "Venture Capital", "Family Office", "ESG Fund", "Institusi Keuangan", "Impact Investor"],
      cta: "Jadwalkan Pertemuan",
      ctaHref: "/contact",
    },

    supplier: {
      id: "supplier",
      label: "02 — Supplier Partner",
      title: "Menjadi Mitra",
      titleAccent: "Supplier",
      desc: "Renewa Green membutuhkan mitra pemasok terpercaya untuk mendukung rantai pasokan ekosistem EV dan energi terbarukan kami. Bergabunglah sebagai mitra supplier dan nikmati volume pembelian jangka panjang yang terjamin.",
      benefits: [
        "Volume pembelian terjamin melalui kontrak jangka panjang",
        "Akses ke jaringan distribusi 20+ kota di Indonesia",
        "Co-branding dan visibility di platform Renewa",
        "Integrasi ke sistem logistik & after-sales Renewa",
        "Prioritas pengembangan produk bersama",
      ],
      typesLabel: "Kategori Produk yang Dibutuhkan",
      types: [
        { title: "Motor EV",              desc: "Roda dua listrik untuk distribusi ke end user" },
        { title: "Baterai EV",            desc: "Baterai lithium-ion untuk motor & penyimpanan energi" },
        { title: "Infrastruktur Charging", desc: "Stasiun pengisian daya untuk jaringan Renewa" },
        { title: "Panel Surya & PLTS",    desc: "Komponen solar untuk pembangkit listrik hijau" },
        { title: "Teknologi Recycling",   desc: "Peralatan daur ulang baterai dan komponen EV" },
        { title: "Spare Parts & MRO",     desc: "Suku cadang dan perlengkapan maintenance armada" },
      ],
      forLabel: "Cocok untuk",
      forTags: ["Produsen Motor EV", "Distributor Baterai", "Penyedia SPKLU", "Produsen Panel Surya", "Perusahaan Recycling", "Importir Teknologi Hijau"],
      cta: "Daftarkan Produk",
      ctaHref: "/contact",
    },

    recipient: {
      id: "penerima",
      label: "03 — Penerima Produk EV",
      title: "Menjadi Mitra",
      titleAccent: "Penerima EV",
      desc: "Deploy armada motor EV ke operasional bisnis Anda dengan harga preferensial, kemudahan kredit, dan dukungan penuh dari Renewa. Setiap unit EV yang beroperasi akan menghasilkan carbon credit yang bernilai.",
      benefits: [
        "Harga preferensial untuk pembelian armada skala besar",
        "Kemudahan akses kredit melalui jaringan 20+ mitra pembiayaan",
        "Setiap unit aktif menghasilkan carbon credit yang dapat diperdagangkan",
        "Dukungan maintenance & after-sales langsung dari Renewa",
        "Pelaporan emisi otomatis untuk keperluan ESG & CSR",
      ],
      typesLabel: "Siapa yang Bisa Bergabung",
      types: [
        { title: "Operator Ojek & Kurir", desc: "Gojek, Grab, Shopee Express, J&T, dan mitra lainnya" },
        { title: "Perusahaan Logistik",   desc: "Last-mile delivery, cold chain, dan distribusi B2B" },
        { title: "Armada Korporat",       desc: "Kendaraan operasional perusahaan & institusi" },
        { title: "Pemerintah & BUMN",     desc: "Kendaraan dinas dan armada instansi negara" },
        { title: "Dealer & Distributor",  desc: "Jaringan penjualan motor EV di seluruh Indonesia" },
        { title: "Kampus & Komunitas",    desc: "Armada edukasi dan komunitas EV lokal" },
      ],
      forLabel: "Syarat Minimum",
      forTags: ["Min. 10 Unit", "Domisili Indonesia", "Memiliki NPWP", "Operasional Aktif"],
      cta: "Ajukan Kemitraan",
      ctaHref: "/apply-ev-credit",
    },

    ctaTitle: "Siap Bergabung?",
    ctaDesc: "Hubungi tim kami untuk mendiskusikan jalur kolaborasi yang paling sesuai dengan tujuan Anda.",
    ctaCta: "Hubungi Tim Renewa →",
  },

  en: {
    label: "Collaborate & Invest",
    h1a: "Join the",
    h1b: "Renewa Ecosystem",
    desc: "Three strategic collaboration paths to build Indonesia's green energy future together with us.",
    paths: [
      { n: "01", anchor: "#investor",  title: "Investor",        short: "Invest capital in the EV & green energy ecosystem" },
      { n: "02", anchor: "#supplier",  title: "Supplier Partner", short: "Supply EV products, batteries, or green technology" },
      { n: "03", anchor: "#penerima",  title: "EV Recipient",    short: "Deploy an EV fleet and earn carbon credits" },
    ],

    investor: {
      id: "investor",
      label: "01 — Investor",
      title: "Become a",
      titleAccent: "Renewa Investor",
      desc: "Renewa Green opens investment opportunities for individuals and institutions who believe in a clean energy future. Your capital will fuel the growth of Indonesia's largest EV and renewable energy ecosystem.",
      benefits: [
        "Equity stake in an integrated green business ecosystem",
        "Carbon credit allocation from deployed EV units",
        "Transparent quarterly performance reporting",
        "Exclusive access to business pipeline and regional expansion",
        "Potential exit via IPO or strategic acquisition",
      ],
      statsLabel: "Ecosystem Projections",
      stats: [
        { val: "100K", label: "EV Unit Target 2035" },
        { val: ">$130M", label: "Estimated GMV 2030" },
        { val: "4", label: "Active Business Pillars" },
      ],
      forLabel: "Ideal for",
      forTags: ["Angel Investor", "Venture Capital", "Family Office", "ESG Fund", "Financial Institution", "Impact Investor"],
      cta: "Schedule a Meeting",
      ctaHref: "/contact",
    },

    supplier: {
      id: "supplier",
      label: "02 — Supplier Partner",
      title: "Become a",
      titleAccent: "Supplier Partner",
      desc: "Renewa Green is seeking trusted supply partners to support our EV and renewable energy ecosystem. Join as a supplier partner and enjoy guaranteed long-term purchase volumes.",
      benefits: [
        "Guaranteed purchase volumes via long-term contracts",
        "Access to a distribution network spanning 20+ cities",
        "Co-branding and visibility on the Renewa platform",
        "Integration into Renewa's logistics & after-sales system",
        "Priority joint product development opportunities",
      ],
      typesLabel: "Product Categories Needed",
      types: [
        { title: "EV Motorcycles",          desc: "Two-wheelers for distribution to end users" },
        { title: "EV Batteries",            desc: "Lithium-ion batteries for motorcycles & energy storage" },
        { title: "Charging Infrastructure", desc: "Charging stations for the Renewa network" },
        { title: "Solar Panels & PLTS",     desc: "Solar components for green power generation" },
        { title: "Recycling Technology",    desc: "Equipment for recycling EV batteries and components" },
        { title: "Spare Parts & MRO",       desc: "Parts and maintenance supplies for EV fleets" },
      ],
      forLabel: "Ideal for",
      forTags: ["EV Motorcycle Manufacturers", "Battery Distributors", "Charging Providers", "Solar Manufacturers", "Recycling Companies", "Green Tech Importers"],
      cta: "Register Your Product",
      ctaHref: "/contact",
    },

    recipient: {
      id: "penerima",
      label: "03 — EV Recipient Partner",
      title: "Become an",
      titleAccent: "EV Recipient",
      desc: "Deploy an EV motorcycle fleet for your business operations with preferential pricing, easy credit access, and full support from Renewa. Every active EV unit generates tradeable carbon credits.",
      benefits: [
        "Preferential pricing for large-scale fleet purchases",
        "Easy credit access through a network of 20+ financing partners",
        "Every active unit generates tradeable carbon credits",
        "Dedicated maintenance & after-sales support from Renewa",
        "Automated emissions reporting for ESG & CSR purposes",
      ],
      typesLabel: "Who Can Join",
      types: [
        { title: "Ride-hailing & Courier", desc: "Gojek, Grab, Shopee Express, J&T, and other partners" },
        { title: "Logistics Companies",    desc: "Last-mile delivery, cold chain, and B2B distribution" },
        { title: "Corporate Fleets",       desc: "Operational vehicles for companies & institutions" },
        { title: "Government & SOEs",      desc: "Official vehicles and state agency fleets" },
        { title: "Dealers & Distributors", desc: "EV motorcycle sales networks across Indonesia" },
        { title: "Campus & Communities",   desc: "Educational fleets and local EV communities" },
      ],
      forLabel: "Minimum Requirements",
      forTags: ["Min. 10 Units", "Indonesia-based", "Has NPWP (Tax ID)", "Actively Operating"],
      cta: "Apply for Partnership",
      ctaHref: "/apply-ev-credit",
    },

    ctaTitle: "Ready to Join?",
    ctaDesc: "Contact our team to discuss the collaboration path that best fits your goals.",
    ctaCta: "Contact Renewa Team →",
  },
};

function BenefitItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <span style={{ color: "#B8F53A", fontSize: 13, lineHeight: "22px", flexShrink: 0, fontWeight: 700 }}>✓</span>
      <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>{text}</p>
    </div>
  );
}

export default function InvestorPartner() {
  const lang = useLang();
  const t = dict[lang];
  const { investor, supplier, recipient } = t;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* ── Hero ── */}
        <section style={{ padding: "72px 40px 64px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 60px)", color: "#fff",
              letterSpacing: -2, lineHeight: 1.05, marginBottom: 20,
            }}>
              {t.h1a}<br /><span style={{ color: "#B8F53A" }}>{t.h1b}</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.7, maxWidth: 520, marginBottom: 48, fontWeight: 300 }}>
              {t.desc}
            </p>

            {/* Path quick-nav */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {t.paths.map((p) => (
                <a key={p.n} href={p.anchor} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: "20px 24px", borderRadius: 12,
                    background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)",
                    transition: "border-color 0.2s",
                    cursor: "pointer",
                  }}
                    onMouseOver={e => (e.currentTarget.style.borderColor = "rgba(184,245,58,0.35)")}
                    onMouseOut={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                  >
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 8 }}>{p.n}</p>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 }}>{p.title}</p>
                    <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.5, fontWeight: 300 }}>{p.short}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 01 INVESTOR ── */}
        <section id="investor" style={{ padding: "80px 40px", background: "#000", scrollMarginTop: 80 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }}>

              {/* Left */}
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 20 }}>{investor.label}</p>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#fff", letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 20 }}>
                  {investor.title}<br /><span style={{ color: "#B8F53A" }}>{investor.titleAccent}</span>
                </h2>
                <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>{investor.desc}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {investor.benefits.map(b => <BenefitItem key={b} text={b} />)}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>{investor.forLabel}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {investor.forTags.map(tag => (
                      <span key={tag} style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.2)", color: "#B8F53A" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <Link href={investor.ctaHref} style={{
                  display: "inline-block", padding: "14px 28px", borderRadius: 8,
                  fontSize: 14, fontWeight: 600, background: "#B8F53A",
                  color: "#0D2B1E", textDecoration: "none",
                  fontFamily: "Syne, sans-serif",
                }}
                  onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                  onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
                >
                  {investor.cta}
                </Link>
              </div>

              {/* Right — Stats card */}
              <div>
                <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "36px 32px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #B8F53A, rgba(184,245,58,0.2))" }} />
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 28 }}>{investor.statsLabel}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                    {investor.stats.map(s => (
                      <div key={s.val} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 28, borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                        <p style={{ fontSize: 14, color: "#7A9E85", fontWeight: 300 }}>{s.label}</p>
                        <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 600, color: "#B8F53A", letterSpacing: -1 }}>{s.val}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(184,245,58,0.04)", border: "0.5px solid rgba(184,245,58,0.12)", borderRadius: 10 }}>
                    <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.6 }}>
                      {lang === "id"
                        ? "Renewa Green sedang membuka putaran pendanaan untuk akselerasi pertumbuhan ekosistem nasional."
                        : "Renewa Green is opening a funding round to accelerate national ecosystem growth."}
                    </p>
                    <p style={{ fontSize: 12, color: "#B8F53A", marginTop: 8, fontFamily: "JetBrains Mono, monospace" }}>
                      {lang === "id" ? "→ Hubungi kami untuk pitch deck" : "→ Contact us for the pitch deck"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 02 SUPPLIER ── */}
        <section id="supplier" style={{ padding: "80px 40px", background: "#0B0F0E", scrollMarginTop: 80 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }}>

              {/* Left — Product types */}
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 20 }}>{supplier.typesLabel}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {supplier.types.map(type => (
                    <div key={type.title} style={{ padding: "18px 20px", background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 10 }}>

                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 4 }}>{type.title}</p>
                      <p style={{ fontSize: 12, color: "#7A9E85", lineHeight: 1.5, fontWeight: 300 }}>{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 20 }}>{supplier.label}</p>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#fff", letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 20 }}>
                  {supplier.title}<br /><span style={{ color: "#B8F53A" }}>{supplier.titleAccent}</span>
                </h2>
                <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>{supplier.desc}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {supplier.benefits.map(b => <BenefitItem key={b} text={b} />)}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>{supplier.forLabel}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {supplier.forTags.map(tag => (
                      <span key={tag} style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.2)", color: "#B8F53A" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <Link href={supplier.ctaHref} style={{
                  display: "inline-block", padding: "14px 28px", borderRadius: 8,
                  fontSize: 14, fontWeight: 600, background: "#B8F53A",
                  color: "#0D2B1E", textDecoration: "none",
                  fontFamily: "Syne, sans-serif",
                }}
                  onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                  onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
                >
                  {supplier.cta}
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* ── 03 PENERIMA EV ── */}
        <section id="penerima" style={{ padding: "80px 40px", background: "#000", scrollMarginTop: 80 }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }}>

              {/* Left */}
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 20 }}>{recipient.label}</p>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3.5vw, 44px)", color: "#fff", letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 20 }}>
                  {recipient.title}<br /><span style={{ color: "#B8F53A" }}>{recipient.titleAccent}</span>
                </h2>
                <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.75, marginBottom: 32, fontWeight: 300 }}>{recipient.desc}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {recipient.benefits.map(b => <BenefitItem key={b} text={b} />)}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>{recipient.forLabel}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {recipient.forTags.map(tag => (
                      <span key={tag} style={{ padding: "4px 14px", borderRadius: 100, fontSize: 12, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)", color: "#F2F5EF" }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <Link href={recipient.ctaHref} style={{
                  display: "inline-block", padding: "14px 28px", borderRadius: 8,
                  fontSize: 14, fontWeight: 600, background: "#B8F53A",
                  color: "#0D2B1E", textDecoration: "none",
                  fontFamily: "Syne, sans-serif",
                }}
                  onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                  onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
                >
                  {recipient.cta}
                </Link>
              </div>

              {/* Right — Who is it for grid */}
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", marginBottom: 20 }}>{recipient.typesLabel}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {recipient.types.map(type => (
                    <div key={type.title} style={{ padding: "18px 20px", background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 10 }}>

                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 4 }}>{type.title}</p>
                      <p style={{ fontSize: 12, color: "#7A9E85", lineHeight: 1.5, fontWeight: 300 }}>{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section style={{ padding: "80px 40px", background: "#B8F53A" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: "#1A5C35", marginBottom: 12, fontWeight: 500 }}>
                {lang === "id" ? "Bergabung Sekarang" : "Join Now"}
              </p>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", color: "#0B0F0E", letterSpacing: -1.5, lineHeight: 1.05 }}>
                {t.ctaTitle}
              </h2>
              <p style={{ fontSize: 16, color: "#1A5C35", marginTop: 12, maxWidth: 480, fontWeight: 300 }}>{t.ctaDesc}</p>
            </div>
            <Link href="/contact"
              style={{
                padding: "16px 32px", borderRadius: 8, fontSize: 15, fontWeight: 600,
                background: "#0D2B1E", color: "#F2F5EF", textDecoration: "none",
                fontFamily: "Syne, sans-serif", whiteSpace: "nowrap",
                transition: "background 0.15s",
              }}
              onMouseOver={e => (e.currentTarget.style.background = "#0B0F0E")}
              onMouseOut={e => (e.currentTarget.style.background = "#0D2B1E")}
            >
              {t.ctaCta}
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
