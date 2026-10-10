import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Condensed display font, stand-in for the licensed Typekit font on the current site
const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SIS Pitches | Natural, Hybrid & Synthetic Sports Surfaces",
  description: "Natural, hybrid and synthetic sports surfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
