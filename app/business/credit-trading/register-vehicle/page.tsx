"use client";
import { useState } from "react";
import { saveFormSubmission } from "@/lib/adminStore";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { CheckCircle, Check } from "lucide-react";

const vehicleBrands = [
  "Honda (EM1 e:)", "Yamaha (E-Vino)", "Gesits G1", "Selis Agats",
  "Volta 401", "Alva One", "United T1800", "Smoot Tempur",
  "NIU MQi+", "Lainnya / Other",
];

const dict = {
  id: {
    label: "Daftar Kendaraan",
    h1a: "Daftarkan Kendaraanmu,",
    h1b: "Hasilkan Carbon Credit",
    desc: "Setiap kilometer yang kamu tempuh dengan motor EV berkontribusi pada pengurangan emisi. Daftarkan kendaraanmu dan mulai hasilkan carbon credit yang bernilai.",
    badges: ["✓ Gratis Pendaftaran", "✓ Tanpa Minimum Km", "✓ Pembayaran Credit Bulanan", "✓ App Monitoring"],
    steps: [
      { n: "01", title: "Daftar Online",      desc: "Isi formulir pendaftaran kendaraan EV-mu di sini. Prosesnya cepat, kurang dari 5 menit." },
      { n: "02", title: "Pasang Telematics",   desc: "Tim kami mengirim perangkat telematics untuk dipasang di kendaraanmu. Gratis biaya pasang." },
      { n: "03", title: "Berkendara & Catat",  desc: "Setiap kilometer dicatat secara otomatis. Lihat progres di aplikasi Renewa." },
      { n: "04", title: "Terima Credit",       desc: "Carbon credit dihitung dan dikreditkan ke akunmu setiap bulan. Bisa dijual atau didonasikan." },
    ],
    earnTitle: "Berapa yang Bisa Kamu Hasilkan?",
    earnItems: [
      { label: "Per km berkendara",        val: "~0.12 kg CO₂" },
      { label: "Rata-rata 30 km/hari",     val: "~3.6 kg/hari" },
      { label: "Estimasi bulanan",          val: "~108 kg CO₂" },
      { label: "Nilai credit / tahun",     val: "Rp 150–400rb" },
    ],
    earnNote: "* Estimasi berdasarkan motor BBM setara 110cc, intensitas grid PLN 2024.",
    formTitle: "Formulir Pendaftaran",
    sec1: "01 — Data Diri",
    sec2: "02 — Data Kendaraan",
    f: {
      name:    "Nama Lengkap *",     namePh:   "Nama sesuai KTP",
      email:   "Email *",            emailPh:  "email@domain.com",
      phone:   "No. HP / WA *",      phonePh:  "08xx-xxxx-xxxx",
      brand:   "Merek Motor EV *",
      model:   "Tipe / Seri *",      modelPh:  "Contoh: EM1 e: / E-Vino",
      plate:   "Nomor Polisi *",     platePh:  "Contoh: B 1234 XYZ",
      province:"Provinsi *",
      city:    "Kota / Kabupaten *", cityPh:   "Nama kota",
      source:  "Dari mana tahu Renewa?",
    },
    sourceOpts: [
      { v: "sosmed",     l: "Media Sosial (IG/TikTok/X)" },
      { v: "teman",      l: "Rekomendasi Teman" },
      { v: "kredit",     l: "Dari Credit Connect" },
      { v: "dealer",     l: "Dealer Motor EV" },
      { v: "berita",     l: "Berita / Media Online" },
      { v: "lainnya",    l: "Lainnya" },
    ],
    submit: "Daftarkan Kendaraan →",
    okTitle: "Pendaftaran Berhasil!",
    okDesc: "Tim kami akan menghubungi Anda dalam 1–2 hari kerja untuk penjadwalan pemasangan perangkat telematics.",
    okRef: "ID Pendaftaran",
    okBack: "Kembali ke Beranda",
    okCredit: "Lihat Cara Kerja →",
  },
  en: {
    label: "Register Vehicle",
    h1a: "Register Your Vehicle,",
    h1b: "Earn Carbon Credits",
    desc: "Every kilometre you ride on an EV motorcycle contributes to emission reduction. Register your vehicle and start earning valuable carbon credits.",
    badges: ["✓ Free Registration", "✓ No Minimum Km", "✓ Monthly Credit Payout", "✓ Monitoring App"],
    steps: [
      { n: "01", title: "Register Online",    desc: "Fill in the vehicle registration form here. The process takes less than 5 minutes." },
      { n: "02", title: "Install Telematics",  desc: "Our team sends a telematics device to be installed on your vehicle. Free installation." },
      { n: "03", title: "Ride & Record",       desc: "Every kilometre is recorded automatically. Track your progress in the Renewa app." },
      { n: "04", title: "Receive Credits",     desc: "Carbon credits are calculated and credited to your account monthly. Sell or donate them." },
    ],
    earnTitle: "How Much Can You Earn?",
    earnItems: [
      { label: "Per km ridden",            val: "~0.12 kg CO₂" },
      { label: "Avg. 30 km/day",           val: "~3.6 kg/day" },
      { label: "Monthly estimate",          val: "~108 kg CO₂" },
      { label: "Credit value / year",      val: "IDR 150–400K" },
    ],
    earnNote: "* Estimate based on equivalent 110cc petrol motorcycle, PLN grid intensity 2024.",
    formTitle: "Registration Form",
    sec1: "01 — Personal Details",
    sec2: "02 — Vehicle Details",
    f: {
      name:    "Full Name *",        namePh:   "Name as per ID",
      email:   "Email *",            emailPh:  "email@domain.com",
      phone:   "Mobile / WA *",      phonePh:  "08xx-xxxx-xxxx",
      brand:   "EV Motorcycle Brand *",
      model:   "Type / Series *",    modelPh:  "E.g. EM1 e: / E-Vino",
      plate:   "License Plate *",    platePh:  "E.g. B 1234 XYZ",
      province:"Province *",
      city:    "City / Regency *",   cityPh:   "City name",
      source:  "How did you hear about Renewa?",
    },
    sourceOpts: [
      { v: "sosmed",  l: "Social Media (IG/TikTok/X)" },
      { v: "teman",   l: "Friend Recommendation" },
      { v: "kredit",  l: "From Credit Connect" },
      { v: "dealer",  l: "EV Motorcycle Dealer" },
      { v: "berita",  l: "News / Online Media" },
      { v: "lainnya", l: "Other" },
    ],
    submit: "Register Vehicle →",
    okTitle: "Registration Successful!",
    okDesc: "Our team will contact you within 1–2 business days to schedule telematics device installation.",
    okRef: "Registration ID",
    okBack: "Back to Home",
    okCredit: "See How It Works →",
  },
};

