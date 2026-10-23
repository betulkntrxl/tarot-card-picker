import type { Metadata } from 'next';
import './globals.css';

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
