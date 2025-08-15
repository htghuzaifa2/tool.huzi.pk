
import { Calculator, CaseSensitive, Ruler, QrCode, KeyRound, HeartPulse, Cake, Image, FileText, Info, MessageSquare, Pencil, Pilcrow, Type, Banknote, Globe, FileImage } from "lucide-react";

export const tools = [
  {
    icon: <CaseSensitive className="h-8 w-8" />,
    href: "/text-tools",
    title: "Text Tools",
    description: "Manipulate text with tools for case conversion and more.",
  },
  {
    icon: <Ruler className="h-8 w-8" />,
    href: "/unit-converter",
    title: "Unit Converter",
    description: "Convert between various units for length, mass, and temperature.",
  },
   {
    icon: <Banknote className="h-8 w-8" />,
    href: "/currency-converter",
    title: "Currency Converter",
    description: "Convert values between different world currencies.",
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
  {
    icon: <FileImage className="h-8 w-8" />,
    href: "/image-to-pdf-converter",
    title: "Image to PDF Converter",
    description: "Convert multiple images (JPG, PNG, WebP) into a single PDF file.",
  },
   {
    icon: <Pencil className="h-8 w-8" />,
    href: "/notepad",
    title: "Notepad",
    description: "A simple notepad to write, edit, save locally, and download your notes.",
  },
  {
    icon: <Pilcrow className="h-8 w-8" />,
    href: "/rich-text-editor",
    title: "Rich Text Editor",
    description: "An advanced editor for formatted text with headings, lists, and more.",
  },
  {
    icon: <Type className="h-8 w-8" />,
    href: "/word-counter",
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in your text.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    href: "/time-zone-converter",
    title: "Time Zone Converter",
    description: "Compare the current time across different parts of the world.",
  },
  {
    icon: <Info className="h-8 w-8" />,
    href: "/about",
    title: "About",
    description: "Learn more about our mission and the creator of this website.",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    href: "/contact",
    title: "Contact",
    description: "Get in touch with us for questions, feedback, or suggestions.",
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
    icon: <Banknote className="h-8 w-8 text-primary" />,
    href: "/guide#currency-converter",
    title: "Currency Converter Guide",
    description: "How to convert between currencies.",
    steps: [
        "Go to the Currency Converter page.",
        "Enter the amount you wish to convert.",
        "Select the currency you are converting from in the first dropdown.",
        "Select the currency you are converting to in the second dropdown.",
        "The result will be displayed automatically.",
        "Use the swap button to quickly reverse the 'from' and 'to' currencies."
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
   {
    icon: <FileImage className="h-8 w-8 text-primary" />,
    href: "/guide#image-to-pdf-converter",
    title: "Image to PDF Converter Guide",
    description: "How to convert images into a single PDF.",
    steps: [
      "Navigate to the Image to PDF Converter page.",
      "Click the upload area to select one or more image files.",
      "Your selected images will appear in the queue below.",
      "Click the 'Convert to PDF' button to start the process.",
      "Your browser will automatically download the generated PDF file."
    ]
  },
  {
    icon: <Pencil className="h-8 w-8 text-primary" />,
    href: "/guide#notepad",
    title: "Notepad Guide",
    description: "How to use the local notepad.",
    steps: [
      "Go to the Notepad page.",
      "Type your notes directly into the text area.",
      "Click 'Save New Note' to store the content in your browser's local storage.",
      "Your saved notes will appear below. You can edit, download, or delete them using the buttons on each note.",
      "To edit, click the pencil icon, make changes in the editor, and click 'Update Note'.",
      "Click 'Download' to save a specific note as a text file.",
      "Click 'Delete' to permanently remove a note."
    ]
  },
  {
    icon: <Pilcrow className="h-8 w-8 text-primary" />,
    href: "/guide#rich-text-editor",
    title: "Rich Text Editor Guide",
    description: "How to use the advanced editor.",
    steps: [
        "Navigate to the Rich Text Editor page.",
        "Use the toolbar at the top to apply formatting.",
        "You can create headings, make text bold or italic, create lists, and more.",
        "Your content is saved automatically in the editor."
    ]
  },
  {
    icon: <Type className="h-8 w-8 text-primary" />,
    href: "/guide#word-counter",
    title: "Word Counter Guide",
    description: "How to count words, characters, and more.",
    steps: [
        "Go to the Word Counter page.",
        "Type or paste your text into the text area.",
        "The counters for words, characters, sentences, and paragraphs will update in real-time.",
    ]
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    href: "/guide#time-zone-converter",
    title: "Time Zone Converter Guide",
    description: "How to compare time across the world.",
    steps: [
        "Go to the Time Zone Converter page.",
        "Your local time zone is added by default.",
        "Click 'Add Time Zone' to add another location.",
        "Use the dropdown menu to select the desired time zone for each entry.",
        "The times will update automatically every second.",
        "Click the trash icon to remove a time zone."
    ]
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    href: "/guide#contact-form",
    title: "Contact Form Guide",
    description: "How to send us a message.",
    steps: [
        "Go to the Contact page.",
        "Fill in your name and message in the required fields.",
        "You can optionally add your email and a subject.",
        "Click 'Send Message'. This will open WhatsApp with a pre-filled message ready to be sent to us.",
    ]
  },
];
