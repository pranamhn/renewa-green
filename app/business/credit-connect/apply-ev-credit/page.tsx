"use client";
import { useState } from "react";
import { saveFormSubmission } from "@/lib/adminStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Zap, Banknote, Leaf, Package, CheckCircle, Check } from "lucide-react";

const provinces = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten",
  "DI Yogyakarta", "Bali", "Sumatera Utara", "Sumatera Selatan", "Sumatera Barat",
  "Riau", "Lampung", "Kalimantan Timur", "Kalimantan Selatan", "Sulawesi Selatan",
  "Sulawesi Utara", "Nusa Tenggara Barat", "Maluku", "Papua", "Lainnya / Other",
];

const dict = {
  id: {
    label: "Pengajuan Kredit",
    h1a: "Ajukan Kredit EV",
    h1b: "Sekarang",
    desc: "Proses 100% digital. Tidak perlu datang ke kantor — isi formulir, upload dokumen, dan terima motor EV di rumah Anda.",
    badges: ["✓ Approval 1×24 Jam", "✓ Tanpa Kunjungan Kantor", "✓ 20+ Mitra Pembiayaan", "✓ Pengiriman ke Rumah"],
    steps: [
      { n: "01", t: "Isi Formulir", d: "Lengkapi data diri dan preferensi EV secara online." },
      { n: "02", t: "Verifikasi", d: "Tim kami memproses dan mencarikan penawaran terbaik." },
      { n: "03", t: "Terima Motor EV", d: "Unit dikirim ke alamat Anda setelah approval." },
    ],
    whyTitle: "Kenapa Credit Connect?",
    benefits: [
      { title: "Proses Kilat", desc: "Approval dalam 1×24 jam. Tidak perlu antri atau datang ke kantor." },
      { title: "Bunga Terbaik", desc: "Sistem kami mencarikan penawaran terbaik dari 20+ lembaga keuangan." },
      { title: "Hasilkan Carbon Credit", desc: "Setiap unit EV aktif menghasilkan carbon credit yang bernilai." },
      { title: "Pengiriman ke Rumah", desc: "Motor EV diantar ke alamat Anda setelah proses selesai." },
    ],
    helpTitle: "Butuh Bantuan?",
    helpDesc: "Tim kami siap membantu Anda melalui proses pengajuan.",
    helpEmail: "kredit@renewa.asia",
    helpPhone: "+62 813-8887-0011",
    formTitle: "Formulir Pengajuan",
    sec1: "01 — Informasi Pribadi",
    sec2: "02 — Alamat",
    sec3: "03 — Preferensi EV",
    sec4: "04 — Informasi Keuangan",
    f: {
      name: "Nama Lengkap *", namePh: "Nama sesuai KTP",
      nik: "NIK / Nomor KTP *", nikPh: "16 digit NIK",
      email: "Email *", emailPh: "email@domain.com",
      phone: "No. HP / WhatsApp *", phonePh: "08xx-xxxx-xxxx",
      province: "Provinsi *",
      city: "Kota / Kabupaten *", cityPh: "Nama kota atau kabupaten",
      model: "Model Motor EV *",
      dp: "Uang Muka (DP) *",
      tenor: "Tenor *",
      employment: "Status Pekerjaan *",
      income: "Penghasilan Bulanan *",
      agree: "Saya menyetujui syarat & ketentuan serta kebijakan privasi Renewa Green.",
    },
    models: [
      { v: "standard", l: "EV Standard — Rp 15–20 jt" },
      { v: "urban", l: "EV Urban — Rp 20–28 jt" },
      { v: "pro", l: "EV Pro — Rp 28–40 jt" },
      { v: "cargo", l: "EV Cargo — Rp 35–55 jt" },
    ],
    dpOpts: [
      { v: "0", l: "0% — Tanpa DP" },
      { v: "10", l: "10%" },
      { v: "20", l: "20%" },
      { v: "30", l: "30%" },
    ],
    tenorOpts: [
      { v: "12", l: "12 Bulan" },
      { v: "18", l: "18 Bulan" },
      { v: "24", l: "24 Bulan" },
      { v: "36", l: "36 Bulan" },
    ],
    empOpts: [
      { v: "karyawan", l: "Karyawan Swasta" },
      { v: "pns", l: "PNS / BUMN" },
      { v: "wiraswasta", l: "Wiraswasta" },
      { v: "profesional", l: "Profesional (Dokter, Pengacara, dll)" },
      { v: "lainnya", l: "Lainnya" },
    ],
    incomeOpts: [
      { v: "lt3", l: "< Rp 3 juta / bulan" },
      { v: "3to5", l: "Rp 3–5 juta / bulan" },
      { v: "5to10", l: "Rp 5–10 juta / bulan" },
      { v: "10to20", l: "Rp 10–20 juta / bulan" },
      { v: "gt20", l: "> Rp 20 juta / bulan" },
    ],
    submit: "Kirim Pengajuan →",
    okTitle: "Pengajuan Diterima!",
    okDesc: "Tim kami akan menghubungi Anda dalam 1×24 jam untuk verifikasi dokumen.",
    okRef: "Nomor Referensi",
    okBack: "Kembali ke Beranda",
    okCredit: "Cek Status Pengajuan",
  },
  en: {
    label: "Credit Application",
    h1a: "Apply for EV Credit",
    h1b: "Now",
    desc: "100% digital process. No office visit required — fill the form, upload documents, and receive your EV at home.",
    badges: ["✓ 24h Approval", "✓ No Office Visit", "✓ 20+ Financing Partners", "✓ Home Delivery"],
    steps: [
      { n: "01", t: "Fill the Form", d: "Complete your personal and EV preference details online." },
      { n: "02", t: "Verification", d: "Our team processes your application and finds the best offer." },
      { n: "03", t: "Receive Your EV", d: "Unit delivered to your address after approval." },
    ],
    whyTitle: "Why Credit Connect?",
    benefits: [
      { title: "Fast Approval", desc: "Approval within 24 hours. No queuing or office visits required." },
      { title: "Best Rates", desc: "Our system finds the best offer from 20+ financial institutions." },
      { title: "Earn Carbon Credits", desc: "Every active EV unit generates valuable carbon credits." },
      { title: "Home Delivery", desc: "Your EV motorcycle is delivered to your address after completion." },
    ],
    helpTitle: "Need Help?",
    helpDesc: "Our team is ready to guide you through the application process.",
    helpEmail: "kredit@renewa.asia",
    helpPhone: "+62 813-8887-0011",
    formTitle: "Application Form",
    sec1: "01 — Personal Information",
    sec2: "02 — Address",
    sec3: "03 — EV Preferences",
    sec4: "04 — Financial Information",
    f: {
      name: "Full Name *", namePh: "Name as per ID",
      nik: "NIK / National ID *", nikPh: "16-digit NIK",
      email: "Email *", emailPh: "email@domain.com",
      phone: "Mobile / WhatsApp *", phonePh: "08xx-xxxx-xxxx",
      province: "Province *",
      city: "City / Regency *", cityPh: "City or regency name",
      model: "EV Motorcycle Model *",
      dp: "Down Payment *",
      tenor: "Loan Term *",
      employment: "Employment Status *",
      income: "Monthly Income *",
      agree: "I agree to Renewa Green's terms & conditions and privacy policy.",
    },
    models: [
      { v: "standard", l: "EV Standard — IDR 15–20M" },
      { v: "urban", l: "EV Urban — IDR 20–28M" },
      { v: "pro", l: "EV Pro — IDR 28–40M" },
      { v: "cargo", l: "EV Cargo — IDR 35–55M" },
    ],
    dpOpts: [
      { v: "0", l: "0% — No Down Payment" },
      { v: "10", l: "10%" },
      { v: "20", l: "20%" },
      { v: "30", l: "30%" },
    ],
    tenorOpts: [
      { v: "12", l: "12 Months" },
      { v: "18", l: "18 Months" },
      { v: "24", l: "24 Months" },
      { v: "36", l: "36 Months" },
    ],
    empOpts: [
      { v: "private", l: "Private Employee" },
      { v: "gov", l: "Government / State-Owned Enterprise" },
      { v: "entrepreneur", l: "Entrepreneur" },
      { v: "professional", l: "Professional (Doctor, Lawyer, etc.)" },
      { v: "other", l: "Other" },
    ],
    incomeOpts: [
      { v: "lt3", l: "< IDR 3M / month" },
      { v: "3to5", l: "IDR 3–5M / month" },
      { v: "5to10", l: "IDR 5–10M / month" },
      { v: "10to20", l: "IDR 10–20M / month" },
      { v: "gt20", l: "> IDR 20M / month" },
    ],
    submit: "Submit Application →",
    okTitle: "Application Received!",
    okDesc: "Our team will contact you within 24 hours for document verification.",
    okRef: "Reference Number",
    okBack: "Back to Home",
    okCredit: "Check Application Status",
  },
};

