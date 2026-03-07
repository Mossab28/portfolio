import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Portfolio Immersif | Premium Landing",
  description:
    "Landing page 2.5D immersive construite avec Next.js, Framer Motion et GSAP ScrollTrigger."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} bg-obsidian text-sand antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
