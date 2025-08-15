
import { Calculator, CaseSensitive, Ruler, QrCode, KeyRound, HeartPulse, Cake, Image } from "lucide-react";

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
  {
    icon: <HeartPulse className="h-8 w-8" />,
    href: "/bmi-calculator",
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess your weight status.",
  },
  {
    icon: <Cake className="h-8 w-8" />,
    href: "/age-calculator",
    title: "Age Calculator",
    description: "Find out your exact age in years, months, and days.",
  },
  {
    icon: <Image className="h-8 w-8" />,
    href: "/image-converter",
    title: "Image Converter",
    description: "Easily convert image files between PNG, JPG, and WEBP formats.",
  },
];

export const guides = [
  {
    icon: <CaseSensitive className="h-8 w-8 text-primary" />,
    href: "/guide#text-tools",
    title: "Text Tools Guide",
    description: "Learn how to use the Case Converter and Text Counter.",
    steps: [
      "Navigate to the Text Tools page.",
      "Click on the 'Case Converter' or 'Counter' tab.",
      "For the converter, enter your text in the textarea and click the desired case button (e.g., UPPERCASE).",
      "For the counter, simply enter your text, and the word, character, and line counts will update automatically."
    ]
  },
  {
    icon: <Ruler className="h-8 w-8 text-primary" />,
    href: "/guide#unit-converter",
    title: "Unit Converter Guide",
    description: "A quick guide to converting units.",
    steps: [
      "Go to the Unit Converter page.",
      "Select a measurement category (Length, Mass, or Temperature).",
      "Enter the value you want to convert in the 'From' input field.",
      "Choose the 'From' and 'To' units from the dropdown menus.",
      "The converted result will appear instantly in the 'To' field."
    ]
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    href: "/guide#calculator",
    title: "Calculator Guide",
    description: "How to perform calculations.",
     steps: [
      "Open the Calculator page.",
      "Click the number and operator buttons to build your equation.",
      "Press the '=' button to see the result.",
      "Use 'AC' (All Clear) to reset the calculator at any time."
    ]
  },
  {
    icon: <QrCode className="h-8 w-8 text-primary" />,
    href: "/guide#qr-code-generator",
    title: "QR Code Generator Guide",
    description: "Create and download QR codes.",
    steps: [
      "Visit the QR Code Generator page.",
      "Type any text or URL into the input field.",
      "The QR code will generate automatically as you type.",
      "Click the 'Download QR Code' button to save the image to your device."
    ]
  },
  {
    icon: <KeyRound className="h-8 w-8 text-primary" />,
    href: "/guide#password-generator",
    title: "Password Generator Guide",
    description: "Generate strong, secure passwords.",
    steps: [
      "Head to the Password Generator page.",
      "Use the slider to set your desired password length.",
      "Check the boxes to include uppercase letters, lowercase letters, numbers, or symbols.",
      "A new password is generated automatically. Click the refresh button to get a new one.",
      "Click the copy icon to copy the password to your clipboard."
    ]
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    href: "/guide#bmi-calculator",
    title: "BMI Calculator Guide",
    description: "How to calculate your Body Mass Index.",
    steps: [
      "Go to the BMI Calculator page.",
      "Select your preferred unit system (Metric or Imperial).",
      "Enter your height and weight in the provided fields.",
      "Click the 'Calculate BMI' button.",
      "Your BMI score and weight category will be displayed below."
    ]
  },
  {
    icon: <Cake className="h-8 w-8 text-primary" />,
    href: "/guide#age-calculator",
    title: "Age Calculator Guide",
    description: "Find out your precise age.",
    steps: [
      "Navigate to the Age Calculator page.",
      "Click the input field to open the date picker.",
      "Select your date of birth from the calendar.",
      "Click the 'Calculate Age' button.",
      "Your age will be shown in years, months, and days."
    ]
  },
  {
    icon: <Image className="h-8 w-8 text-primary" />,
    href: "/guide#image-converter",
    title: "Image Converter Guide",
    description: "Convert images to different formats.",
    steps: [
      "Visit the Image Converter page.",
      "Click the upload area to select an image from your device.",
      "Once uploaded, choose your desired output format (PNG, JPG, or WEBP).",
      "Click the 'Convert Image' button.",
      "A preview of the converted image will appear. Click 'Download' to save it."
    ]
  },
];
