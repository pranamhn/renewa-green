"use client";
import { useState } from "react";
import { saveFormSubmission } from "@/lib/adminStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { CheckCircle, Check } from "lucide-react";

const dict = {
  id: {
    label: "Carbon Credit",
    h1a: "Beli Carbon Credit",
    h1b: "Terverifikasi dari EV",
    desc: "Penuhi target net-zero dan kewajiban ESG perusahaan Anda dengan carbon credit berkualitas tinggi yang dihasilkan dari ekosistem mobilitas EV Renewa.",
    badges: ["✓ Standar Verra / Gold Standard", "✓ Terdaftar di IDXCarbon", "✓ Audit Independen", "✓ Sertifikat Digital"],
    whyTitle: "Kenapa Carbon Credit Renewa?",
    why: [
      { n: "01", title: "Verified & Audited",       desc: "Setiap kredit diverifikasi oleh auditor independen dan memenuhi standar Verra/Gold Standard internasional." },
      { n: "02", title: "Co-benefit Sosial",         desc: "Selain offset emisi, mendukung transisi EV dan lapangan kerja hijau di Indonesia." },
      { n: "03", title: "Transparansi Penuh",        desc: "Dashboard real-time untuk tracking pembelian, sertifikat, dan laporan emisi Anda." },
      { n: "04", title: "Dukungan ESG Reporting",    desc: "Tim kami membantu integrasi ke laporan keberlanjutan dan GHG inventory perusahaan Anda." },
    ],
    standardsLabel: "Standar & Registri",
    standards: ["Verra VCS", "Gold Standard", "IDXCarbon", "GHG Protocol"],
    formTitle: "Formulir Pembelian",
    sec1: "01 — Informasi Perusahaan",
    sec2: "02 — Kebutuhan Carbon Credit",
    f: {
      company:   "Nama Perusahaan *",    companyPh:  "PT / CV / Lembaga",
      contact:   "Nama PIC *",           contactPh:  "Nama Person in Charge",
      email:     "Email *",              emailPh:    "pic@perusahaan.com",
      phone:     "No. HP *",             phonePh:    "08xx-xxxx-xxxx",
      industry:  "Industri *",
      volume:    "Volume yang Dibutuhkan *",
      timeline:  "Target Waktu *",
      message:   "Pesan / Pertanyaan",   messagePh:  "Deskripsikan kebutuhan offset emisi Anda...",
    },
    industryOpts: [
      { v: "energi",      l: "Energi & Pertambangan" },
      { v: "transportasi", l: "Transportasi & Logistik" },
      { v: "manufaktur",  l: "Manufaktur & Industri" },
      { v: "keuangan",    l: "Keuangan & Perbankan" },
      { v: "teknologi",   l: "Teknologi & Telekomunikasi" },
      { v: "properti",    l: "Properti & Konstruksi" },
      { v: "ritel",       l: "Ritel & FMCG" },
      { v: "lainnya",     l: "Lainnya" },
    ],
    volumeOpts: [
      { v: "lt100",    l: "< 100 ton CO₂" },
      { v: "100to500", l: "100 – 500 ton CO₂" },
      { v: "500to1k",  l: "500 – 1.000 ton CO₂" },
      { v: "1kto5k",   l: "1.000 – 5.000 ton CO₂" },
      { v: "gt5k",     l: "> 5.000 ton CO₂" },
    ],
    timelineOpts: [
      { v: "asap",  l: "Segera (< 1 bulan)" },
      { v: "3m",    l: "3 bulan ke depan" },
      { v: "6m",    l: "6 bulan ke depan" },
      { v: "12m",   l: "Dalam 1 tahun" },
      { v: "plan",  l: "Masih perencanaan" },
    ],
    submit: "Kirim Permintaan →",
    okTitle: "Permintaan Diterima!",
    okDesc: "Tim carbon credit kami akan menghubungi Anda dalam 1×24 jam dengan proposal dan harga.",
    okRef: "Nomor Tiket",
    okBack: "Kembali ke Beranda",
  },
  en: {
    label: "Carbon Credit",
    h1a: "Buy Verified",
    h1b: "EV Carbon Credits",
    desc: "Meet your net-zero targets and ESG obligations with high-quality carbon credits generated from Renewa's EV mobility ecosystem.",
    badges: ["✓ Verra / Gold Standard", "✓ Registered on IDXCarbon", "✓ Independent Audit", "✓ Digital Certificate"],
    whyTitle: "Why Renewa Carbon Credits?",
    why: [
      { n: "01", title: "Verified & Audited",       desc: "Every credit is independently audited and meets international Verra/Gold Standard requirements." },
      { n: "02", title: "Social Co-benefits",        desc: "Beyond offsetting emissions, supports Indonesia's EV transition and green job creation." },
      { n: "03", title: "Full Transparency",         desc: "Real-time dashboard to track purchases, certificates, and your emissions report." },
      { n: "04", title: "ESG Reporting Support",     desc: "Our team helps integrate credits into your sustainability report and GHG inventory." },
    ],
    standardsLabel: "Standards & Registries",
    standards: ["Verra VCS", "Gold Standard", "IDXCarbon", "GHG Protocol"],
    formTitle: "Purchase Inquiry",
    sec1: "01 — Company Information",
    sec2: "02 — Carbon Credit Requirements",
    f: {
      company:   "Company Name *",       companyPh:  "PT / Company / Institution",
      contact:   "PIC Name *",           contactPh:  "Person in Charge name",
      email:     "Email *",              emailPh:    "pic@company.com",
      phone:     "Mobile *",             phonePh:    "08xx-xxxx-xxxx",
      industry:  "Industry *",
      volume:    "Volume Required *",
      timeline:  "Target Timeline *",
      message:   "Message / Questions",  messagePh:  "Describe your emission offset requirements...",
    },
    industryOpts: [
      { v: "energi",      l: "Energy & Mining" },
      { v: "transportasi", l: "Transportation & Logistics" },
      { v: "manufaktur",  l: "Manufacturing & Industry" },
      { v: "keuangan",    l: "Finance & Banking" },
      { v: "teknologi",   l: "Technology & Telecoms" },
      { v: "properti",    l: "Property & Construction" },
      { v: "ritel",       l: "Retail & FMCG" },
      { v: "lainnya",     l: "Other" },
    ],
    volumeOpts: [
      { v: "lt100",    l: "< 100 tons CO₂" },
      { v: "100to500", l: "100 – 500 tons CO₂" },
      { v: "500to1k",  l: "500 – 1,000 tons CO₂" },
      { v: "1kto5k",   l: "1,000 – 5,000 tons CO₂" },
      { v: "gt5k",     l: "> 5,000 tons CO₂" },
    ],
    timelineOpts: [
      { v: "asap",  l: "Immediately (< 1 month)" },
      { v: "3m",    l: "Within 3 months" },
      { v: "6m",    l: "Within 6 months" },
      { v: "12m",   l: "Within 1 year" },
      { v: "plan",  l: "Still in planning phase" },
    ],
    submit: "Submit Request →",
    okTitle: "Request Received!",
    okDesc: "Our carbon credit team will contact you within 24 hours with a proposal and pricing.",
    okRef: "Ticket Number",
    okBack: "Back to Home",
  },
};

