import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Clinequal",
  description:
    "Clinequal detects and corrects bias in clinical trial data, ensuring equitable healthcare outcomes for all populations.",
  keywords: [
    "clinical trials",
    "bias detection",
    "healthcare equity",
    "AI",
    "machine learning",
    "pharma",
  ],
  icons: {
    icon: "/Payoff.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
