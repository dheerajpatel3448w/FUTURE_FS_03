import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "@/components/ui/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {

  title: "Starbucks Clone - Fresh Modern Redesign",
  description: "A modern redesign of Starbucks website with sleek UI, AI-generated branding, and Next.js + Tailwind for a smooth experience.",
  keywords: ["Starbucks", "coffee", "modern design", "Next.js", "AI website redesign", "TailwindCSS"],
  authors: [{ name: "Dheeraj Patel", url: "https://www.linkedin.com/in/dheeraj-patel-a42901344" }],
  openGraph: {
    title: "Starbucks Modern Redesign",
    description: "A fresh, AI-powered redesign of Starbucks with Next.js & Tailwind.",
    url: "https://your-deployed-link.vercel.app",
    siteName: "Starbucks Redesign",
    images: [
      {
        url: "/images/logo.png", // ek banner image bana ke dal
        width: 1200,
        height: 630,
        alt: "Starbucks Website Redesign Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  themeColor: "#006241", // Starbucks ka green

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
