"use client";
import { useState } from "react";
import { saveFormSubmission } from "@/lib/adminStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { CheckCircle } from "lucide-react";

const dict = {
  id: {
    label: "Investor — Jadwalkan Pertemuan",
    h1a: "Jadwalkan",
    h1b: "Pertemuan Investasi",
    desc: "Kami membuka ruang diskusi eksklusif untuk calon investor yang ingin memahami ekosistem, proyeksi bisnis, dan peluang kolaborasi bersama Renewa Green.",
    leftTitle: "Apa yang Akan Anda Dapatkan",
    leftItems: [
      { title: "Pitch Deck Eksklusif", desc: "Dokumen penawaran investasi terbaru dengan data finansial terkini." },
      { title: "Demo Ekosistem", desc: "Tur langsung platform Renewa: kredit, carbon, recycling, energi." },
      { title: "Diskusi One-on-One", desc: "Sesi tanya-jawab langsung dengan tim founding Renewa." },
      { title: "Skema & Proyeksi", desc: "Pemaparan detail return on investment dan roadmap ekspansi 2035." },
    ],
    statsLabel: "Mengapa Berinvestasi Sekarang",
    stats: [
      { val: "100K", label: "Target Unit EV 2035" },
      { val: ">Rp2T", label: "Estimasi GMV 2030" },
      { val: "4", label: "Pilar Bisnis Aktif" },
    ],
    formTitle: "Detail Pertemuan",
    name: "Nama Lengkap",
    company: "Nama Perusahaan / Institusi",
    email: "Email Bisnis",
    phone: "Nomor Telepon",
    investorType: "Tipe Investor",
    investorTypes: [
      { val: "", label: "Pilih tipe investor…" },
      { val: "angel", label: "Angel Investor" },
      { val: "vc", label: "Venture Capital" },
      { val: "family_office", label: "Family Office" },
      { val: "esg_fund", label: "ESG Fund" },
      { val: "institution", label: "Institusi Keuangan" },
      { val: "impact", label: "Impact Investor" },
      { val: "other", label: "Lainnya" },
    ],
    investRange: "Estimasi Nilai Investasi",
    investRanges: [
      { val: "", label: "Pilih estimasi nilai…" },
      { val: "lt500m", label: "< Rp500 Juta" },
      { val: "500m_1b", label: "Rp500 Juta – Rp1 Miliar" },
      { val: "1b_5b", label: "Rp1 – Rp5 Miliar" },
      { val: "5b_20b", label: "Rp5 – Rp20 Miliar" },
      { val: "gt20b", label: "> Rp20 Miliar" },
    ],
    preferredDate: "Tanggal Pilihan",
    preferredTime: "Slot Waktu",
    timeSlots: [
      { val: "", label: "Pilih slot waktu…" },
      { val: "morning", label: "Pagi (09.00 – 11.00 WIB)" },
      { val: "midday", label: "Siang (11.00 – 13.00 WIB)" },
      { val: "afternoon", label: "Sore (13.00 – 17.00 WIB)" },
    ],
    format: "Format Pertemuan",
    formats: [
      { val: "", label: "Pilih format…" },
      { val: "online", label: "Online (Google Meet / Zoom)" },
      { val: "onsite_jkt", label: "Tatap Muka – Jakarta" },
      { val: "onsite_other", label: "Tatap Muka – Kota Lain" },
    ],
    notes: "Topik atau Pertanyaan Khusus (opsional)",
    notesPlaceholder: "Misalnya: fokus pada unit bisnis Carbon Credit, pertanyaan tentang exit strategy, dll.",
    submit: "Kirim Permintaan Pertemuan",
    submitting: "Mengirim…",
    required: "Wajib diisi",
    successTitle: "Permintaan Terkirim!",
    successDesc: "Tim investor relations kami akan menghubungi Anda dalam 1–2 hari kerja untuk mengkonfirmasi jadwal.",
    meetingId: "ID Pertemuan",
    backHome: "Kembali ke Beranda",
  },
  en: {
    label: "Investor — Schedule a Meeting",
    h1a: "Schedule an",
    h1b: "Investment Meeting",
    desc: "We open exclusive discussion sessions for prospective investors who want to understand the ecosystem, business projections, and collaboration opportunities with Renewa Green.",
    leftTitle: "What You'll Receive",
    leftItems: [
      { title: "Exclusive Pitch Deck", desc: "Latest investment proposal with up-to-date financial data." },
      { title: "Ecosystem Demo", desc: "A live tour of the Renewa platform: credit, carbon, recycling, energy." },
      { title: "One-on-One Discussion", desc: "A direct Q&A session with Renewa's founding team." },
      { title: "Projections & Schemes", desc: "Detailed ROI breakdown and 2035 expansion roadmap." },
    ],
    statsLabel: "Why Invest Now",
    stats: [
      { val: "100K", label: "EV Unit Target 2035" },
      { val: ">$130M", label: "Estimated GMV 2030" },
      { val: "4", label: "Active Business Pillars" },
    ],
    formTitle: "Meeting Details",
    name: "Full Name",
    company: "Company / Institution Name",
    email: "Business Email",
    phone: "Phone Number",
    investorType: "Investor Type",
    investorTypes: [
      { val: "", label: "Select investor type…" },
      { val: "angel", label: "Angel Investor" },
      { val: "vc", label: "Venture Capital" },
      { val: "family_office", label: "Family Office" },
      { val: "esg_fund", label: "ESG Fund" },
      { val: "institution", label: "Financial Institution" },
      { val: "impact", label: "Impact Investor" },
      { val: "other", label: "Other" },
    ],
    investRange: "Estimated Investment Value",
    investRanges: [
      { val: "", label: "Select estimated value…" },
      { val: "lt500m", label: "< $33K" },
      { val: "500m_1b", label: "$33K – $66K" },
      { val: "1b_5b", label: "$66K – $330K" },
      { val: "5b_20b", label: "$330K – $1.3M" },
      { val: "gt20b", label: "> $1.3M" },
    ],
    preferredDate: "Preferred Date",
    preferredTime: "Time Slot",
    timeSlots: [
      { val: "", label: "Select time slot…" },
      { val: "morning", label: "Morning (09:00 – 11:00 WIB)" },
      { val: "midday", label: "Midday (11:00 – 13:00 WIB)" },
      { val: "afternoon", label: "Afternoon (13:00 – 17:00 WIB)" },
    ],
    format: "Meeting Format",
    formats: [
      { val: "", label: "Select format…" },
      { val: "online", label: "Online (Google Meet / Zoom)" },
      { val: "onsite_jkt", label: "In-person – Jakarta" },
      { val: "onsite_other", label: "In-person – Other City" },
    ],
    notes: "Special Topics or Questions (optional)",
    notesPlaceholder: "E.g. focus on Carbon Credit business unit, questions about exit strategy, etc.",
    submit: "Send Meeting Request",
    submitting: "Sending…",
    required: "Required",
    successTitle: "Request Sent!",
    successDesc: "Our investor relations team will contact you within 1–2 business days to confirm the schedule.",
    meetingId: "Meeting ID",
    backHome: "Back to Home",
  },
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  investorType: string;
  investRange: string;
  preferredDate: string;
  preferredTime: string;
  format: string;
  notes: string;
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 14px", borderRadius: 8,
  background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)",
  color: "#F2F5EF", fontSize: 14, fontFamily: "inherit", outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12, color: "#7A9E85", letterSpacing: "0.5px",
  marginBottom: 6, display: "block",
};

