"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronRight, LogIn, LayoutDashboard } from "lucide-react";
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
    login: "Masuk",
    dashboard: "Dashboard",
    bizLinks: [
      { href: "/business/credit-connect",  label: "Credit Connect",      desc: "Kredit EV untuk pengguna akhir" },
      { href: "/business/credit-trading",  label: "Credit Trading",       desc: "Carbon credit dari mobilitas EV" },
      { href: "/business/recycling",       label: "EV Battery Recycling", desc: "Daur ulang baterai EV" },
      { href: "/business/green-energy",    label: "Green Energy",         desc: "Solar, Geotermal & PLTSa" },
    ],
    partnerLinks: [
      { href: "/investor-partner",                       label: "Overview",              desc: "Semua jalur kolaborasi Renewa" },
      { href: "/investor-partner/schedule-meeting",      label: "Jadwalkan Pertemuan",   desc: "Diskusi investasi dengan tim kami" },
      { href: "/investor-partner/register-product",      label: "Daftarkan Produk",      desc: "Bergabung sebagai mitra supplier" },
      { href: "/investor-partner/apply-partnership",     label: "Ajukan Kemitraan",      desc: "Deploy armada EV untuk bisnis Anda" },
    ],
  },
  en: {
    home: "Home",
    business: "Business",
    partner: "Investors",
    vision: "Vision 2035",
    about: "About",
    contact: "Contact",
    login: "Login",
    dashboard: "Dashboard",
    bizLinks: [
      { href: "/business/credit-connect",  label: "Credit Connect",      desc: "EV credit for end users" },
      { href: "/business/credit-trading",  label: "Credit Trading",       desc: "Carbon credit from EV mobility" },
      { href: "/business/recycling",       label: "EV Battery Recycling", desc: "Recycling used EV batteries" },
      { href: "/business/green-energy",    label: "Green Energy",         desc: "Solar, Geothermal & PLTSa" },
    ],
    partnerLinks: [
      { href: "/investor-partner",                       label: "Overview",              desc: "All Renewa collaboration paths" },
      { href: "/investor-partner/schedule-meeting",      label: "Schedule a Meeting",    desc: "Investment discussion with our team" },
      { href: "/investor-partner/register-product",      label: "Register Product",      desc: "Join as a supplier partner" },
      { href: "/investor-partner/apply-partnership",     label: "Apply for Partnership", desc: "Deploy an EV fleet for your business" },
    ],
  },
};

