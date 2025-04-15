import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Languages, Directions } from "@/constants/enums";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = params?.locale || Languages.ENGLISH;
  const isRTL = locale === Languages.ARABIC;
  
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