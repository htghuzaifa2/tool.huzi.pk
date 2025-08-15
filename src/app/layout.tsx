
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: {
    template: '%s - tool.huzi.pk',
    default: 'Free Online Tools - tool.huzi.pk | Your Digital Toolbox',
  },
  description: 'Discover a comprehensive suite of free online tools at tool.huzi.pk. From password generators and QR code creators to image converters and developer utilities, all our tools are client-side, ensuring your data stays private. Fast, secure, and easy to use.',
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
