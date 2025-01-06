import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Navigation, MainLayout } from '@/app/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '버킷스토어 프론트엔드 과제',
  description: '버킷스토어 프론트엔드 과제: 김희진',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Header />
          <MainLayout>
            <Navigation />
            {children}
          </MainLayout>
      </body>
    </html>
  );
}
