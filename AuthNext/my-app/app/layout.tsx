import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
