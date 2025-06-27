import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { FavoritesProvider } from '@/providers/FavoritesProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { AuthProvider } from '@/providers/AuthProvider';

const baseUrl = 'https://santillana-del-mar-demo.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Santillana Del Mar - Exclusive Real Estate Project',
    template: '%s | Santillana Del Mar',
  },
  description: 'Discover Santillana Del Mar, an exclusive real estate project in Cartagena, Colombia. Find luxury lots and properties for sale in a unique natural environment with premium amenities.',
  keywords: [
      'Santillana Del Mar',
      'real estate Cartagena',
      'luxury properties Colombia',
      'lots for sale',
      'exclusive community',
      'investment properties',
      'property in Cartagena',
      'inmobiliaria Cartagena',
      'propiedades de lujo',
      'lotes en venta Colombia',
      'comunidad exclusiva',
      'inversión inmobiliaria',
      'bienes raíces en Cartagena',
  ],
  icons: {
    icon: 'https://i.ibb.co/5x8xbmtK/favicon.png',
    shortcut: 'https://i.ibb.co/5x8xbmtK/favicon.png',
    apple: 'https://i.ibb.co/5x8xbmtK/favicon.png',
  },
  openGraph: {
    title: 'Santillana Del Mar - Exclusive Real Estate Project',
    description: 'Discover a sanctuary where luxury meets nature in Cartagena, Colombia.',
    url: baseUrl,
    siteName: 'Santillana Del Mar',
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Aerial view of Santillana Del Mar project',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Santillana Del Mar - Exclusive Real Estate Project',
    description: 'Discover a sanctuary where luxury meets nature in Cartagena, Colombia.',
    images: ['https://placehold.co/1200x630.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <LanguageProvider>
          <AuthProvider>
            <FavoritesProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <WhatsAppButton />
              <Toaster />
            </FavoritesProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
