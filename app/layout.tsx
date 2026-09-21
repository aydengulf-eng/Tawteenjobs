import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://tawteenjobs.com"),
  title: {
    default: "توطين للوظائف | فرص العمل في الخليج",
    template: "%s | توطين للوظائف",
  },
  description: "اكتشف أحدث الوظائف وفرص التوطين في السعودية والإمارات وقطر والكويت والبحرين وعُمان.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "توطين للوظائف",
    title: "توطين للوظائف | فرص العمل في الخليج",
    description: "اكتشف أحدث الوظائف وفرص التوطين في دول الخليج.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "توطين للوظائف | فرص العمل في الخليج",
    description: "اكتشف أحدث الوظائف وفرص التوطين في دول الخليج.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}<CookieConsent /></body>
    </html>
  );
}
