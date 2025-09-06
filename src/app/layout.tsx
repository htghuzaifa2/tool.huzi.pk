
"use client"

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { useState, useEffect } from 'react';
import { ClickTracker } from '@/components/click-tracker';
import { Preloader } from '@/components/preloader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoUrl = "https://i.postimg.cc/DwJRWXXr/tools-huzi-pk-logo.png";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs once on the client after the initial render.
    // We use a timeout to simulate loading and ensure the animation is visible.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
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
        
        {/* Favicon and Apple Touch Icons */}
        <link rel="icon" href={logoUrl} type="image/png" />
        <link rel="shortcut icon" href={logoUrl} type="image/png" />
        <link rel="apple-touch-icon" href={logoUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tool.huzi.pk/" />
        <meta property="og:title" content="tool.huzi.pk – Free Online Tools & Utilities" />
        <meta property="og:description" content="A curated collection of client-side utilities and tools to streamline your everyday tasks." />
        <meta property="og:image" content={logoUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tool.huzi.pk/" />
        <meta property="twitter:title" content="tool.huzi.pk – Free Online Tools & Utilities" />
        <meta property="twitter:description" content="A curated collection of client-side utilities and tools to streamline your everyday tasks." />
        <meta property="twitter:image" content={logoUrl} />

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
          {loading ? <Preloader /> : (
            <>
              <div className="relative flex min-h-screen w-full flex-col">
                <Header />
                <div className="flex flex-1">
                  <main className="flex-1 w-full">{children}</main>
                </div>
                <Footer />
              </div>
              <Toaster />
              <ClickTracker />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
