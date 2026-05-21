"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

const sections = {
  id: [
    {
      title: "1. Penerimaan Syarat",
      body: [
        "Dengan mengakses atau menggunakan website renewa.asia, Anda menyatakan telah membaca, memahami, dan menyetujui Syarat Layanan ini. Jika Anda tidak menyetujui syarat-syarat ini, harap hentikan penggunaan website.",
        "Syarat ini berlaku bagi semua pengunjung, pengguna, dan pihak lain yang mengakses layanan kami.",
      ],
    },
    {
      title: "2. Tentang Layanan",
      body: [
        "PT Renewa Green Energy ('Renewa') menyediakan website informasi mengenai ekosistem bisnis energi hijau kami, yang mencakup: platform kredit EV (Credit Connect), perdagangan karbon kredit (Credit Trading), daur ulang baterai EV, dan energi terbarukan.",
        "Konten di website ini bersifat informatif dan tidak merupakan penawaran efek, saran investasi, atau ajakan untuk melakukan transaksi keuangan dalam bentuk apapun, kecuali dinyatakan secara eksplisit.",
      ],
    },
    {
      title: "3. Penggunaan yang Diizinkan",
      body: [
        "Anda diperbolehkan menggunakan website ini untuk keperluan pribadi, informasional, dan non-komersial.",
        "Anda tidak diperbolehkan: (a) mereproduksi, mendistribusikan, atau mengeksploitasi konten tanpa izin tertulis; (b) melakukan scraping, crawling, atau pengumpulan data otomatis; (c) mengganggu keamanan atau integritas sistem kami; (d) menggunakan website untuk tujuan ilegal atau yang melanggar hak pihak lain.",
      ],
    },
    {
      title: "4. Kekayaan Intelektual",
      body: [
        "Seluruh konten di website ini — termasuk teks, desain, logo, grafis, dan materi lainnya — adalah milik PT Renewa Green Energy dan dilindungi oleh hukum kekayaan intelektual Indonesia.",
        "Nama 'Renewa', 'Renewa Green', dan 'Renewa Asia' adalah merek dagang terdaftar atau dalam proses pendaftaran.",
        "Penggunaan konten untuk tujuan edukasi atau non-komersial dengan atribusi yang jelas diperbolehkan dengan persetujuan tertulis sebelumnya.",
      ],
    },
    {
      title: "5. Penafian & Batasan Tanggung Jawab",
      body: [
        "Informasi di website ini disediakan 'sebagaimana adanya'. Renewa tidak memberikan jaminan atas keakuratan, kelengkapan, atau kesesuaian informasi untuk tujuan tertentu.",
        "Proyeksi bisnis, estimasi GMV, dan target yang disebutkan di website merupakan perkiraan berbasis asumsi internal dan bukan merupakan jaminan hasil di masa depan.",
        "Renewa tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan website ini.",
      ],
    },
    {
      title: "6. Tautan Pihak Ketiga",
      body: [
        "Website kami mungkin memuat tautan ke website pihak ketiga. Tautan tersebut disediakan untuk kenyamanan Anda dan tidak merupakan endorsement atas konten atau praktik privasi situs tersebut.",
        "Renewa tidak bertanggung jawab atas konten atau layanan yang tersedia di website pihak ketiga.",
      ],
    },
    {
      title: "7. Perubahan Layanan",
      body: [
        "Renewa berhak untuk mengubah, menangguhkan, atau menghentikan bagian manapun dari layanan atau website kapan saja tanpa pemberitahuan sebelumnya.",
        "Kami juga berhak memperbarui Syarat Layanan ini sewaktu-waktu. Versi terbaru akan selalu tersedia di halaman ini.",
      ],
    },
    {
      title: "8. Hukum yang Berlaku",
      body: [
        "Syarat Layanan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.",
        "Setiap sengketa yang timbul dari atau sehubungan dengan Syarat ini akan diselesaikan melalui musyawarah terlebih dahulu, dan jika tidak tercapai kesepakatan, melalui Pengadilan Negeri Jakarta Selatan.",
      ],
    },
    {
      title: "9. Hubungi Kami",
      body: [
        "Untuk pertanyaan terkait Syarat Layanan ini, silakan hubungi kami:",
        "Email: legal@renewa.asia\nTelepon: +62 813-8887-0011\nAlamat: Jakarta, Indonesia",
      ],
    },
  ],
  en: [
    {
      title: "1. Acceptance of Terms",
      body: [
        "By accessing or using the renewa.asia website, you confirm that you have read, understood, and agreed to these Terms of Service. If you do not agree, please discontinue use of the website.",
        "These terms apply to all visitors, users, and any other parties who access our services.",
      ],
    },
    {
      title: "2. About Our Services",
      body: [
        "PT Renewa Green Energy ('Renewa') provides an informational website about our green energy business ecosystem, including: EV credit platform (Credit Connect), carbon credit trading (Credit Trading), EV battery recycling, and renewable energy.",
        "Content on this website is informational in nature and does not constitute an offer of securities, investment advice, or a solicitation to conduct any financial transaction, unless explicitly stated.",
      ],
    },
    {
      title: "3. Permitted Use",
      body: [
        "You may use this website for personal, informational, and non-commercial purposes.",
        "You may not: (a) reproduce, distribute, or exploit content without written permission; (b) scrape, crawl, or automatically collect data; (c) disrupt the security or integrity of our systems; (d) use the website for illegal purposes or to infringe the rights of others.",
      ],
    },
    {
      title: "4. Intellectual Property",
      body: [
        "All content on this website — including text, design, logos, graphics, and other materials — is owned by PT Renewa Green Energy and protected by Indonesian intellectual property law.",
        "The names 'Renewa', 'Renewa Green', and 'Renewa Asia' are registered or pending trademarks.",
        "Use of content for educational or non-commercial purposes with clear attribution is permitted with prior written consent.",
      ],
    },
    {
      title: "5. Disclaimers & Limitation of Liability",
      body: [
        "Information on this website is provided 'as is'. Renewa makes no warranties as to the accuracy, completeness, or suitability of the information for any particular purpose.",
        "Business projections, GMV estimates, and targets mentioned on the website are estimates based on internal assumptions and do not constitute guarantees of future results.",
        "Renewa is not liable for any direct, indirect, incidental, or consequential losses arising from the use or inability to use this website.",
      ],
    },
    {
      title: "6. Third-Party Links",
      body: [
        "Our website may contain links to third-party websites. These are provided for your convenience and do not constitute an endorsement of the content or privacy practices of those sites.",
        "Renewa is not responsible for the content or services available on third-party websites.",
      ],
    },
    {
      title: "7. Changes to Services",
      body: [
        "Renewa reserves the right to modify, suspend, or discontinue any part of the service or website at any time without prior notice.",
        "We may also update these Terms of Service at any time. The latest version will always be available on this page.",
      ],
    },
    {
      title: "8. Governing Law",
      body: [
        "These Terms of Service are governed by and construed in accordance with the laws of the Republic of Indonesia.",
        "Any disputes arising from or in connection with these Terms shall first be resolved through deliberation, and if no agreement is reached, through the South Jakarta District Court.",
      ],
    },
    {
      title: "9. Contact Us",
      body: [
        "For questions regarding these Terms of Service, please contact us:",
        "Email: legal@renewa.asia\nPhone: +62 813-8887-0011\nAddress: Jakarta, Indonesia",
      ],
    },
  ],
};

