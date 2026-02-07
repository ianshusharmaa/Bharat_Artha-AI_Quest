import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "भारत अर्थ-AI Quest - Financial Literacy Game",
  description: "Bharat Arth-AI Quest: Master financial literacy through AI-powered games. शिक्षार्थियों के लिए एक इंटरैक्टिव खेल",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:shadow"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <Navbar />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
