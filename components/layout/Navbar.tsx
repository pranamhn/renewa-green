"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, LogIn, LayoutDashboard } from "lucide-react";
import { useLang, useSetLang } from "@/context/LanguageContext";
import { isLoggedIn } from "@/lib/adminStore";

const dict = {
  id: {
    home: "Beranda",
    business: "Bisnis",
    partner: "Investors",
    vision: "Visi 2035",
    about: "Tentang",
    contact: "Kontak",
    bizLinks: [
      { href: "/business/credit-connect",  label: "Credit Connect",      desc: "Kredit EV untuk pengguna akhir" },
      { href: "/business/credit-trading",  label: "Credit Trading",       desc: "Carbon credit dari mobilitas EV" },
      { href: "/business/recycling",       label: "EV Battery Recycling", desc: "Daur ulang baterai EV" },
      { href: "/business/green-energy",    label: "Green Energy",         desc: "Solar, Geotermal & PLTSa" },
    ],
    partnerLinks: [
      { href: "/investor-partner",    label: "Overview",              desc: "Semua jalur kolaborasi Renewa" },
      { href: "/investor-partner/schedule-meeting",    label: "Jadwalkan Pertemuan",   desc: "Diskusi investasi dengan tim kami" },
      { href: "/investor-partner/register-product",    label: "Daftarkan Produk",      desc: "Bergabung sebagai mitra supplier" },
      { href: "/investor-partner/apply-partnership",   label: "Ajukan Kemitraan",      desc: "Deploy armada EV untuk bisnis Anda" },
    ],
  },
  en: {
    home: "Home",
    business: "Business",
    partner: "Investors",
    vision: "Vision 2035",
    about: "About",
    contact: "Contact",
    bizLinks: [
      { href: "/business/credit-connect",  label: "Credit Connect",      desc: "EV credit for end users" },
      { href: "/business/credit-trading",  label: "Credit Trading",       desc: "Carbon credit from EV mobility" },
      { href: "/business/recycling",       label: "EV Battery Recycling", desc: "Recycling used EV batteries" },
      { href: "/business/green-energy",    label: "Green Energy",         desc: "Solar, Geothermal & PLTSa" },
    ],
    partnerLinks: [
      { href: "/investor-partner",    label: "Overview",              desc: "All Renewa collaboration paths" },
      { href: "/investor-partner/schedule-meeting",    label: "Schedule a Meeting",    desc: "Investment discussion with our team" },
      { href: "/investor-partner/register-product",    label: "Register Product",      desc: "Join as a supplier partner" },
      { href: "/investor-partner/apply-partnership",   label: "Apply for Partnership", desc: "Deploy an EV fleet for your business" },
    ],
  },
};

