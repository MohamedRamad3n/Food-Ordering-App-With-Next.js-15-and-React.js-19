import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Languages, Directions } from "@/constants/enums";
import { i18n } from "@/i18n.config";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Food Ordering App",
  description: "A food ordering application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use the default locale from i18n config
  const locale = i18n.defaultLocale;
  const isRTL = locale === Languages.ARABIC;
  console.log(Directions);
  
  
  return (
    <html 
      lang={locale} 
      dir={isRTL ? Directions.RTL : Directions.LTR}
      suppressHydrationWarning
    >
      <body 
        className={isRTL ? cairo.className : roboto.className}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
} 