const benefitIcons = [Zap, Banknote, Leaf, Package];

type FormState = {
  name: string; nik: string; email: string; phone: string;
  province: string; city: string;
  model: string; dp: string; tenor: string;
  employment: string; income: string;
  agree: boolean;
};

export default function ApplyEvCredit() {
  const lang = useLang();
  const t = dict[lang];
  const [form, setForm] = useState<FormState>({
    name: "", nik: "", email: "", phone: "",
    province: "", city: "",
    model: "", dp: "", tenor: "",
    employment: "", income: "",
    agree: false,
  });
  const [sent, setSent] = useState(false);
  const [refNo, setRefNo] = useState("");

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = "RNW-" + Date.now().toString(36).toUpperCase().slice(-6);
    setRefNo(id);
    const { agree: _agree, ...rest } = form;
    saveFormSubmission("apply-ev-credit", id, rest as Record<string, string>);
    setSent(true);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8, fontSize: 14,
    background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)",
    color: "#F2F5EF", outline: "none", fontFamily: "DM Sans, sans-serif",
    transition: "border-color 0.15s", boxSizing: "border-box",
  };
  const sel: React.CSSProperties = { ...inp, appearance: "none" };
  const lbl: React.CSSProperties = { fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 };
  const secHead: React.CSSProperties = {
    fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "rgba(184,245,58,0.6)",
    letterSpacing: "2px", marginBottom: 16, paddingBottom: 12,
    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>

        {/* ── Hero ── */}
        <section style={{ padding: "64px 40px 52px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 58px)", color: "#fff",
              letterSpacing: -2, lineHeight: 1.05, marginBottom: 20,
            }}>
              {t.h1a}<br /><span style={{ color: "#B8F53A" }}>{t.h1b}</span>
            </h1>
            <p style={{ fontSize: 17, color: "#7A9E85", lineHeight: 1.7, maxWidth: 540, marginBottom: 32, fontWeight: 300 }}>
              {t.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {t.badges.map(b => (
                <span key={b} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 100, fontSize: 12,
                  background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.22)",
                  color: "#B8F53A", fontFamily: "JetBrains Mono, monospace",
                }}>
                  <Check size={11} strokeWidth={2.5} />
                  {b.replace(/^✓\s*/, "")}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Steps strip ── */}
        <section style={{ padding: "32px 40px", background: "#000" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {t.steps.map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: i === 0 ? "#B8F53A" : "rgba(255,255,255,0.05)",
                  border: i === 0 ? "none" : "0.5px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 700,
                  color: i === 0 ? "#0B0F0E" : "#7A9E85",
                }}>{s.n}</div>
                <div>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 4 }}>{s.t}</p>
                  <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.5, fontWeight: 300 }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Main: Left benefits + Right form ── */}
        <section style={{ padding: "64px 40px 96px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 56, alignItems: "flex-start" }}>

            {/* Left */}
            <div style={{ position: "sticky", top: 96 }}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 28, letterSpacing: -0.5 }}>
                {t.whyTitle}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                {t.benefits.map((b, i) => {
                  const BIcon = benefitIcons[i];
                  return (
                  <div key={b.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                      background: "rgba(184,245,58,0.07)", border: "0.5px solid rgba(184,245,58,0.18)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}><BIcon size={16} color="#B8F53A" /></div>
                    <div>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>{b.title}</p>
                      <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.55, fontWeight: 300 }}>{b.desc}</p>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Help card */}
              <div style={{
                padding: 24, borderRadius: 12,
                background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 6 }}>{t.helpTitle}</p>
                <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.5, marginBottom: 16 }}>{t.helpDesc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href={`mailto:${t.helpEmail}`} style={{ fontSize: 13, color: "#B8F53A", textDecoration: "none" }}>{t.helpEmail}</a>
                  <a href={`tel:${t.helpPhone}`} style={{ fontSize: 13, color: "#B8F53A", textDecoration: "none" }}>{t.helpPhone}</a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              {sent ? (
                /* Success */
                <div style={{ padding: "64px 48px", textAlign: "center" }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%", margin: "0 auto 28px",
                    background: "rgba(184,245,58,0.1)", border: "0.5px solid rgba(184,245,58,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle size={32} color="#B8F53A" strokeWidth={1.5} />
                  </div>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: "#fff", marginBottom: 12, letterSpacing: -0.5 }}>
                    {t.okTitle}
                  </h2>
                  <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.65, maxWidth: 400, margin: "0 auto 32px" }}>
                    {t.okDesc}
                  </p>
                  <div style={{
                    display: "inline-block", padding: "12px 24px", borderRadius: 10,
                    background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.25)",
                    marginBottom: 36,
                  }}>
                    <p style={{ fontSize: 11, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px", marginBottom: 4 }}>
                      {t.okRef}
                    </p>
                    <p style={{ fontSize: 22, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>
                      {refNo}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/" style={{
                      padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                      background: "#B8F53A", color: "#0D2B1E", textDecoration: "none",
                    }}>{t.okBack}</Link>
                    <Link href="/contact" style={{
                      padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                      background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.12)",
                      color: "#fff", textDecoration: "none",
                    }}>{t.okCredit}</Link>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit}>
                  <div style={{ padding: "32px 40px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{t.formTitle}</p>
                  </div>

                  <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 28 }}>

                    {/* Section 1 — Personal */}
                    <div>
                      <p style={secHead}>{t.sec1}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.name}</label>
                          <input required style={inp} placeholder={t.f.namePh} value={form.name} onChange={set("name")} />
                        </div>
                        <div>
                          <label style={lbl}>{t.f.nik}</label>
                          <input required style={inp} placeholder={t.f.nikPh} value={form.nik} onChange={set("nik")} maxLength={16} pattern="\d{16}" />
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.email}</label>
                          <input required type="email" style={inp} placeholder={t.f.emailPh} value={form.email} onChange={set("email")} />
                        </div>
                        <div>
                          <label style={lbl}>{t.f.phone}</label>
                          <input required style={inp} placeholder={t.f.phonePh} value={form.phone} onChange={set("phone")} />
                        </div>
                      </div>
                    </div>

                    {/* Section 2 — Address */}
                    <div>
                      <p style={secHead}>{t.sec2}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.province}</label>
                          <select required style={sel} value={form.province} onChange={set("province")}>
                            <option value="" disabled>{lang === "id" ? "Pilih provinsi..." : "Select province..."}</option>
                            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={lbl}>{t.f.city}</label>
                          <input required style={inp} placeholder={t.f.cityPh} value={form.city} onChange={set("city")} />
                        </div>
                      </div>
                    </div>

                    {/* Section 3 — EV Preferences */}
                    <div>
                      <p style={secHead}>{t.sec3}</p>
                      <div style={{ marginBottom: 16 }}>
                        <label style={lbl}>{t.f.model}</label>
                        <select required style={sel} value={form.model} onChange={set("model")}>
                          <option value="" disabled>{lang === "id" ? "Pilih model..." : "Select model..."}</option>
                          {t.models.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                        </select>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.dp}</label>
                          <select required style={sel} value={form.dp} onChange={set("dp")}>
                            <option value="" disabled>{lang === "id" ? "Pilih DP..." : "Select DP..."}</option>
                            {t.dpOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={lbl}>{t.f.tenor}</label>
                          <select required style={sel} value={form.tenor} onChange={set("tenor")}>
                            <option value="" disabled>{lang === "id" ? "Pilih tenor..." : "Select term..."}</option>
                            {t.tenorOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 4 — Financial */}
                    <div>
                      <p style={secHead}>{t.sec4}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.employment}</label>
                          <select required style={sel} value={form.employment} onChange={set("employment")}>
                            <option value="" disabled>{lang === "id" ? "Pilih status..." : "Select status..."}</option>
                            {t.empOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={lbl}>{t.f.income}</label>
                          <select required style={sel} value={form.income} onChange={set("income")}>
                            <option value="" disabled>{lang === "id" ? "Pilih range..." : "Select range..."}</option>
                            {t.incomeOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Agree + Submit */}
                    <div style={{ paddingTop: 4 }}>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 24 }}>
                        <input
                          type="checkbox" required
                          checked={form.agree}
                          onChange={set("agree")}
                          style={{ marginTop: 2, accentColor: "#B8F53A", width: 16, height: 16, flexShrink: 0 }}
                        />
                        <span style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.55 }}>{t.f.agree}</span>
                      </label>
                      <button
                        type="submit"
                        style={{
                          width: "100%", padding: "15px 28px", borderRadius: 8,
                          fontSize: 15, fontWeight: 600, background: "#B8F53A",
                          color: "#0D2B1E", border: "none", cursor: "pointer",
                          transition: "background 0.15s", fontFamily: "Syne, sans-serif",
                          letterSpacing: -0.3,
                        }}
                        onMouseOver={e => (e.currentTarget.style.background = "#D4F87A")}
                        onMouseOut={e => (e.currentTarget.style.background = "#B8F53A")}
                      >
                        {t.submit}
                      </button>
                    </div>

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