const dict = {
  id: {
    label: "Legal",
    h1: "Syarat Layanan",
    effective: "Berlaku sejak: 1 Januari 2025",
    intro: "Syarat Layanan ini mengatur penggunaan website dan layanan PT Renewa Green Energy. Harap baca dengan seksama sebelum menggunakan layanan kami.",
    privacyNote: "Kebijakan Privasi",
    privacyText: "Penggunaan data pribadi Anda diatur oleh",
    privacySuffix: "kami, yang merupakan bagian yang tidak terpisahkan dari syarat ini.",
  },
  en: {
    label: "Legal",
    h1: "Terms of Service",
    effective: "Effective: January 1, 2025",
    intro: "These Terms of Service govern your use of the PT Renewa Green Energy website and services. Please read carefully before using our services.",
    privacyNote: "Privacy Policy",
    privacyText: "Your use of personal data is governed by our",
    privacySuffix: ", which forms an integral part of these terms.",
  },
};

export default function Terms() {
  const lang = useLang();
  const t = dict[lang];
  const content = sections[lang];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 68 }}>
        {/* Hero */}
        <section style={{ padding: "80px 40px 64px", background: "#0B0F0E", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <SectionLabel text={t.label} />
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", color: "#F2F5EF", letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
              {t.h1}
            </h1>
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "rgba(184,245,58,0.5)", letterSpacing: "1.5px", marginBottom: 24 }}>
              {t.effective}
            </p>
            <p style={{ fontSize: 16, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
              {t.intro}
            </p>
            <p style={{ fontSize: 14, color: "#7A9E85", lineHeight: 1.6, fontWeight: 300 }}>
              {t.privacyText}{" "}
              <Link href="/privacy-policy" style={{ color: "#B8F53A", textDecoration: "underline", textUnderlineOffset: 3 }}>
                {t.privacyNote}
              </Link>
              {t.privacySuffix}
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "72px 40px 96px", background: "#0B0F0E" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
            {content.map((sec) => (
              <div key={sec.title} style={{ borderLeft: "2px solid rgba(184,245,58,0.2)", paddingLeft: 28 }}>
                <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#F2F5EF", marginBottom: 16, letterSpacing: -0.3 }}>
                  {sec.title}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {sec.body.map((para, i) => (
                    <p key={i} style={{ fontSize: 15, color: "#7A9E85", lineHeight: 1.8, fontWeight: 300, whiteSpace: "pre-line" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer note */}
            <div style={{ marginTop: 16, padding: "20px 24px", background: "#0D2B1E", border: "0.5px solid rgba(184,245,58,0.15)", borderRadius: 10 }}>
              <p style={{ fontSize: 13, color: "#7A9E85", lineHeight: 1.7, fontWeight: 300 }}>
                {lang === "id"
                  ? "Dokumen ini terakhir diperbarui pada 1 Januari 2025. Versi sebelumnya tersedia atas permintaan melalui legal@renewa.asia."
                  : "This document was last updated on January 1, 2025. Previous versions are available upon request at legal@renewa.asia."}
              </p>
            </div>

            {/* Cross-links */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/privacy-policy" style={{ fontSize: 14, color: "#B8F53A", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", border: "0.5px solid rgba(184,245,58,0.3)", borderRadius: 100 }}>
                {lang === "id" ? "Kebijakan Privasi →" : "Privacy Policy →"}
              </Link>
              <Link href="/contact" style={{ fontSize: 14, color: "#7A9E85", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 100 }}>
                {lang === "id" ? "Hubungi Kami →" : "Contact Us →"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