export default function ScheduleMeeting() {
  const lang = useLang();
  const t = dict[lang];

  const [form, setForm] = useState<FormState>({
    name: "", company: "", email: "", phone: "",
    investorType: "", investRange: "",
    preferredDate: "", preferredTime: "", format: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meetingId, setMeetingId] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const id = "MTG-" + Date.now().toString(36).toUpperCase().slice(-6);
      setMeetingId(id);
      saveFormSubmission("schedule-meeting", id, form as unknown as Record<string, string>);
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68, background: "#0B0F0E", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: "72px 40px 56px", background: "#000", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 56px)", color: "#fff",
              letterSpacing: -2, lineHeight: 1.05, marginTop: 12,
            }}>
              {t.h1a}<br /><span style={{ color: "#B8F53A" }}>{t.h1b}</span>
            </h1>
            <p style={{ fontSize: 16, color: "#7A9E85", lineHeight: 1.75, maxWidth: 540, marginTop: 18, fontWeight: 300 }}>
              {t.desc}
            </p>
          </div>
        </section>

        {/* Body */}
        <section style={{ padding: "72px 40px 96px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "flex-start" }}>

            {/* Left sticky */}
            <div style={{ position: "sticky", top: 96 }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: -0.5, marginBottom: 28 }}>{t.leftTitle}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 44 }}>
                {t.leftItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#B8F53A", fontWeight: 700 }}>0{i + 1}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#F2F5EF", marginBottom: 4 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #B8F53A, rgba(184,245,58,0.15))" }} />
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>{t.statsLabel}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {t.stats.map(s => (
                    <div key={s.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ fontSize: 13, color: "#7A9E85", fontWeight: 300 }}>{s.label}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 600, color: "#B8F53A", letterSpacing: -0.5 }}>{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form / Success */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "40px 36px" }}>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(184,245,58,0.1)", border: "0.5px solid rgba(184,245,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <CheckCircle size={28} color="#B8F53A" strokeWidth={1.5} />
                  </div>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: -0.5, marginBottom: 12 }}>{t.successTitle}</h2>
                  <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px", fontWeight: 300 }}>{t.successDesc}</p>
                  <div style={{ display: "inline-block", padding: "10px 24px", background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 8, marginBottom: 36 }}>
                    <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 4 }}>{t.meetingId}</p>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, fontWeight: 700, color: "#B8F53A", letterSpacing: 2 }}>{meetingId}</p>
                  </div>
                  <br />
                  <Link href="/" style={{ padding: "12px 28px", borderRadius: 8, background: "#B8F53A", color: "#0D2B1E", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.backHome}</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: -0.5, marginBottom: 28 }}>{t.formTitle}</h3>

                  {/* Personal */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.name} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="name" required value={form.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.company} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="company" required value={form.company} onChange={handleChange} style={inputStyle} placeholder="PT. Contoh Tbk" />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.email} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="email@company.com" />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.phone} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="phone" required value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+62 812 xxxx xxxx" />
                    </div>
                  </div>

                  {/* Investment */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.investorType} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <select name="investorType" required value={form.investorType} onChange={handleChange} style={inputStyle}>
                        {t.investorTypes.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.investRange}</label>
                      <select name="investRange" value={form.investRange} onChange={handleChange} style={inputStyle}>
                        {t.investRanges.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.preferredDate} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="preferredDate" type="date" required value={form.preferredDate} onChange={handleChange} style={{ ...inputStyle, colorScheme: "dark" }} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.preferredTime} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <select name="preferredTime" required value={form.preferredTime} onChange={handleChange} style={inputStyle}>
                        {t.timeSlots.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t.format} <span style={{ color: "#B8F53A" }}>*</span></label>
                    <select name="format" required value={form.format} onChange={handleChange} style={inputStyle}>
                      {t.formats.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={labelStyle}>{t.notes}</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={4}
                      style={{ ...inputStyle, resize: "vertical" }} placeholder={t.notesPlaceholder} />
                  </div>

                  <button type="submit" disabled={loading} style={{
                    width: "100%", padding: "15px 28px", borderRadius: 8,
                    fontSize: 15, fontWeight: 600, background: loading ? "rgba(184,245,58,0.5)" : "#B8F53A",
                    color: "#0D2B1E", border: "none", cursor: loading ? "default" : "pointer",
                    fontFamily: "Syne, sans-serif", letterSpacing: -0.3, transition: "background 0.15s",
                  }}>
                    {loading ? t.submitting : t.submit}
                  </button>
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
