import type { Metadata } from "next";
import { Inter, Abril_Fatface } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BBQ Calculator",
    default: "BBQ Calculator — Know Exactly When Your BBQ Is Done",
  },
  description:
    "Enter your meat, weight, and cooking method — get a precise cook plan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${abrilFatface.variable}`}>
      <body className="text-brand-text min-h-screen flex flex-col" style={{ background: '#0A150D' }}>
        <Header />
        <main className="flex-1 w-full pt-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
