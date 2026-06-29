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
    template: '%s | Rough Cut BBQ',
    default: 'Rough Cut BBQ — Know Exactly When Your BBQ Is Done',
  },
  description:
    'Rough Cut BBQ Calculator and Forum. Enter your meat, weight, and cooking method — get a precise cook plan. Share images and comments anonymously.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${abrilFatface.variable}`}>
      <body className="bg-brand-dark text-brand-text min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
