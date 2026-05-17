import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: "Business",
      links: [
        { href: "/business/credit-connect", label: "Credit Connect" },
        { href: "/business/credit-trading", label: "Credit Trading" },
        { href: "/business/recycling", label: "Battery Recycling" },
        { href: "/business/green-energy", label: "Green Energy" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Renewa" },
        { href: "/vision-2030", label: "Vision 2035" },
        { href: "/news", label: "News & Insights" },
        { href: "/careers", label: "Careers" },
      ],
    },
    {
      title: "Connect",
      links: [
        { href: "/partners", label: "Partners & Investors" },
        { href: "/contact", label: "Contact Us" },
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  ];

  return (
    <footer style={{ background: "#0B0F0E", borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 64, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>RENEWA</span>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 800, fontSize: 20, color: "#7A9E85", letterSpacing: -0.15, textTransform: "uppercase" }}>ASIA</span>
            </div>
            <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.7, maxWidth: 280, fontWeight: 300 }}>
              Ekosistem energi hijau terintegrasi Indonesia. Menuju 100.000 unit motor EV pada 2035.
            </p>
            <div style={{ marginTop: 24, padding: "12px 16px", background: "rgba(184,245,58,0.06)", border: "0.5px solid rgba(184,245,58,0.2)", borderRadius: 8 }}>
              <p style={{ fontSize: 11, color: "#B8F53A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 4 }}>Vision 2035</p>
              <p style={{ fontSize: 14, color: "#F2F5EF", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>100.000 Unit Motor EV</p>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: 11, color: "#7A9E85", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
                {col.title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: 14, color: "#7A9E85", textDecoration: "none" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            © {year} PT Renewa Green Energy. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            PT Renewa Green Energy is a company registered in Jakarta, Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
