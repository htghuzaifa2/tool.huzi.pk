
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    template: '%s - tool.huzi.pk',
    default: 'tool.huzi.pk – Free Online Tools & Utilities for Everyday Tasks',
  },
  description: 'Discover free online tools at tool.huzi.pk – from text, image & code converters to generators, all in one place. Fast, secure & 100% client-side.',
  keywords: 'online tools, free web utilities, text tools, code tools, image converter, QR code generator, password generator, regex tester, base converter, lorem ipsum generator, json formatter, css minifier, javascript minifier, online calculator, client side tools, browser based tools, free online generators, web developer tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
