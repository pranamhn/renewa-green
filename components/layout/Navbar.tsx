"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLang, useSetLang } from "@/context/LanguageContext";

const businessLinks = [
  { href: "/business/credit-connect", label: "Credit Connect", desc: "Kredit EV untuk end user" },
  { href: "/business/credit-trading", label: "Credit Trading", desc: "Carbon credit dari EV mobility" },
  { href: "/business/recycling", label: "EV Battery Recycling", desc: "Daur ulang baterai EV" },
  { href: "/business/green-energy", label: "Green Energy", desc: "Solar, Geothermal & PLTSa" },
];

const navLinks = [
  { href: "/vision-2035", label: "Vision 2035" },
  { href: "/#impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkStyle = { fontSize: 15, fontWeight: 700, color: "#7A9E85", textDecoration: "none", transition: "color 0.15s" } as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bizOpen, setBizOpen] = useState(false);
  const lang = useLang();
  const setLang = useSetLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: 24, color: "#7A9E85", letterSpacing: -0.5, textTransform: "uppercase" }}>ASIA</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden lg:flex">
            {/* Beranda */}
            <Link href="/" style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}>
              Beranda
            </Link>

            {/* Business dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={() => setBizOpen(true)} onMouseLeave={() => setBizOpen(false)}>
              <button
                style={{ display: "flex", alignItems: "center", gap: 4, ...linkStyle, background: "none", border: "none", cursor: "pointer" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}
              >
                Business <ChevronDown size={13} style={{ transform: bizOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {bizOpen && (
                <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 260, paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: "#0D2B1E", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    {businessLinks.map((l) => (
                      <Link key={l.href} href={l.href} style={{ display: "flex", flexDirection: "column", gap: 2, padding: "14px 20px", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)", transition: "background 0.15s" }}
                        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}>
                        <span style={{ fontSize: 13, color: "#F2F5EF", fontWeight: 500 }}>{l.label}</span>
                        <span style={{ fontSize: 11, color: "#7A9E85" }}>{l.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other links */}
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} style={linkStyle}
                onMouseOver={(e) => (e.currentTarget.style.color = "#F2F5EF")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#7A9E85")}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Language toggle */}
          <div className="hidden lg:flex" style={{ alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 3 }}>
              {(["id", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "4px 12px", borderRadius: 6, fontSize: 11,
                    fontFamily: "JetBrains Mono, monospace", fontWeight: 600,
                    letterSpacing: "1px", textTransform: "uppercase",
                    border: "none", cursor: "pointer", transition: "all 0.15s",
                    background: lang === l ? "#B8F53A" : "transparent",
                    color: lang === l ? "#0D2B1E" : "#7A9E85",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", color: "#7A9E85", cursor: "pointer" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "#0B0F0E", display: "flex", flexDirection: "column", padding: "88px 24px 40px" }}>
          {[{ href: "/", label: "Beranda" }, ...businessLinks.map(l => ({ href: l.href, label: l.label })), { href: "/vision-2035", label: "Vision 2035" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ padding: "18px 0", fontSize: 22, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
