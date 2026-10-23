import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Oswald няма надежден кириличен набор – само latin (мотото е "New Chance")
const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "New Chance",
  description: "Спортни терени, строителство, ремонти и сделки с недвижими имоти",
  alternates: { canonical: "./" },
  openGraph: { type: "website", locale: "bg_BG", siteName: "New Chance", url: "./" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${inter.variable} ${display.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
