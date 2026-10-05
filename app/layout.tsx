import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Arcana — A Digital Tarot Ritual',
  description: 'Browse the Major Arcana and handpick any card upright or reversed.',
  openGraph: {
    title: 'Arcana — A Digital Tarot Ritual',
    description: 'Browse the Major Arcana and handpick any card upright or reversed.',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Arcana tarot deck beneath a crescent moon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcana — A Digital Tarot Ritual',
    description: 'Browse the Major Arcana and handpick any card upright or reversed.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
