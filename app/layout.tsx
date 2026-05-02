import './globals.css';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import MetaPixel from '@/components/MetaPixel';
import AnnouncementBar from '@/components/AnnouncementBar';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wic & Whisper — handcrafted scented candles, made in India',
  description:
    'Soy-wax candles, hand-poured in Bangalore. Toxin-free, slow-burn, natural fragrance. Coffee Roast, Sandalwood, Saffron, Latte Collection, Bespoke Diwali.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wicwhisper.com'),
  openGraph: {
    title: 'Wic & Whisper — handcrafted scented candles',
    description:
      'Soy-wax candles, hand-poured in Bangalore. Natural fragrance, slow-burn, toxin-free.',
    url: 'https://wicwhisper.com',
    siteName: 'Wic & Whisper',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-cream-50 text-ink antialiased">
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
