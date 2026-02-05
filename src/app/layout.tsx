import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
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
  metadataBase: new URL("https://clinequal.com"),
  openGraph: {
    title: "Clinequal",
    description:
      "Detect and correct bias in clinical trial data. Ensure equitable healthcare outcomes for all populations.",
    url: "https://clinequal.com",
    siteName: "Clinequal",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Clinequal - Clinical Trial Bias Detection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinequal",
    description:
      "Detect and correct bias in clinical trial data. Ensure equitable healthcare outcomes for all populations.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
