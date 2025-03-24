import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import RootLayoutClient from "./RootLayoutClient";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fullness-safety.com'),
  title: {
    default: "Fullness Safety - Équipements de Protection Individuelle",
    template: "%s | Fullness Safety"
  },
  description: "Spécialiste des équipements de sécurité et de protection individuelle (EPI). Plus de 500 produits certifiés pour votre sécurité au travail.",
  keywords: ["EPI", "sécurité", "protection", "équipement", "travail", "professionnel", "casque", "gants", "vêtements"],
  authors: [{ name: "Fullness Safety" }],
  creator: "Fullness Safety",
  publisher: "Fullness Safety",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://fullness-safety.com",
    siteName: "Fullness Safety",
    title: "Fullness Safety - Équipements de Protection Individuelle",
    description: "Spécialiste des équipements de sécurité et de protection individuelle (EPI). Plus de 500 produits certifiés pour votre sécurité au travail.",
    images: [{
      url: "https://fullness-safety.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Fullness Safety - Protection et sécurité au travail"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullness Safety - Équipements de Protection Individuelle",
    description: "Spécialiste des équipements de sécurité et de protection individuelle (EPI). Plus de 500 produits certifiés pour votre sécurité au travail.",
    images: ["https://fullness-safety.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://fullness-safety.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Suspense>
      </body>
    </html>
  );
}