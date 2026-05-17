"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const dict = {
  id: {
    h1: "Mari Berkolaborasi",
    desc: "Hubungi kami untuk investasi, kemitraan, kredit EV, atau pertanyaan lainnya.",
    inquiryLabel: "Kategori Inquiry",
    categories: ["Investor", "Mitra Pembiayaan", "Carbon Buyer", "End User EV", "Media", "Lainnya"],
    fields: { name: "Nama Lengkap *", email: "Email *", company: "Perusahaan", cat: "Kategori Inquiry *", msg: "Pesan *" },
    placeholders: { name: "Nama Kamu", company: "Nama PT / Individu", cat: "Pilih kategori...", msg: "Tuliskan pesan atau pertanyaan Anda..." },
    catOptions: [
      { val: "investor", label: "Investor" },
      { val: "mitra", label: "Mitra Pembiayaan" },
      { val: "carbon", label: "Carbon Buyer" },
      { val: "user", label: "End User EV" },
      { val: "media", label: "Media" },
      { val: "other", label: "Lainnya" },
    ],
    submit: "Kirim Pesan",
    successTitle: "Pesan Terkirim!",
    successDesc: "Tim kami akan segera menghubungi Anda.",
  },
  en: {
    h1: "Let's Collaborate",
    desc: "Contact us for investment, partnership, EV credit, or other enquiries.",
    inquiryLabel: "Inquiry Category",
    categories: ["Investor", "Financing Partner", "Carbon Buyer", "EV End User", "Media", "Other"],
    fields: { name: "Full Name *", email: "Email *", company: "Company", cat: "Inquiry Category *", msg: "Message *" },
    placeholders: { name: "Your Name", company: "PT / Individual Name", cat: "Select a category...", msg: "Write your message or enquiry..." },
    catOptions: [
      { val: "investor", label: "Investor" },
      { val: "mitra", label: "Financing Partner" },
      { val: "carbon", label: "Carbon Buyer" },
      { val: "user", label: "EV End User" },
      { val: "media", label: "Media" },
      { val: "other", label: "Other" },
    ],
    submit: "Send Message",
    successTitle: "Message Sent!",
    successDesc: "Our team will contact you shortly.",
  },
};

export default function Contact() {
  const lang = useLang();
  const t = dict[lang];
  const [form, setForm] = useState({ name: "", email: "", company: "", category: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 8, fontSize: 14,
    background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.12)",
    color: "#F2F5EF", outline: "none", fontFamily: "DM Sans, sans-serif",
    transition: "border-color 0.15s",
  };

  const contactInfo = [
    { icon: <Mail size={18} />, label: "Email", val: "info@renewa.asia" },
    { icon: <Phone size={18} />, label: "Phone", val: "+62 813-8887-0011" },
    { icon: <MapPin size={18} />, label: "Address", val: "Jakarta, Indonesia" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        <section style={{ padding: "80px 40px", minHeight: "calc(100vh - 68px)", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text="Contact" />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", letterSpacing: -2, lineHeight: 1.05, marginBottom: 16 }}>
              {t.h1}
            </h1>
            <p style={{ fontSize: 16, color: "#7A9E85", marginBottom: 56, fontWeight: 300 }}>{t.desc}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }}>
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {contactInfo.map((c) => (
                    <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(184,245,58,0.08)", border: "0.5px solid rgba(184,245,58,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#B8F53A" }}>
                        {c.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</p>
                        <p style={{ fontSize: 15, color: "#F2F5EF" }}>{c.val}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 48, padding: 24, background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                  <p style={{ fontSize: 13, color: "#7A9E85", marginBottom: 8 }}>{t.inquiryLabel}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {t.categories.map((cat) => (
                      <span key={cat} style={{ padding: "4px 12px", background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 100, fontSize: 12, color: "#B8F53A" }}>{cat}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "64px 32px", background: "#0D2B1E", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 12 }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 24, color: "#fff", marginBottom: 8 }}>{t.successTitle}</h3>
                    <p style={{ fontSize: 15, color: "#7A9E85" }}>{t.successDesc}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>{t.fields.name}</label>
                        <input required style={inputStyle} placeholder={t.placeholders.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>{t.fields.email}</label>
                        <input required type="email" style={inputStyle} placeholder="email@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>{t.fields.company}</label>
                      <input style={inputStyle} placeholder={t.placeholders.company} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>{t.fields.cat}</label>
                      <select required style={{ ...inputStyle, appearance: "none" as const }} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <option value="" disabled>{t.placeholders.cat}</option>
                        {t.catOptions.map((o) => (
                          <option key={o.val} value={o.val}>{o.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, color: "#7A9E85", display: "block", marginBottom: 8 }}>{t.fields.msg}</label>
                      <textarea required rows={5} style={{ ...inputStyle, resize: "vertical" as const }} placeholder={t.placeholders.msg} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 500, background: "#B8F53A", color: "#0D2B1E", border: "none", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "#D4F87A")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "#B8F53A")}>
                      <Send size={15} /> {t.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
