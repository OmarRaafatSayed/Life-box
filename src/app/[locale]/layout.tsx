import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import NavigationClientProvider from "./NavigationClientProvider";
import "../globals.css";
import Header from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LootBox } from "@/components/ui/LootBox3D";

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Life Box — Premium Home Products",
  description:
    "Life Box: Quality home utilities, housewares, textiles and decorative items. Shop now.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages =
    locale === "ar"
      ? (await import("../../i18n/messages/ar.json")).default
      : (await import("../../i18n/messages/en.json")).default;

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased pb-16 md:pb-0">
        <NavigationClientProvider locale={locale} messages={messages}>
          <Header />
          <LootBox />
          {children}
          <MobileBottomNav locale={locale} />
        </NavigationClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
