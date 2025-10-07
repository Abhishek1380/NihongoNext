import LanguageParagraph from "@/components/features/LanguageParagraph/LanguageParagraph";
import "./globals.css";
import Navbar from '@/components/Navbar';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Fullstack App",
  description: "Mini full stack app with Next.js + MongoDB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {/* <LanguageParagraph /> */}
        {children}
      </body>
    </html>
  );
}
