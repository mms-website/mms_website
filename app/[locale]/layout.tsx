import '../globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '../components/Navbar';
import Providers from '../provider';
import { messagesMap } from '../messages';
import Footer from '../components/Footer';
import { LocaleProvider } from '../context/LocaleContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EventBrain',
  description: 'EventBrain is a web app to manage events',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const messages = messagesMap[locale as keyof typeof messagesMap];
  if (!messages) throw new Error(`No messages for locale ${locale}`);

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-(--bg-main-light) dark:bg-(--bg-main-dark)`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleProvider>
            <Providers>
              {/* Wrapper flex vertical */}
              <div className="flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Main content */}
                <main className="flex-1 mt-20 m-3">
                  {children}
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </Providers>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

