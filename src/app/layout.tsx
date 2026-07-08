import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AxeRunner from '../components/AxeRunner';
import ApolloProviderWrapper from '../components/ApolloProviderWrapper';
import AuthProvider from '../components/AuthProvider';
import ThemeToggle from '../components/ThemeToggle';
import { ErrorBoundary } from 'react-error-boundary';

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
        <ErrorBoundary fallback={<main><h1>Something Went Wrong</h1></main>}>
        <AuthProvider>
          <ApolloProviderWrapper>
            <AxeRunner>
              <ThemeToggle />
              {children}
            </AxeRunner>
          </ApolloProviderWrapper>
        </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
