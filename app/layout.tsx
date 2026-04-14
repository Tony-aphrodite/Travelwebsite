import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SessionProvider from '@/components/SessionProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Aurelia Viajes — El arte de viajar, redescubierto',
    template: '%s | Aurelia Viajes',
  },
  description:
    'Aurelia crea experiencias de viaje que combinan el lujo discreto con el alma de cada destino. Vuelos, hoteles boutique, villas privadas y momentos inolvidables.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Aurelia Viajes',
    title: 'Aurelia Viajes — El arte de viajar, redescubierto',
    description: 'Experiencias de viaje de lujo curadas para ti.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SessionProvider>
      </body>
    </html>
  );
}
