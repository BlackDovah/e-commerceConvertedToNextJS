import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/PageParts/Header";
import { Footer } from "@/components/PageParts/Footer";
import { BottomNavigationSection } from "@/components/PageParts/BottomNavigationSection";
import { MantineProvider, DirectionProvider } from "@mantine/core";
import { ProductProvider } from "@/components/Contexts/ProductContext";
import { SearchProvider } from "@/components/Contexts/SearchContext";
import { BooksProvider } from "@/components/Contexts/BooksContext";
import { I18nProvider } from "@/components/Contexts/I18nProvider";
import { dir } from "i18next";
import { languages } from "@/app/i18n/settings";
import { cookies } from "next/headers";
import { theme } from "../theme";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Bookstore",
  description: "Your one-stop shop for all books",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "en";

  return (
    <html lang={lang} dir={dir(lang)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DirectionProvider>
          <MantineProvider theme={theme}>
            <I18nProvider lang={lang}>
              <ProductProvider>
                <SearchProvider>
                  <BooksProvider>
                    <Header />
                    {children}
                    <BottomNavigationSection />
                    <Footer />
                  </BooksProvider>
                </SearchProvider>
              </ProductProvider>
            </I18nProvider>
          </MantineProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