const linkStyle = { fontSize: 15, fontWeight: 700, color: "#B8F53A", textDecoration: "none", transition: "color 0.15s" } as const;

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [bizOpen, setBizOpen]         = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const lang    = useLang();
  const setLang = useSetLang();
  const t       = dict[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setAdminLoggedIn(isLoggedIn()); }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .nav-inner { padding: 0 20px !important; }
          .nav-logo-text { font-size: 20px !important; }
        }
        .mobile-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 0; text-decoration: none; color: #F2F5EF;
          font-size: 16px; font-family: "DM Sans", sans-serif; font-weight: 500;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
          transition: color 0.15s;
        }
        .mobile-link:hover { color: #B8F53A; }
        .mobile-sublink {
          display: flex; align-items: flex-start; padding: 11px 14px;
          text-decoration: none; border-bottom: 0.5px solid rgba(255,255,255,0.05);
          transition: background 0.15s;
        }
        .mobile-sublink:hover { background: rgba(255,255,255,0.04); }
        .mobile-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: min(340px, 100vw);
          background: #0B1A10; z-index: 60;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.5);
        }
        .mobile-drawer.open { transform: translateX(0); }
        .mobile-backdrop {
          position: fixed; inset: 0; z-index: 59;
          background: rgba(0,0,0,0.7);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .mobile-backdrop.open { opacity: 1; pointer-events: auto; }
      `}</style>

      {/* ── Main navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur"
        style={{
          background: scrolled ? "rgba(11,15,14,0.92)" : "transparent",
          borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="nav-inner" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 6, textDecoration: "none" }}>
            <span className="nav-logo-text" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: -0.5 }}>RENEWA</span>
            <span className="nav-logo-text" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: 24, color: "#B8F53A", letterSpacing: -0.5, textTransform: "uppercase" }}>ASIA</span>
          </Link>

          {/* Desktop nav links */}
          <div style={{ alignItems: "center", gap: 32 }} className="hidden lg:flex">
            <Link href="/" style={linkStyle}
              onMouseOver={e => (e.currentTarget.style.color = "#F2F5EF")}
              onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
              {t.home}
            </Link>

            <div style={{ position: "relative" }} onMouseEnter={() => setBizOpen(true)} onMouseLeave={() => setBizOpen(false)}>
              <button style={{ display: "flex", alignItems: "center", gap: 4, ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                onMouseOver={e => (e.currentTarget.style.color = "#F2F5EF")}
                onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
                {t.business} <ChevronDown size={13} style={{ transform: bizOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {bizOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 260, paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    {t.bizLinks.map(l => (
                      <Link key={l.href} href={l.href} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "14px 20px", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                        onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500 }}>{l.label}</span>
                        <span style={{ fontSize: 13, color: "#7A9E85" }}>{l.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: "relative" }} onMouseEnter={() => setPartnerOpen(true)} onMouseLeave={() => setPartnerOpen(false)}>
              <button style={{ display: "flex", alignItems: "center", gap: 4, ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                onMouseOver={e => (e.currentTarget.style.color = "#F2F5EF")}
                onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>
                {t.partner} <ChevronDown size={13} style={{ transform: partnerOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {partnerOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 260, paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    {t.partnerLinks.map(l => (
                      <Link key={l.href} href={l.href} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "14px 20px", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                        onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500 }}>{l.label}</span>
                        <span style={{ fontSize: 13, color: "#7A9E85" }}>{l.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/vision-2035" style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = "#F2F5EF")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>{t.vision}</Link>
            <Link href="/about"       style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = "#F2F5EF")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>{t.about}</Link>
            <Link href="/contact"     style={linkStyle} onMouseOver={e => (e.currentTarget.style.color = "#F2F5EF")} onMouseOut={e => (e.currentTarget.style.color = "#7A9E85")}>{t.contact}</Link>
          </div>

          {/* Desktop: lang toggle + login */}
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 3, height: 40 }}>
              {(["id", "en"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding: "0 14px", height: 32, borderRadius: 7, fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.15s", background: lang === l ? "#B8F53A" : "transparent", color: lang === l ? "#0D2B1E" : "#7A9E85" }}>
                  {l}
                </button>
              ))}
            </div>
            <Link href={adminLoggedIn ? "/admin/dashboard" : "/admin/login"}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px", borderRadius: 10, background: adminLoggedIn ? "rgba(184,245,58,0.12)" : "#B8F53A", border: adminLoggedIn ? "0.5px solid rgba(184,245,58,0.35)" : "none", color: adminLoggedIn ? "#B8F53A" : "#0D2B1E", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.2px", transition: "background 0.15s, box-shadow 0.15s", boxShadow: adminLoggedIn ? "none" : "0 0 12px rgba(184,245,58,0.25)" }}
              onMouseOver={e => { e.currentTarget.style.background = adminLoggedIn ? "rgba(184,245,58,0.2)" : "#D4F87A"; }}
              onMouseOut={e => { e.currentTarget.style.background = adminLoggedIn ? "rgba(184,245,58,0.12)" : "#B8F53A"; }}>
              {adminLoggedIn ? <><LayoutDashboard size={14} /> {t.dashboard}</> : <><LogIn size={14} /> {t.login}</>}
            </Link>
          </div>

          {/* Mobile: hamburger button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 9, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#F2F5EF", flexShrink: 0 }}>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer backdrop ── */}
      <div className={`mobile-backdrop${mobileOpen ? " open" : ""}`} onClick={close} />

      {/* ── Mobile drawer ── */}
      <div className={`mobile-drawer${mobileOpen ? " open" : ""}`}>

        {/* Drawer header */}
        <div style={{ height: 64, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "0.5px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <Link href="/" onClick={close} style={{ display: "flex", alignItems: "baseline", gap: 6, textDecoration: "none" }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>RENEWA</span>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: 18, color: "#B8F53A", textTransform: "uppercase" }}>ASIA</span>
          </Link>
          <button onClick={close} aria-label="Close menu"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "#F2F5EF" }}>
            <X size={18} />
          </button>
        </div>

        {/* Drawer nav */}
        <nav style={{ flex: 1, padding: "8px 20px 16px", overflowY: "auto" }}>

          {/* Home */}
          <Link href="/" onClick={close} className="mobile-link">
            {t.home}
            <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          </Link>

          {/* Bisnis section */}
          <p style={{ fontSize: 10, color: "#B8F53A", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            {t.business}
          </p>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 4 }}>
            {t.bizLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={close} className="mobile-sublink">
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500, fontFamily: "DM Sans, sans-serif" }}>{l.label}</p>
                  <p style={{ fontSize: 12, color: "#7A9E85", marginTop: 2, fontFamily: "DM Sans, sans-serif" }}>{l.desc}</p>
                </div>
                <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: 8, marginTop: 2 }} />
              </Link>
            ))}
          </div>

          {/* Investors section */}
          <p style={{ fontSize: 10, color: "#B8F53A", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            {t.partner}
          </p>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "0.5px solid rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 4 }}>
            {t.partnerLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={close} className="mobile-sublink">
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, color: "#F2F5EF", fontWeight: 500, fontFamily: "DM Sans, sans-serif" }}>{l.label}</p>
                  <p style={{ fontSize: 12, color: "#7A9E85", marginTop: 2, fontFamily: "DM Sans, sans-serif" }}>{l.desc}</p>
                </div>
                <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: 8, marginTop: 2 }} />
              </Link>
            ))}
          </div>

          {/* Other pages */}
          <div style={{ marginTop: 12 }}>
            {[
              { href: "/vision-2035", label: t.vision },
              { href: "/about",       label: t.about  },
              { href: "/contact",     label: t.contact },
            ].map(l => (
              <Link key={l.href} href={l.href} onClick={close} className="mobile-link">
                {l.label}
                <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div style={{ padding: "16px 20px 32px", borderTop: "0.5px solid rgba(255,255,255,0.07)", flexShrink: 0, gap: 12, display: "flex", flexDirection: "column" }}>
          {/* Login / Dashboard CTA */}
          <Link href={adminLoggedIn ? "/admin/dashboard" : "/admin/login"} onClick={close}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, height: 48, borderRadius: 10, background: adminLoggedIn ? "rgba(184,245,58,0.12)" : "#B8F53A", border: adminLoggedIn ? "0.5px solid rgba(184,245,58,0.3)" : "none", color: adminLoggedIn ? "#B8F53A" : "#0D2B1E", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "0.2px", boxShadow: adminLoggedIn ? "none" : "0 0 16px rgba(184,245,58,0.2)" }}>
            {adminLoggedIn
              ? <><LayoutDashboard size={16} /> {t.dashboard}</>
              : <><LogIn size={16} /> {t.login}</>}
          </Link>

          {/* Language toggle */}
          <div style={{ display: "flex", gap: 8 }}>
            {(["id", "en"] as const).map(l => (
              <button key={l} onClick={() => { setLang(l); close(); }}
                style={{ flex: 1, height: 40, borderRadius: 8, fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", border: "0.5px solid rgba(255,255,255,0.12)", cursor: "pointer", transition: "all 0.15s", background: lang === l ? "#B8F53A" : "rgba(255,255,255,0.04)", color: lang === l ? "#0D2B1E" : "#7A9E85" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
