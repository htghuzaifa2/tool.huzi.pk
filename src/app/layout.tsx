
"use client"

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { useState, useEffect, Suspense } from 'react';
import { ClickTracker } from '@/components/click-tracker';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { Skeleton } from '@/components/ui/skeleton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

function RootLayoutSkeleton() {
  return (
    <div className="container py-10">
      <div className="space-y-8">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoUrl = "https://i.postimg.cc/DwJRWXXr/tools-huzi-pk-logo.png";
  
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sourceCodePro.variable}`}>
      <head>
         <title>tool.huzi.pk – Free Online Tools & Utilities for Everyday Tasks</title>
        <meta name="description" content="Discover free online tools at tool.huzi.pk – from text, image & code converters to generators, all in one place. Fast, secure & 100% client-side." />
        <meta name="keywords" content="online tools, free web utilities, text tools, code tools, image converter, QR code generator, password generator, regex tester, base converter, lorem ipsum generator, json formatter, css minifier, javascript minifier, online calculator, client side tools, browser based tools, free online generators, web developer tools" />
        
        <link rel="icon" href={logoUrl} type="image/png" />
        <link rel="shortcut icon" href={logoUrl} type="image/png" />
        <link rel="apple-touch-icon" href={logoUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tool.huzi.pk/" />
        <meta property="og:title" content="tool.huzi.pk – Free Online Tools & Utilities" />
        <meta property="og:description" content="A curated collection of client-side utilities and tools to streamline your everyday tasks." />
        <meta property="og:image" content={logoUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tool.huzi.pk/" />
        <meta property="twitter:title" content="tool.huzi.pk – Free Online Tools & Utilities" />
        <meta property="twitter:description" content="A curated collection of client-side utilities and tools to streamline your everyday tasks." />
        <meta property="twitter:image" content={logoUrl} />
      </head>
      <body className="font-body antialiased min-h-screen bg-background font-sans">
        <ThemeProvider
          storageKey="toolbox-hub-theme"
          defaultTheme="dark"
        >
          <div className="relative flex min-h-screen w-full flex-col">
            <Header />
            <div className="flex flex-1">
              <main className="flex-1 w-full">
                <Suspense fallback={<RootLayoutSkeleton />}>
                  {children}
                </Suspense>
              </main>
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
