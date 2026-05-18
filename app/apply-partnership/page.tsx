"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    label: "Penerima EV — Ajukan Kemitraan",
    h1a: "Ajukan",
    h1b: "Kemitraan EV",
    desc: "Deploy armada motor EV ke operasional bisnis Anda dengan harga preferensial, kemudahan kredit, dan dukungan penuh dari Renewa. Setiap unit aktif menghasilkan carbon credit.",
    backLabel: "← Kembali ke Investor & Partner",
    leftTitle: "Keuntungan Mitra Penerima EV",
    benefits: [
      "Harga preferensial untuk pembelian armada skala besar",
      "Kemudahan akses kredit melalui 20+ mitra pembiayaan",
      "Setiap unit aktif menghasilkan carbon credit yang diperdagangkan",
      "Dukungan maintenance & after-sales langsung dari Renewa",
      "Pelaporan emisi otomatis untuk ESG & CSR",
    ],
    earningLabel: "Estimasi Nilai Carbon Credit",
    earnings: [
      { label: "Per km", val: "~Rp 45" },
      { label: "Per hari (50 km)", val: "~Rp 2.250" },
      { label: "Per unit / bulan", val: "~Rp 67.500" },
      { label: "10 unit / tahun", val: "~Rp 8.100.000" },
    ],
    earningNote: "Estimasi berdasarkan harga carbon credit IDXCarbon saat ini. Nilai dapat berubah.",
    formTitle: "Informasi Perusahaan & Armada",
    companyName: "Nama Perusahaan",
    picName: "Nama PIC (Penanggung Jawab)",
    email: "Email Bisnis",
    phone: "Nomor Telepon",
    npwp: "NPWP Perusahaan (opsional)",
    npwpPlaceholder: "XX.XXX.XXX.X-XXX.XXX",
    fleetType: "Jenis Armada / Bisnis",
    fleetTypes: [
      { val: "", label: "Pilih jenis armada…" },
      { val: "ojek_kurir", label: "Ojek Online & Kurir" },
      { val: "logistik", label: "Perusahaan Logistik" },
      { val: "korporat", label: "Armada Korporat" },
      { val: "pemerintah", label: "Instansi Pemerintah / BUMN" },
      { val: "dealer", label: "Dealer & Distributor EV" },
      { val: "kampus", label: "Kampus & Komunitas" },
      { val: "other", label: "Lainnya" },
    ],
    fleetSize: "Estimasi Jumlah Unit yang Dibutuhkan",
    fleetSizes: [
      { val: "", label: "Pilih estimasi jumlah…" },
      { val: "10_50", label: "10 – 50 unit" },
      { val: "50_200", label: "50 – 200 unit" },
      { val: "200_500", label: "200 – 500 unit" },
      { val: "500_1000", label: "500 – 1.000 unit" },
      { val: "gt1000", label: "> 1.000 unit" },
    ],
    province: "Provinsi Operasional Utama",
    operationalArea: "Area / Kota Operasional",
    operationalAreaPlaceholder: "Misalnya: Jakarta Selatan, Depok, Tangerang Selatan",
    timeline: "Rencana Mulai Pengadaan",
    timelines: [
      { val: "", label: "Pilih estimasi waktu…" },
      { val: "asap", label: "Sesegera mungkin" },
      { val: "1_3_months", label: "1 – 3 bulan ke depan" },
      { val: "3_6_months", label: "3 – 6 bulan ke depan" },
      { val: "gt6_months", label: "> 6 bulan ke depan" },
    ],
    notes: "Catatan Tambahan (opsional)",
    notesPlaceholder: "Sampaikan konteks bisnis, kebutuhan spesifik, atau pertanyaan untuk tim kami…",
    submit: "Ajukan Kemitraan Sekarang",
    submitting: "Mengirim…",
    successTitle: "Pengajuan Terkirim!",
    successDesc: "Tim kemitraan kami akan menghubungi Anda dalam 2–3 hari kerja untuk mendiskusikan skema kemitraan terbaik.",
    partnershipId: "ID Pengajuan Kemitraan",
    backHome: "Kembali ke Beranda",
  },
  en: {
    label: "EV Recipient — Apply for Partnership",
    h1a: "Apply for",
    h1b: "EV Partnership",
    desc: "Deploy an EV motorcycle fleet for your business with preferential pricing, easy credit access, and full support from Renewa. Every active unit generates carbon credits.",
    backLabel: "← Back to Investor & Partner",
    leftTitle: "Benefits of an EV Recipient Partnership",
    benefits: [
      "Preferential pricing for large-scale fleet purchases",
      "Easy credit access through a network of 20+ financing partners",
      "Every active unit generates tradeable carbon credits",
      "Dedicated maintenance & after-sales support from Renewa",
      "Automated emissions reporting for ESG & CSR purposes",
    ],
    earningLabel: "Estimated Carbon Credit Value",
    earnings: [
      { label: "Per km", val: "~Rp 45" },
      { label: "Per day (50 km)", val: "~Rp 2,250" },
      { label: "Per unit / month", val: "~Rp 67,500" },
      { label: "10 units / year", val: "~Rp 8,100,000" },
    ],
    earningNote: "Estimates based on current IDXCarbon carbon credit prices. Values subject to change.",
    formTitle: "Company & Fleet Information",
    companyName: "Company Name",
    picName: "PIC Name (Person In Charge)",
    email: "Business Email",
    phone: "Phone Number",
    npwp: "Company Tax ID / NPWP (optional)",
    npwpPlaceholder: "XX.XXX.XXX.X-XXX.XXX",
    fleetType: "Fleet / Business Type",
    fleetTypes: [
      { val: "", label: "Select fleet type…" },
      { val: "ojek_kurir", label: "Ride-hailing & Courier" },
      { val: "logistik", label: "Logistics Company" },
      { val: "korporat", label: "Corporate Fleet" },
      { val: "pemerintah", label: "Government / SOE" },
      { val: "dealer", label: "EV Dealer & Distributor" },
      { val: "kampus", label: "Campus & Community" },
      { val: "other", label: "Other" },
    ],
    fleetSize: "Estimated Number of Units Needed",
    fleetSizes: [
      { val: "", label: "Select estimated number…" },
      { val: "10_50", label: "10 – 50 units" },
      { val: "50_200", label: "50 – 200 units" },
      { val: "200_500", label: "200 – 500 units" },
      { val: "500_1000", label: "500 – 1,000 units" },
      { val: "gt1000", label: "> 1,000 units" },
    ],
    province: "Primary Operating Province",
    operationalArea: "Operating City / Area",
    operationalAreaPlaceholder: "E.g. South Jakarta, Depok, South Tangerang",
    timeline: "Planned Procurement Timeline",
    timelines: [
      { val: "", label: "Select estimated timeline…" },
      { val: "asap", label: "As soon as possible" },
      { val: "1_3_months", label: "1 – 3 months from now" },
      { val: "3_6_months", label: "3 – 6 months from now" },
      { val: "gt6_months", label: "> 6 months from now" },
    ],
    notes: "Additional Notes (optional)",
    notesPlaceholder: "Share your business context, specific needs, or questions for our team…",
    submit: "Apply for Partnership Now",
    submitting: "Sending…",
    successTitle: "Application Sent!",
    successDesc: "Our partnerships team will contact you within 2–3 business days to discuss the best partnership scheme.",
    partnershipId: "Partnership Application ID",
    backHome: "Back to Home",
  },
};

