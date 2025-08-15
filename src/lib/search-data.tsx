
import { Calculator, CaseSensitive, Ruler, QrCode, KeyRound, Guide, Book } from "lucide-react";

export const tools = [
  {
    icon: <CaseSensitive className="h-8 w-8" />,
    href: "/text-tools",
    title: "Text Tools",
    description: "Manipulate text with tools for case conversion, counting, and more.",
  },
  {
    icon: <Ruler className="h-8 w-8" />,
    href: "/unit-converter",
    title: "Unit Converter",
    description: "Convert between various units for length, mass, and temperature.",
  },
  {
    icon: <Calculator className="h-8 w-8" />,
    href: "/calculator",
    title: "Calculator",
    description: "A simple and easy-to-use calculator for your daily needs.",
  },
  {
    icon: <QrCode className="h-8 w-8" />,
    href: "/qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, and more.",
  },
  {
    icon: <KeyRound className="h-8 w-8" />,
    href: "/password-generator",
    title: "Password Generator",
    description: "Generate strong, secure, and random passwords.",
  },
];

export const guides = [
  {
    icon: <CaseSensitive className="h-8 w-8 text-primary" />,
    href: "/guide#text-tools",
    title: "Text Tools Guide",
    description: "Learn how to use the Case Converter and Text Counter.",
  },
  {
    icon: <Ruler className="h-8 w-8 text-primary" />,
    href: "/guide#unit-converter",
    title: "Unit Converter Guide",
    description: "A quick guide to converting units.",
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    href: "/guide#calculator",
    title: "Calculator Guide",
    description: "How to perform calculations.",
  },
  {
    icon: <QrCode className="h-8 w-8 text-primary" />,
    href: "/guide#qr-code-generator",
    title: "QR Code Generator Guide",
    description: "Create and download QR codes.",
  },
  {
    icon: <KeyRound className="h-8 w-8 text-primary" />,
    href: "/guide#password-generator",
    title: "Password Generator Guide",
    description: "Generate strong, secure passwords.",
  },
];
