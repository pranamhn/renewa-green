"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    label: "Supplier Partner — Daftarkan Produk",
    h1a: "Daftarkan",
    h1b: "Produk Anda",
    desc: "Jadilah bagian dari rantai pasokan ekosistem EV & energi hijau terbesar di Indonesia. Kami mencari mitra pemasok terpercaya di semua kategori produk.",
    backLabel: "← Kembali ke Investor & Partner",
    leftTitle: "Proses Pendaftaran",
    steps: [
      { title: "Isi Formulir", desc: "Lengkapi data perusahaan dan informasi produk yang akan Anda tawarkan." },
      { title: "Verifikasi Tim", desc: "Tim procurement kami akan meninjau dan menghubungi Anda dalam 3–5 hari kerja." },
      { title: "Kualifikasi Produk", desc: "Produk Anda melalui proses kualifikasi teknis dan komersial bersama tim Renewa." },
      { title: "Kontrak & Onboarding", desc: "Penandatanganan MoU dan integrasi ke sistem pengadaan Renewa." },
    ],
    benefitLabel: "Keuntungan Menjadi Mitra Supplier",
    benefits: [
      "Volume pembelian terjamin melalui kontrak jangka panjang",
      "Akses jaringan distribusi 20+ kota di Indonesia",
      "Co-branding dan visibility di platform Renewa",
      "Integrasi logistik & after-sales Renewa",
      "Prioritas pengembangan produk bersama",
    ],
    formTitle: "Informasi Produk & Perusahaan",
    picName: "Nama PIC / Perwakilan",
    company: "Nama Perusahaan",
    email: "Email Bisnis",
    phone: "Nomor Telepon",
    website: "Website Perusahaan (opsional)",
    productCategory: "Kategori Produk",
    productCategories: [
      { val: "", label: "Pilih kategori…" },
      { val: "ev_motor", label: "Motor EV" },
      { val: "battery", label: "Baterai EV" },
      { val: "charging", label: "Infrastruktur Charging / SPKLU" },
      { val: "solar", label: "Panel Surya & Komponen PLTS" },
      { val: "recycling", label: "Teknologi Recycling Baterai" },
      { val: "spare_parts", label: "Spare Parts & MRO" },
      { val: "other", label: "Lainnya" },
    ],
    productName: "Nama / Lini Produk",
    productDesc: "Deskripsi Produk",
    productDescPlaceholder: "Jelaskan spesifikasi, keunggulan, dan differensiasi produk Anda secara singkat…",
    annualCapacity: "Kapasitas Produksi / Stok Tahunan",
    annualCapacities: [
      { val: "", label: "Pilih estimasi kapasitas…" },
      { val: "lt100", label: "< 100 unit/tahun" },
      { val: "100_500", label: "100 – 500 unit/tahun" },
      { val: "500_2000", label: "500 – 2.000 unit/tahun" },
      { val: "2000_10000", label: "2.000 – 10.000 unit/tahun" },
      { val: "gt10000", label: "> 10.000 unit/tahun" },
      { val: "bulk", label: "Bulk / per ton / per kWh" },
    ],
    province: "Provinsi / Lokasi Gudang Utama",
    certifications: "Sertifikasi Produk (opsional)",
    certificationsPlaceholder: "Misalnya: SNI, ISO 9001, CE, TKDN, dll.",
    notes: "Catatan Tambahan (opsional)",
    notesPlaceholder: "Informasi lain yang relevan untuk tim procurement kami…",
    submit: "Daftarkan Produk Sekarang",
    submitting: "Mengirim…",
    successTitle: "Pendaftaran Berhasil!",
    successDesc: "Tim procurement kami akan meninjau informasi produk Anda dan menghubungi dalam 3–5 hari kerja.",
    regId: "ID Pendaftaran Supplier",
    backHome: "Kembali ke Beranda",
  },
  en: {
    label: "Supplier Partner — Register Product",
    h1a: "Register",
    h1b: "Your Product",
    desc: "Become part of the supply chain for Indonesia's largest EV & green energy ecosystem. We're looking for trusted supply partners across all product categories.",
    backLabel: "← Back to Investor & Partner",
    leftTitle: "Registration Process",
    steps: [
      { title: "Fill the Form", desc: "Complete your company details and information about the products you want to offer." },
      { title: "Team Verification", desc: "Our procurement team will review and contact you within 3–5 business days." },
      { title: "Product Qualification", desc: "Your product goes through a technical and commercial qualification process with the Renewa team." },
      { title: "Contract & Onboarding", desc: "MoU signing and integration into the Renewa procurement system." },
    ],
    benefitLabel: "Benefits of Becoming a Supplier Partner",
    benefits: [
      "Guaranteed purchase volumes via long-term contracts",
      "Access to a distribution network spanning 20+ cities",
      "Co-branding and visibility on the Renewa platform",
      "Integration into Renewa's logistics & after-sales system",
      "Priority joint product development opportunities",
    ],
    formTitle: "Product & Company Information",
    picName: "PIC / Representative Name",
    company: "Company Name",
    email: "Business Email",
    phone: "Phone Number",
    website: "Company Website (optional)",
    productCategory: "Product Category",
    productCategories: [
      { val: "", label: "Select category…" },
      { val: "ev_motor", label: "EV Motorcycles" },
      { val: "battery", label: "EV Batteries" },
      { val: "charging", label: "Charging Infrastructure / EVSE" },
      { val: "solar", label: "Solar Panels & Components" },
      { val: "recycling", label: "Battery Recycling Technology" },
      { val: "spare_parts", label: "Spare Parts & MRO" },
      { val: "other", label: "Other" },
    ],
    productName: "Product Name / Line",
    productDesc: "Product Description",
    productDescPlaceholder: "Briefly describe the specifications, advantages, and differentiators of your product…",
    annualCapacity: "Annual Production / Stock Capacity",
    annualCapacities: [
      { val: "", label: "Select estimated capacity…" },
      { val: "lt100", label: "< 100 units/year" },
      { val: "100_500", label: "100 – 500 units/year" },
      { val: "500_2000", label: "500 – 2,000 units/year" },
      { val: "2000_10000", label: "2,000 – 10,000 units/year" },
      { val: "gt10000", label: "> 10,000 units/year" },
      { val: "bulk", label: "Bulk / per ton / per kWh" },
    ],
    province: "Province / Main Warehouse Location",
    certifications: "Product Certifications (optional)",
    certificationsPlaceholder: "E.g. SNI, ISO 9001, CE, TKDN, etc.",
    notes: "Additional Notes (optional)",
    notesPlaceholder: "Any other information relevant to our procurement team…",
    submit: "Register Product Now",
    submitting: "Sending…",
    successTitle: "Registration Successful!",
    successDesc: "Our procurement team will review your product information and get in touch within 3–5 business days.",
    regId: "Supplier Registration ID",
    backHome: "Back to Home",
  },
};