const linkStyle = { fontSize: 15, fontWeight: 700, color: "#B8F53A", textDecoration: "none", transition: "color 0.15s" } as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const lang = useLang();
  const setLang = useSetLang();
  const t = dict[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setAdminLoggedIn(isLoggedIn());
  }, []);

  const mobileLinks = [
    { href: "/",                   label: t.home },
    ...t.bizLinks.map(l => ({ href: l.href, label: l.label })),
    ...t.partnerLinks.map(l => ({ href: l.href, label: l.label })),
    { href: "/vision-2035",        label: t.vision },
    { href: "/about",              label: t.about },
    { href: "/contact",            label: t.contact },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur"
        style={{
          background: scrolled ? "rgba(11,15,14,0.92)" : "transparent",
          borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 8, textDecoration: "none" }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: -0.5 }}>RENEWA</span>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: 24, color: "#B8F53A", letterSpacing: -0.5, textTransform: "uppercase" }}>ASIA</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden lg:flex">
            <Link href="/" style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}>
              {t.home}
            </Link>

            {/* Business dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={() => setBizOpen(true)} onMouseLeave={() => setBizOpen(false)}>
              <button
                style={{ display: "flex", alignItems: "center", gap: 4, ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}
              >
                {t.business} <ChevronDown size={13} style={{ transform: bizOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {bizOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 260, paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    {t.bizLinks.map((l) => (
                      <Link key={l.href} href={l.href} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "14px 20px", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500 }}>{l.label}</span>
                        <span style={{ fontSize: 13, color: "#7A9E85" }}>{l.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Investors dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={() => setPartnerOpen(true)} onMouseLeave={() => setPartnerOpen(false)}>
              <button
                style={{ display: "flex", alignItems: "center", gap: 4, ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}
              >
                {t.partner} <ChevronDown size={13} style={{ transform: partnerOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {partnerOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 260, paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    {t.partnerLinks.map((l) => (
                      <Link key={l.href} href={l.href} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "14px 20px", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500 }}>{l.label}</span>
                        <span style={{ fontSize: 13, color: "#7A9E85" }}>{l.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href="/vision-2035" style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}>
              {t.vision}
            </Link>
            <Link href="/about" style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}>
              {t.about}
            </Link>
            <Link href="/contact" style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}>
              {t.contact}
            </Link>
          </div>

          {/* Language toggle + admin login */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 8 }}>
            {/* Lang toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 3, height: 40 }}>
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "0 14px", height: 32, borderRadius: 7, fontSize: 11,
                    fontFamily: "DM Sans, sans-serif", fontWeight: 700,
                    letterSpacing: "1.5px", textTransform: "uppercase",
                    border: "none", cursor: "pointer", transition: "all 0.15s",
                    background: lang === l ? "#B8F53A" : "transparent",
                    color: lang === l ? "#0D2B1E" : "#7A9E85",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Login / Dashboard button */}
            <Link
              href={adminLoggedIn ? "/admin/dashboard" : "/admin/login"}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                height: 40, padding: "0 16px", borderRadius: 10,
                background: adminLoggedIn ? "rgba(184,245,58,0.12)" : "#B8F53A",
                border: adminLoggedIn ? "0.5px solid rgba(184,245,58,0.35)" : "none",
                color: adminLoggedIn ? "#B8F53A" : "#0D2B1E",
                textDecoration: "none", fontFamily: "Syne, sans-serif",
                fontWeight: 700, fontSize: 13, letterSpacing: "0.2px",
                transition: "background 0.15s, box-shadow 0.15s",
                boxShadow: adminLoggedIn ? "none" : "0 0 12px rgba(184,245,58,0.25)",
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = adminLoggedIn ? "rgba(184,245,58,0.2)" : "#D4F87A";
                e.currentTarget.style.boxShadow = adminLoggedIn ? "none" : "0 0 18px rgba(184,245,58,0.4)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = adminLoggedIn ? "rgba(184,245,58,0.12)" : "#B8F53A";
                e.currentTarget.style.boxShadow = adminLoggedIn ? "none" : "0 0 12px rgba(184,245,58,0.25)";
              }}
            >
              {adminLoggedIn
                ? <><LayoutDashboard size={14} /> Dashboard</>
                : <><LogIn size={14} /> {lang === "id" ? "Masuk" : "Login"}</>
              }
            </Link>
          </div>

          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "#7A9E85", cursor: "pointer" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "#0B0F0E", display: "flex", flexDirection: "column", padding: "88px 24px 40px", overflowY: "auto" }}>
          {mobileLinks.map((l) => (
            <Link key={l.href + l.label} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ padding: "18px 0", fontSize: 22, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
              {l.label}
            </Link>
          ))}
          {/* Language toggle in mobile */}
          <div style={{ marginTop: 32, display: "flex", gap: 8 }}>
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileOpen(false); }}
                style={{
                  padding: "10px 24px", borderRadius: 8, fontSize: 13,
                  fontFamily: "JetBrains Mono, monospace", fontWeight: 700,
                  letterSpacing: "1px", textTransform: "uppercase",
                  border: "0.5px solid rgba(255,255,255,0.12)", cursor: "pointer",
                  background: lang === l ? "#B8F53A" : "rgba(255,255,255,0.04)",
                  color: lang === l ? "#0D2B1E" : "#7A9E85",
                  transition: "all 0.15s",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
