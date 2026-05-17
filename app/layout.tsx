import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Renewa Green Mobility & Renewable Energy Indonesia",
  description:
    "PT Renewa Green Energy: ekosistem kredit EV, carbon trading, daur ulang baterai, dan energi terbarukan. Target 100.000 unit motor listrik pada 2030.",
  keywords: "EV credit, carbon trading, battery recycling, green energy, Indonesia, motor listrik",
  openGraph: {
    title: "Renewa Green Mobility & Renewable Energy Indonesia",
    description: "Ekosistem Energi Hijau Terintegrasi Indonesia. Target 100.000 unit Motor EV pada 2030.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
