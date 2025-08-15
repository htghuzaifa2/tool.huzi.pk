
"use client"

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { useEffect, useState } from 'react';

// export const metadata: Metadata = {
//   title: {
//     template: '%s - tool.huzi.pk',
//     default: 'tool.huzi.pk – Free Online Tools & Utilities for Everyday Tasks',
//   },
//   description: 'Discover free online tools at tool.huzi.pk – from text, image & code converters to generators, all in one place. Fast, secure & 100% client-side.',
//   keywords: 'online tools, free web utilities, text tools, code tools, image converter, QR code generator, password generator, regex tester, base converter, lorem ipsum generator, json formatter, css minifier, javascript minifier, online calculator, client side tools, browser based tools, free online generators, web developer tools',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Load click count from local storage
    const savedClickCount = localStorage.getItem('huzi-pk-click-count');
    if (savedClickCount) {
      setClickCount(Number(savedClickCount));
    }

    const handleClick = () => {
      setClickCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount >= 39) {
          window.open('https://huzi.pk', '_blank');
          localStorage.setItem('huzi-pk-click-count', '0');
          return 0;
        }
        localStorage.setItem('huzi-pk-click-count', String(newCount));
        return newCount;
      });
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const storageKey = 'toolbox-hub-theme';
                  const defaultTheme = 'dark';
                  let theme;
                  try {
                    theme = localStorage.getItem(storageKey) || defaultTheme;
                  } catch (e) {
                    theme = defaultTheme;
                  }
                  const root = document.documentElement;
                  root.classList.remove('light', 'dark', 'theme-blue', 'theme-orange');
                  if (theme === 'light') {
                    root.classList.add('light');
                  } else if (theme === 'blue') {
                    root.classList.add('theme-blue');
                  } else if (theme === 'orange') {
                    root.classList.add('theme-orange');
                  } else {
                    root.classList.add(theme);
                  }
                })();
              `,
            }}
          />
         <title>tool.huzi.pk – Free Online Tools & Utilities for Everyday Tasks</title>
        <meta name="description" content="Discover free online tools at tool.huzi.pk – from text, image & code converters to generators, all in one place. Fast, secure & 100% client-side." />
        <meta name="keywords" content="online tools, free web utilities, text tools, code tools, image converter, QR code generator, password generator, regex tester, base converter, lorem ipsum generator, json formatter, css minifier, javascript minifier, online calculator, client side tools, browser based tools, free online generators, web developer tools" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background font-sans transition-colors duration-300">
        <ThemeProvider
          storageKey="toolbox-hub-theme"
          defaultTheme="dark"
        >
          <div className="relative flex min-h-screen w-full flex-col">
            <Header />
            <div className="flex flex-1">
              <main className="flex-1 w-full">{children}</main>
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
