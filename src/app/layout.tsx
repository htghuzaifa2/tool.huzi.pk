
"use client"

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React from 'react';
import { ClickTracker } from '@/components/click-tracker';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
          <ClickTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