type FormState = {
  picName: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  productCategory: string;
  productName: string;
  productDesc: string;
  annualCapacity: string;
  province: string;
  certifications: string;
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

export default function RegisterProduct() {
  const lang = useLang();
  const t = dict[lang];

  const [form, setForm] = useState<FormState>({
    picName: "", company: "", email: "", phone: "", website: "",
    productCategory: "", productName: "", productDesc: "",
    annualCapacity: "", province: "", certifications: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setRegId("SPL-" + Date.now().toString(36).toUpperCase().slice(-6));
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
              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 44 }}>
                {t.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: 24 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#B8F53A", fontWeight: 700 }}>0{i + 1}</span>
                      </div>
                      {i < t.steps.length - 1 && (
                        <div style={{ width: 1, flex: 1, minHeight: 20, background: "rgba(184,245,58,0.12)", marginTop: 4 }} />
                      )}
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: "#F2F5EF", marginBottom: 4 }}>{step.title}</p>
                      <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 20px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #B8F53A, rgba(184,245,58,0.15))" }} />
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "rgba(184,245,58,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>{t.benefitLabel}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {t.benefits.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: "#B8F53A", fontSize: 12, lineHeight: "20px", flexShrink: 0, fontWeight: 700 }}>✓</span>
                      <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.55, fontWeight: 300 }}>{b}</p>
                    </div>
                  ))}
                </div>
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
                    <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 4 }}>{t.regId}</p>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, fontWeight: 700, color: "#B8F53A", letterSpacing: 2 }}>{regId}</p>
                  </div>
                  <br />
                  <Link href="/" style={{ padding: "12px 28px", borderRadius: 8, background: "#B8F53A", color: "#0D2B1E", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>{t.backHome}</Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: -0.5, marginBottom: 28 }}>{t.formTitle}</h3>

                  {/* Company info */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.picName} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="picName" required value={form.picName} onChange={handleChange} style={inputStyle} placeholder="Nama lengkap" />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.company} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="company" required value={form.company} onChange={handleChange} style={inputStyle} placeholder="PT. Contoh" />
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
                    <label style={labelStyle}>{t.website}</label>
                    <input name="website" value={form.website} onChange={handleChange} style={inputStyle} placeholder="https://..." />
                  </div>

                  {/* Product info */}
                  <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0 20px" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.productCategory} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <select name="productCategory" required value={form.productCategory} onChange={handleChange} style={inputStyle}>
                        {t.productCategories.map(o => <option key={o.val} value={o.val} disabled={o.val === ""}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.productName} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="productName" required value={form.productName} onChange={handleChange} style={inputStyle} placeholder="Nama produk" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t.productDesc} <span style={{ color: "#B8F53A" }}>*</span></label>
                    <textarea name="productDesc" required value={form.productDesc} onChange={handleChange} rows={4}
                      style={{ ...inputStyle, resize: "vertical" }} placeholder={t.productDescPlaceholder} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>{t.annualCapacity}</label>
                      <select name="annualCapacity" value={form.annualCapacity} onChange={handleChange} style={inputStyle}>
                        {t.annualCapacities.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.province} <span style={{ color: "#B8F53A" }}>*</span></label>
                      <input name="province" required value={form.province} onChange={handleChange} style={inputStyle} placeholder="DKI Jakarta" />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>{t.certifications}</label>
                    <input name="certifications" value={form.certifications} onChange={handleChange} style={inputStyle} placeholder={t.certificationsPlaceholder} />
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={labelStyle}>{t.notes}</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
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