const provinces = [
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten",
  "DI Yogyakarta", "Bali", "Sumatera Utara", "Sumatera Selatan", "Sumatera Barat",
  "Riau", "Lampung", "Kalimantan Timur", "Kalimantan Selatan", "Sulawesi Selatan",
  "Sulawesi Utara", "Nusa Tenggara Barat", "Maluku", "Papua", "Lainnya / Other",
];

type FormState = {
  name: string; email: string; phone: string;
  brand: string; model: string; plate: string;
  province: string; city: string; source: string;
};

export default function RegisterVehicle() {
  const lang = useLang();
  const t = dict[lang];
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "",
    brand: "", model: "", plate: "",
    province: "", city: "", source: "",
  });
  const [sent, setSent] = useState(false);
  const [regId, setRegId] = useState("");

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = "EV-" + Date.now().toString(36).toUpperCase().slice(-6);
    setRegId(id);
    saveFormSubmission("register-vehicle", id, form as Record<string, string>);
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
            .rv-hero { padding: 48px 20px 36px !important; }
            .rv-steps { padding: 32px 20px !important; }
            .rv-steps-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
            .rv-body { padding: 48px 20px 72px !important; }
            .rv-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
            .rv-sticky { position: static !important; }
            .rv-form-head { padding: 24px 20px 0 !important; }
            .rv-form-pad { padding: 24px 20px !important; }
            .rv-inner-row { grid-template-columns: 1fr !important; }
          }
        `}</style>

        {/* ── Hero ── */}
        <section className="rv-hero" style={{ padding: "64px 40px 52px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(34px, 5vw, 56px)", color: "#fff", letterSpacing: -2, lineHeight: 1.08, marginBottom: 20 }}>
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

        {/* ── Steps ── */}
        <section className="rv-steps" style={{ padding: "48px 40px", background: "#000" }}>
          <div className="rv-steps-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {t.steps.map((s, i) => (
              <div key={s.n} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24, position: "relative", overflow: "hidden" }}>
                {i === 0 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#B8F53A" }} />}
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: i === 0 ? "#B8F53A" : "rgba(184,245,58,0.35)", letterSpacing: "2px", marginBottom: 14 }}>{s.n}</p>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 8 }}>{s.title}</p>
                <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.55, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Earn estimate + Form ── */}
        <section className="rv-body" style={{ padding: "64px 40px 96px", background: "#0B0F0E" }}>
          <div className="rv-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "flex-start" }}>

            {/* Left — Earn estimate */}
            <div className="rv-sticky" style={{ position: "sticky", top: 96 }}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: -0.5, marginBottom: 24, lineHeight: 1.2 }}>{t.earnTitle}</h3>
              <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "28px 28px", marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {t.earnItems.map((item, i) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < t.earnItems.length - 1 ? "0.5px solid rgba(255,255,255,0.06)" : "none" }}>
                      <p style={{ fontSize: 13, color: "#7A9E85", fontWeight: 300 }}>{item.label}</p>
                      <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 600, color: "#B8F53A" }}>{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", lineHeight: 1.6, fontFamily: "JetBrains Mono, monospace" }}>{t.earnNote}</p>

              <div style={{ marginTop: 28, padding: "20px 24px", background: "rgba(184,245,58,0.04)", border: "0.5px solid rgba(184,245,58,0.12)", borderRadius: 10 }}>
                <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.6 }}>
                  {lang === "id"
                    ? "Carbon credit yang kamu hasilkan bisa dijual ke korporasi melalui platform trading Renewa atau didonasikan untuk program penghijauan."
                    : "Carbon credits you earn can be sold to corporations through Renewa's trading platform or donated to reforestation programs."}
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>
              {sent ? (
                <div style={{ padding: "64px 48px", textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", margin: "0 auto 28px", background: "rgba(184,245,58,0.1)", border: "0.5px solid rgba(184,245,58,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle size={32} color="#B8F53A" strokeWidth={1.5} />
                  </div>
                  <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: "#fff", marginBottom: 12 }}>{t.okTitle}</h2>
                  <p style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.65, maxWidth: 380, margin: "0 auto 32px" }}>{t.okDesc}</p>
                  <div style={{ display: "inline-block", padding: "12px 28px", borderRadius: 10, background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.25)", marginBottom: 36 }}>
                    <p style={{ fontSize: 10, color: "#7A9E85", fontFamily: "JetBrains Mono, monospace", letterSpacing: "2px", marginBottom: 4 }}>{t.okRef}</p>
                    <p style={{ fontSize: 22, color: "#B8F53A", fontFamily: "JetBrains Mono, monospace", fontWeight: 700 }}>{regId}</p>
                  </div>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/" style={{ padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "#B8F53A", color: "#0D2B1E", textDecoration: "none", fontFamily: "Syne, sans-serif" }}>{t.okBack}</Link>
                    <Link href="/business/credit-trading" style={{ padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.12)", color: "#fff", textDecoration: "none" }}>{t.okCredit}</Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="rv-form-head" style={{ padding: "28px 40px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{t.formTitle}</p>
                  </div>
                  <div className="rv-form-pad" style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 28 }}>

                    {/* Section 1 */}
                    <div>
                      <p style={secHead}>{t.sec1}</p>
                      <div className="rv-inner-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.name}</label>
                          <input required style={inp} placeholder={t.f.namePh} value={form.name} onChange={set("name")} />
                        </div>
                        <div>
                          <label style={lbl}>{t.f.phone}</label>
                          <input required style={inp} placeholder={t.f.phonePh} value={form.phone} onChange={set("phone")} />
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>{t.f.email}</label>
                        <input required type="email" style={inp} placeholder={t.f.emailPh} value={form.email} onChange={set("email")} />
                      </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                      <p style={secHead}>{t.sec2}</p>
                      <div className="rv-inner-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <div>
                          <label style={lbl}>{t.f.brand}</label>
                          <select required style={sel} value={form.brand} onChange={set("brand")}>
                            <option value="" disabled>{lang === "id" ? "Pilih merek..." : "Select brand..."}</option>
                            {vehicleBrands.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={lbl}>{t.f.model}</label>
                          <input required style={inp} placeholder={t.f.modelPh} value={form.model} onChange={set("model")} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={lbl}>{t.f.plate}</label>
                        <input required style={inp} placeholder={t.f.platePh} value={form.plate} onChange={set("plate")} />
                      </div>
                      <div className="rv-inner-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
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
                      <div>
                        <label style={lbl}>{t.f.source}</label>
                        <select style={sel} value={form.source} onChange={set("source")}>
                          <option value="">{lang === "id" ? "Pilih (opsional)..." : "Select (optional)..."}</option>
                          {t.sourceOpts.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                        </select>
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
