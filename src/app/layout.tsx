
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import React, { Suspense } from 'react';
import { ClickTracker } from '@/components/click-tracker';
import { Inter, Source_Code_Pro } from 'next/font/google';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';
import { cookies } from 'next/headers'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://tool.huzi.pk'),
  title: {
    default: 'tool.huzi.pk – Free Online Tools & Utilities for Everyday Tasks',
    template: '%s – tool.huzi.pk',
  },
  description: 'Discover free online tools at tool.huzi.pk – from text, image & code converters to generators, all in one place. Fast, secure & 100% client-side.',
  keywords: "online tools, free web utilities, text tools, code tools, image converter, QR code generator, password generator, regex tester, base converter, lorem ipsum generator, json formatter, css minifier, javascript minifier, online calculator, client side tools, browser based tools, free online generators, web developer tools",
  openGraph: {
    type: "website",
    url: "https://tool.huzi.pk/",
    title: "tool.huzi.pk – Free Online Tools & Utilities",
    description: "A curated collection of client-side utilities and tools to streamline your everyday tasks.",
    images: [{
      url: "https://i.postimg.cc/c1QGBS44/tool-huzi-pk.png",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "tool.huzi.pk – Free Online Tools & Utilities",
    description: "A curated collection of client-side utilities and tools to streamline your everyday tasks.",
    images: ["https://i.postimg.cc/c1QGBS44/tool-huzi-pk.png"],
  },
};

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
  const logoUrl = "https://i.postimg.cc/c1QGBS44/tool-huzi-pk.png";
  const cookieStore = cookies()
  const themeCookie = cookieStore.get('toolbox-hub-theme');
  const theme = themeCookie ? themeCookie.value : 'dark';

  const themeClasses: {[key: string]: string} = {
    light: 'light',
    dark: 'dark',
    blue: 'theme-blue',
    orange: 'theme-orange'
  }

  const htmlClassName = themeClasses[theme] || 'dark';
  
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sourceCodePro.variable} ${htmlClassName}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href={inter.style.fontFamily} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={sourceCodePro.style.fontFamily} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href={logoUrl} type="image/png" />
        <link rel="shortcut icon" href={logoUrl} type="image/png" />
        <link rel="apple-touch-icon" href={logoUrl} />
      </head>
      <body className="font-body antialiased min-h-screen bg-background font-sans">
        <ThemeProvider
          storageKey="toolbox-hub-theme"
          defaultTheme="dark"
        >
          <div className="relative isolate min-h-screen">
             <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                <div
                    style={{
                    clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="flex min-h-screen w-full flex-col">
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
          </div>
          <Toaster />
          <ClickTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
