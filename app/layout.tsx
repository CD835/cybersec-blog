import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://cd835.github.io/cybersec-blog"),
  title: {
    default: "0xSec Blog | Cybersecurity Research & CTF Writeups",
    template: "%s | 0xSec Blog",
  },
  description:
    "A cybersecurity blog covering CTF challenges, reverse engineering, Kali Linux, web security, and penetration testing.",
  keywords: [
    "cybersecurity",
    "CTF",
    "capture the flag",
    "reverse engineering",
    "Kali Linux",
    "web security",
    "penetration testing",
    "hacking",
    "infosec",
    "security research",
  ],
  authors: [{ name: "Security Researcher", url: "https://github.com" }],
  creator: "Security Researcher",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cd835.github.io/cybersec-blog",
    siteName: "0xSec Blog",
    title: "0xSec Blog | Cybersecurity Research & CTF Writeups",
    description:
      "A cybersecurity blog covering CTF challenges, reverse engineering, Kali Linux, web security, and penetration testing.",
    images: [
      {
        url: "/images/default-og.png",
        width: 1200,
        height: 630,
        alt: "0xSec Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0xSec Blog | Cybersecurity Research & CTF Writeups",
    description:
      "A cybersecurity blog covering CTF challenges, reverse engineering, Kali Linux, web security, and penetration testing.",
    images: ["/images/default-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="0xSec Blog RSS Feed"
          href="/rss.xml"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
