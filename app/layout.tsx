import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🍋 HeartSapce | Voice',
  description: 'A kind and empathetic voice when speaking with you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>{children}</body>
    </html>
  );
}
