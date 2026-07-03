import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AxeRunner from '../components/AxeRunner';
import ApolloProviderWrapper from '../components/ApolloProviderWrapper';
import AuthProvider from '../components/AuthProvider';
import ThemeToggle from '../components/ThemeToggle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Job Board Portal',
  description: 'Portal for Applying Jobs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ApolloProviderWrapper>
            <AxeRunner>
              <ThemeToggle />
              {children}
            </AxeRunner>
          </ApolloProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