type FormState = {
  companyName: string;
  picName: string;
  email: string;
  phone: string;
  npwp: string;
  fleetType: string;
  fleetSize: string;
  province: string;
  operationalArea: string;
  timeline: string;
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

export default function ApplyPartnership() {
  const lang = useLang();
  const t = dict[lang];

  const [form, setForm] = useState<FormState>({
    companyName: "", picName: "", email: "", phone: "", npwp: "",
    fleetType: "", fleetSize: "", province: "", operationalArea: "",
    timeline: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [partnershipId, setPartnershipId] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setPartnershipId("KMT-" + Date.now().toString(36).toUpperCase().slice(-6));
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
            <Link href="/investor-partner" style={{ fontSize: 13, color: "#7A9E85", textDecoration: "none", display: "inline-block", marginBottom: 28 }}
              onMouseOver={e => (e.currentTarget.style.color = "#B8F53A")}
              onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
              {t.backLabel}
            </Link>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                {t.benefits.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: "#B8F53A", fontSize: 13, lineHeight: "22px", flexShrink: 0, fontWeight: 700 }}>✓</span>
                    <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>{b}</p>
                  </div>
                ))}
              </div>

              {/* Earnings card */}
              <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #B8F53A, rgba(184,245,58,0.15))" }} />
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>{t.earningLabel}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {t.earnings.map(e => (
                    <div key={e.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ fontSize: 13, color: "#7A9E85", fontWeight: 300 }}>{e.label}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 15, fontWeight: 600, color: "#B8F53A" }}>{e.val}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "rgba(122,158,133,0.6)", marginTop: 16, lineHeight: 1.5 }}>{t.earningNote}</p>
              </div>
            </div>

            {/* Right — Form / Success */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "40px 36px" }}>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(184,245,58,0.1)", border: "0.5px solid rgba(184,245,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 }}>✓</div>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: -0.5, marginBottom: 12 }}>{t.successTitle}</h2>
                  <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.7, maxWidth: 380, margin: "0 auto 28px", fontWeight: 300 }}>{t.successDesc}</p>
                  <div style={{ display: "inline-block", padding: "10px 24px", background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 8, marginBottom: 36 }}>
                    <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 4 }}>{t.partnershipId}</p>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, fontWeight: 700, color: "#B8F53A", letterSpacing: 2 }}>{partnershipId}</p>
                  </div>
                  <br />
                  <Link href="/" style={{ padding: "12px 28px", borderRadius: 8, background: "#B8F53A", color: "#0D2B1E", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.backHome}</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: -0.5, marginBottom: 28 }}>{t.formTitle}</h3>

                  {/* Company */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.companyName} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="companyName" required value={form.companyName} onChange={handleChange} style={inputStyle} placeholder="PT. Contoh" />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.picName} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="picName" required value={form.picName} onChange={handleChange} style={inputStyle} placeholder="Nama lengkap" />
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

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t.npwp}</label>
                    <input name="npwp" value={form.npwp} onChange={handleChange} style={inputStyle} placeholder={t.npwpPlaceholder} />
                  </div>

                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0 20px" }} />

                  {/* Fleet info */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.fleetType} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <select name="fleetType" required value={form.fleetType} onChange={handleChange} style={inputStyle}>
                        {t.fleetTypes.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.fleetSize} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <select name="fleetSize" required value={form.fleetSize} onChange={handleChange} style={inputStyle}>
                        {t.fleetSizes.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.province} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="province" required value={form.province} onChange={handleChange} style={inputStyle} placeholder="DKI Jakarta" />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.operationalArea}</label>
                      <input name="operationalArea" value={form.operationalArea} onChange={handleChange} style={inputStyle} placeholder={t.operationalAreaPlaceholder} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t.timeline} <span style={{ color: "#B8F53A" }}>*</span></label>
                    <select name="timeline" required value={form.timeline} onChange={handleChange} style={inputStyle}>
                      {t.timelines.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
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
