"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLang } from "@/context/LanguageContext";

const sections = {
  id: [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      body: [
        "Data identitas: nama lengkap, alamat email, nomor telepon, dan informasi perusahaan yang Anda berikan saat menghubungi kami atau mendaftar layanan.",
        "Data penggunaan: informasi tentang bagaimana Anda mengakses dan menggunakan website kami, termasuk alamat IP, jenis browser, halaman yang dikunjungi, dan durasi kunjungan.",
        "Data komunikasi: pesan dan korespondensi yang Anda kirimkan melalui formulir kontak atau email resmi kami.",
      ],
    },
    {
      title: "2. Bagaimana Kami Menggunakan Data",
      body: [
        "Memproses dan merespons pertanyaan, permohonan investasi, atau kemitraan yang Anda ajukan.",
        "Mengirimkan informasi terkait produk, layanan, atau pembaruan ekosistem Renewa Green yang relevan.",
        "Meningkatkan kualitas layanan, keamanan platform, dan pengalaman pengguna website kami.",
        "Memenuhi kewajiban hukum dan regulasi yang berlaku di Indonesia.",
      ],
    },
    {
      title: "3. Dasar Hukum Pemrosesan",
      body: [
        "Pemrosesan data Anda didasarkan pada: (a) pelaksanaan perjanjian atau langkah pra-kontrak atas permintaan Anda; (b) kepentingan sah kami dalam mengelola bisnis dan meningkatkan layanan; (c) kepatuhan terhadap kewajiban hukum; dan (d) persetujuan Anda, jika diperlukan secara eksplisit.",
      ],
    },
    {
      title: "4. Penyimpanan & Keamanan Data",
      body: [
        "Data Anda disimpan di server yang berlokasi di Indonesia dan/atau wilayah yang memiliki standar perlindungan data setara.",
        "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data Anda dari akses tidak sah, pengungkapan, perubahan, atau penghancuran.",
        "Data akan disimpan selama diperlukan untuk tujuan yang dinyatakan, atau selama diwajibkan oleh hukum.",
      ],
    },
    {
      title: "5. Berbagi Data dengan Pihak Ketiga",
      body: [
        "Kami tidak menjual data pribadi Anda kepada pihak ketiga.",
        "Data dapat dibagikan kepada mitra tepercaya yang membantu operasional layanan kami (seperti penyedia infrastruktur cloud), namun hanya sebatas yang diperlukan dan dengan perjanjian kerahasiaan yang memadai.",
        "Pengungkapan dapat dilakukan jika diwajibkan oleh hukum atau perintah pengadilan yang sah.",
      ],
    },
    {
      title: "6. Hak-Hak Anda",
      body: [
        "Anda berhak untuk: mengakses data pribadi yang kami miliki tentang Anda; meminta koreksi atas data yang tidak akurat; meminta penghapusan data dalam kondisi tertentu; menarik persetujuan kapan saja; dan mengajukan keberatan atas pemrosesan data.",
        "Untuk menggunakan hak-hak tersebut, hubungi kami di privacy@renewa.asia.",
      ],
    },
    {
      title: "7. Cookie & Teknologi Pelacakan",
      body: [
        "Website kami menggunakan cookie fungsional untuk memastikan operasional yang benar. Kami tidak menggunakan cookie pihak ketiga untuk tujuan periklanan tanpa persetujuan Anda.",
        "Anda dapat mengatur browser untuk menolak cookie, namun hal ini mungkin mempengaruhi fungsi tertentu dari website.",
      ],
    },
    {
      title: "8. Perubahan Kebijakan",
      body: [
        "Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Versi terbaru akan selalu tersedia di halaman ini dengan tanggal efektif yang diperbarui. Perubahan material akan kami komunikasikan melalui email atau pemberitahuan di website.",
      ],
    },
    {
      title: "9. Hubungi Kami",
      body: [
        "Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait privasi data Anda, silakan hubungi kami:",
        "Email: privacy@renewa.asia\nTelepon: +62 813-8887-0011\nAlamat: Jakarta, Indonesia",
      ],
    },
  ],
  en: [
    {
      title: "1. Information We Collect",
      body: [
        "Identity data: full name, email address, phone number, and company information you provide when contacting us or registering for our services.",
        "Usage data: information about how you access and use our website, including IP address, browser type, pages visited, and session duration.",
        "Communication data: messages and correspondence you send through our contact form or official email.",
      ],
    },
    {
      title: "2. How We Use Your Data",
      body: [
        "Processing and responding to enquiries, investment applications, or partnership requests you submit.",
        "Sending information about Renewa Green products, services, or ecosystem updates relevant to you.",
        "Improving service quality, platform security, and user experience on our website.",
        "Fulfilling legal and regulatory obligations applicable in Indonesia.",
      ],
    },
    {
      title: "3. Legal Basis for Processing",
      body: [
        "We process your data on the basis of: (a) performance of an agreement or pre-contractual steps at your request; (b) our legitimate interests in managing our business and improving our services; (c) compliance with legal obligations; and (d) your consent, where explicitly required.",
      ],
    },
    {
      title: "4. Data Storage & Security",
      body: [
        "Your data is stored on servers located in Indonesia and/or regions with equivalent data protection standards.",
        "We apply appropriate technical and organisational security measures to protect your data from unauthorised access, disclosure, alteration, or destruction.",
        "Data is retained for as long as necessary for the stated purposes, or as required by law.",
      ],
    },
    {
      title: "5. Sharing Data with Third Parties",
      body: [
        "We do not sell your personal data to third parties.",
        "Data may be shared with trusted partners who assist in operating our services (such as cloud infrastructure providers), only to the extent necessary and under adequate confidentiality agreements.",
        "Disclosure may occur if required by law or a valid court order.",
      ],
    },
    {
      title: "6. Your Rights",
      body: [
        "You have the right to: access the personal data we hold about you; request correction of inaccurate data; request deletion under certain conditions; withdraw consent at any time; and object to data processing.",
        "To exercise these rights, contact us at privacy@renewa.asia.",
      ],
    },
    {
      title: "7. Cookies & Tracking Technologies",
      body: [
        "Our website uses functional cookies to ensure proper operation. We do not use third-party advertising cookies without your consent.",
        "You may configure your browser to reject cookies, though this may affect certain website functions.",
      ],
    },
    {
      title: "8. Policy Changes",
      body: [
        "We may update this Privacy Policy at any time. The latest version will always be available on this page with an updated effective date. Material changes will be communicated via email or a notice on the website.",
      ],
    },
    {
      title: "9. Contact Us",
      body: [
        "If you have any questions, concerns, or requests regarding your data privacy, please contact us:",
        "Email: privacy@renewa.asia\nPhone: +62 813-8887-0011\nAddress: Jakarta, Indonesia",
      ],
    },
  ],
};

const dict = {
  id: {
    label: "Privasi",
    h1: "Kebijakan Privasi",
    effective: "Berlaku sejak: 1 Januari 2025",
    intro: "PT Renewa Green Energy ('Renewa', 'kami') berkomitmen untuk melindungi privasi dan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda menggunakan layanan atau website kami.",
  },
  en: {
    label: "Privacy",
    h1: "Privacy Policy",
    effective: "Effective: January 1, 2025",
    intro: "PT Renewa Green Energy ('Renewa', 'we', 'us') is committed to protecting your privacy and personal data. This policy explains how we collect, use, and safeguard your information when you use our services or website.",
  },
};

export default function PrivacyPolicy() {
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
            <p style={{ fontSize: 16, color: "#7A9E85", lineHeight: 1.75, fontWeight: 300 }}>
              {t.intro}
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
                  ? "Kebijakan ini dibuat sesuai dengan Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP) Republik Indonesia."
                  : "This policy is prepared in accordance with Law No. 27 of 2022 on Personal Data Protection (UU PDP) of the Republic of Indonesia."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
