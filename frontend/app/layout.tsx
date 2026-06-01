import "./globals.css";
import type { Metadata } from "next";

// Function to determine if a locale is RTL
const isRTLLocale = (locale: string): boolean => {
  const rtlLocales = ["ar", "he", "fa", "ur"]; // Arabic, Hebrew, Persian, Urdu
  return rtlLocales.includes(locale);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const locale = (await params).locale || "en";
  
  let title = "Nestera - Decentralized Savings on Stellar";
  let description = "Secure, transparent savings powered by Stellar & Soroban";
  
  if (locale === "es") {
    title = "Nestera - Ahorros Descentralizados en Stellar";
    description = "Ahorros seguros y transparentes impulsados por Stellar & Soroban";
  }
  
  return {
    title,
    description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: For a fully localized html lang and dir attributes, we would need to access the locale
  // This requires either:
  // 1. Using a client component wrapper that reads the locale from next-intl
  // 2. Using the experimental next-intl app router support with locale routing
  // For now, we'll use the default language but note that in production with proper
  // locale routing, these should be dynamically set based on the locale
  
  // We're adding a comment to indicate where RTL support would be implemented
  // In a complete implementation with locale routing, we would:
  // 1. Get the locale from params or next-intl
  // 2. Set lang attribute to the locale
  // 3. Set dir attribute to "rtl" for RTL locales, "ltr" otherwise
  
  return (
    <html lang="en" dir="ltr">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
