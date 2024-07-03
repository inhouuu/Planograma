import type { Metadata } from "next";
import { Poppins, Montserrat } from 'next/font/google'
import { Auth } from '@/context/contextApi';

import { GlobalProvider } from '@/context/contextGlobals';

import Header from '@/components/header/page';
import "./globals.scss";

const inter = Montserrat({ subsets: ['latin'], weight: '300' });


export const metadata: Metadata = {
  title: "Planograma",
  description: "by Applay",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0" />
      </head>

      <body className={inter.className}>
        <Auth>
          <GlobalProvider>
            <Header />
            {children}
          </GlobalProvider>
        </Auth>
      </body>
    </html>
  );
}
