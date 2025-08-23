import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from '@clerk/localizations'
import Providers from "./providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Tour-Gen",
  description: "Trouver l’inspiration avant vos voyages.",
  openGraph: {
    title: 'Tour gen',
    description: 'Trouver l’inspiration avant vos voyages.',
    url: 'https://tour-gen.vercel.app',
    siteName: 'Tour Gen',
    images: [
      {
        url: 'https://tour-gen.vercel.app/images/preview.png',
        width: 1200,
        height: 630,
        alt: 'Aperçu de Tour Gen',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tour',
    description: 'Sentez-vous chez vous, même loin de chez vous.',
    images: ['https://tou-gen.vercel.app/images/preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr">
        <body
          className={inter.className}
        >
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