type FormState = {
  company: string; contact: string; email: string; phone: string;
  industry: string; volume: string; timeline: string; message: string;
};

export default function BuyCarbonCredit() {
  const lang = useLang();
  const t = dict[lang];
  const [form, setForm] = useState<FormState>({
    company: "", contact: "", email: "", phone: "",
    industry: "", volume: "", timeline: "", message: "",
  });
  const [sent, setSent] = useState(false);
  const [ticketNo, setTicketNo] = useState("");

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = "CC-" + Date.now().toString(36).toUpperCase().slice(-6);
    setTicketNo(id);
    saveFormSubmission("buy-carbon-credit", id, form as Record<string, string>);
    setSent(true);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8, fontSize: 14,
    background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)",
    color: "#F2F5EF", outline: "none", fontFamily: "DM Sans, sans-serif",
    boxSizing: "border-box",
  };
  const sel: React.CSSProperties = { ...inp, appearance: "none" };
  const lbl: React.CSSProperties = { fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 };
  const secHead: React.CSSProperties = {
    fontFamily: "JetBrains Mono, monospace", fontSize: 11,
    color: "rgba(184,245,58,0.6)", letterSpacing: "2px",
    marginBottom: 16, paddingBottom: 12,
    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <style>{`
          @media (max-width: 768px) {
            .bcc-hero { padding: 48px 20px 36px !important; }
            .bcc-why-sec { padding: 48px 20px !important; }
            .bcc-why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .bcc-form-sec { padding: 48px 20px 72px !important; }
            .bcc-form-head { padding: 24px 20px 0 !important; }
            .bcc-form-pad { padding: 24px 20px !important; }
            .bcc-inner-row { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section className="bcc-hero" style={{ padding: "64px 40px 52px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 58px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
              {t.h1a}<br /><span style={{ color: "#B8F53A" }}>{t.h1b}</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.7, maxWidth: 540, marginBottom: 32, fontWeight: 300 }}>{t.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {t.badges.map(b => (
                <span key={b} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, fontSize: 12, background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.22)", color: "#B8F53A", fontFamily: "JetBrains Mono, monospace" }}>
                  <Check size={11} strokeWidth={2.5} />{b.replace(/^✓\s*/, "")}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why + Standards ── */}
        <section className="bcc-why-sec" style={{ padding: "64px 40px", background: "#000" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="bcc-why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: "#fff", letterSpacing: -1, marginBottom: 32, lineHeight: 1.1 }}>
                  {t.whyTitle}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {t.why.map(w => (
                    <div key={w.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", flexShrink: 0, paddingTop: 3 }}>{w.n}</span>
                      <div>
                        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>{w.title}</p>
                        <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Standards card */}
                <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #B8F53A, rgba(184,245,58,0.2))" }} />
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>{t.standardsLabel}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {t.standards.map(s => (
                      <div key={s} style={{ padding: "14px 18px", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 8, textAlign: "center" }}>
                        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#B8F53A" }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Carbon offset visual */}
                <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 32px" }}>
                  <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 32, fontWeight: 600, color: "#B8F53A", letterSpacing: -1, marginBottom: 4 }}>500.000</p>
                  <p style={{ fontSize: 14, color: "#7A9E85", marginBottom: 2 }}>Ton CO₂ — Target Offset 2035</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "JetBrains Mono, monospace" }}>≈ 2.000.000 pohon dewasa / 25 tahun</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Form ── */}
        <section className="bcc-form-sec" style={{ padding: "64px 40px 96px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              {sent ? (
                <div style={{ padding: "64px 48px", textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 28px", background: "rgba(184,245,58,0.1)", border: "0.5px solid rgba(184,245,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle size={32} color="#B8F53A" strokeWidth={1.5} />
                  </div>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 12, letterSpacing: -0.5 }}>{t.okTitle}</h2>
                  <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.65, maxWidth: 400, margin: "0 auto 32px" }}>{t.okDesc}</p>
                  <div style={{ display: "inline-block", padding: "12px 28px", borderRadius: 10, background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.25)", marginBottom: 36 }}>
                    <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px", marginBottom: 4 }}>{t.okRef}</p>
                    <p style={{ fontSize: 22, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{ticketNo}</p>
                  </div>
                  <br />
                  <Link href="/" style={{ padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#B8F53A", color: "#0D2B1E", textDecoration: "none", fontFamily: "Syne, sans-serif" }}>{t.okBack}</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="bcc-form-head" style={{ padding: "28px 40px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{t.formTitle}</p>
                  </div>
                  <div className="bcc-form-pad" style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 28 }}>

                    {/* Section 1 */}
                    <div>
                      <p style={secHead}>{t.sec1}</p>
                      <div className="bcc-inner-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.company}</label>
                          <input required style={inp} placeholder={t.f.companyPh} value={form.company} onChange={set("company")} />
                        </div>
                        <div>
                          <label style={lbl}>{t.f.contact}</label>
                          <input required style={inp} placeholder={t.f.contactPh} value={form.contact} onChange={set("contact")} />
                        </div>
                      </div>
                      <div className="bcc-inner-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.email}</label>
                          <input required type="email" style={inp} placeholder={t.f.emailPh} value={form.email} onChange={set("email")} />
                        </div>
                        <div>
                          <label style={lbl}>{t.f.phone}</label>
                          <input required style={inp} placeholder={t.f.phonePh} value={form.phone} onChange={set("phone")} />
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>{t.f.industry}</label>
                        <select required style={sel} value={form.industry} onChange={set("industry")}>
                          <option value="" disabled>{lang === "id" ? "Pilih industri..." : "Select industry..."}</option>
                          {t.industryOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <p style={secHead}>{t.sec2}</p>
                      <div className="bcc-inner-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.volume}</label>
                          <select required style={sel} value={form.volume} onChange={set("volume")}>
                            <option value="" disabled>{lang === "id" ? "Pilih volume..." : "Select volume..."}</option>
                            {t.volumeOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={lbl}>{t.f.timeline}</label>
                          <select required style={sel} value={form.timeline} onChange={set("timeline")}>
                            <option value="" disabled>{lang === "id" ? "Pilih timeline..." : "Select timeline..."}</option>
                            {t.timelineOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>{t.f.message}</label>
                        <textarea rows={4} style={{ ...inp, resize: "vertical" as const }} placeholder={t.f.messagePh} value={form.message} onChange={set("message")} />
                      </div>
                    </div>

                    <button type="submit" style={{ width: "100%", padding: "15px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, background: "#B8F53A", color: "#0D2B1E", border: "none", cursor: "pointer", fontFamily: "Syne, sans-serif", letterSpacing: -0.3 }}
                      onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                      onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}>
                      {t.submit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
