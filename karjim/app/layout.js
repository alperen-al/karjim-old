import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

export const metadata = {
  title: `${siteConfig.brand.name} | ${siteConfig.brand.subTitle}`,
  description: `${siteConfig.brand.name} - ${siteConfig.brand.slogan} Karabük'te modern fitness ve crossfit deneyimi.`,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
