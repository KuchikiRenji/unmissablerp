import type { Metadata } from "next";
import "../styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const poppins = Poppins({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-poppins", display: "swap", preload: true });
const inter = Inter({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--font-inter", display: "swap", preload: true });

export const metadata: Metadata = {
  title: "UNMISSABLERP — Next-level GTA RP",
  description: "UNMISSABLERP is a modern FiveM GTA RP community. Join the action.",
  openGraph: {
    title: "UNMISSABLERP — Next-level GTA RP",
    description: "UNMISSABLERP is a modern FiveM GTA RP community. Join the action.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UNMISSABLERP"
      }
    ]
  },
  metadataBase: new URL("https://unmissablerp.vercel.app")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-[color:var(--brand-black)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


