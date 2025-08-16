
import { Calculator, CaseSensitive, Ruler, QrCode, KeyRound, HeartPulse, Cake, Image, FileText, Info, MessageSquare, Pencil, Pilcrow, Type, Banknote, Globe, FileImage, Palette, Youtube, ShieldCheck, Tags, TerminalSquare, Layers, Video, Pipette, Sheet, Table, Timer, Lock, Database, Binary, Code, Share2, Ratio, Scaling, CodeXml, Keyboard, Calendar, Smile, Search, GitCompareArrows, Users, Languages, Shuffle, Scroll, Braces, Voicemail, Eraser, ArrowDownUp } from "lucide-react";

export const tools = [
  {
    icon: <CaseSensitive className="h-8 w-8" />,
    href: "/text-tools",
    title: "Text Tools",
    description: "Manipulate text with tools for case conversion and more.",
  },
  {
    icon: <GitCompareArrows className="h-8 w-8" />,
    href: "/text-diff-highlighter",
    title: "Text Diff Highlighter",
    description: "Compare two blocks of text and highlight the differences.",
  },
  {
    icon: <Voicemail className="h-8 w-8" />,
    href: "/vowel-consonant-counter",
    title: "Vowel & Consonant Counter",
    description: "Count the number of vowels and consonants in any text.",
  },
  {
    icon: <Eraser className="h-8 w-8" />,
    href: "/punctuation-remover",
    title: "Punctuation Remover",
    description: "Remove all punctuation marks from text with one click.",
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
    icon: <Binary className="h-8 w-8" />,
    href: "/base-converter",
    title: "Base Converter",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal.",
  },
  {
    icon: <Scroll className="h-8 w-8" />,
    href: "/roman-numeral-converter",
    title: "Roman Numeral Converter",
    description: "Convert numbers to Roman numerals and vice versa.",
  },
  {
    icon: <ArrowDownUp className="h-8 w-8" />,
    href: "/number-sorter",
    title: "Number Sorter",
    description: "Sort a list of numbers in ascending or descending order.",
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
    icon: <ShieldCheck className="h-8 w-8" />,
    href: "/password-strength-checker",
    title: "Password Strength Checker",
    description: "Test the strength of your password and get suggestions to make it more secure.",
  },
   {
    icon: <Users className="h-8 w-8" />,
    href: "/random-username-generator",
    title: "Random Username Generator",
    description: "Generate creative usernames from keywords and random words.",
  },
  {
    icon: <Lock className="h-8 w-8" />,
    href: "/text-encryption",
    title: "Text Encryption Tool",
    description: "Encrypt and decrypt text using a simple Caesar cipher.",
  },
  {
    icon: <Languages className="h-8 w-8" />,
    href: "/morse-code-translator",
    title: "Morse Code Translator",
    description: "Convert text to Morse code and back, with sound playback.",
  },
  {
    icon: <Shuffle className="h-8 w-8" />,
    href: "/anagram-finder",
    title: "Anagram Finder",
    description: "Find all possible letter combinations (permutations) for a given word.",
  },
  {
    icon: <Shuffle className="h-8 w-8" />,
    href: "/sentence-shuffler",
    title: "Sentence Shuffler",
    description: "Randomly shuffle sentences in a paragraph while keeping punctuation intact.",
  },
  {
    icon: <Braces className="h-8 w-8" />,
    href: "/json-validator",
    title: "JSON Validator",
    description: "Check if JSON data is valid and highlight errors directly in the browser.",
  },
  {
    icon: <Tags className="h-8 w-8" />,
    href: "/meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Generate perfect SEO meta titles, descriptions, and keywords for your website.",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    href: "/open-graph-generator",
    title: "Open Graph Tag Generator",
    description: "Generate perfect Open Graph meta tags for better link previews on social media.",
  },
  {
    icon: <Table className="h-8 w-8" />,
    href: "/html-table-generator",
    title: "HTML Table Generator",
    description: "Create clean HTML table code from row and column inputs.",
  },
   {
    icon: <Code className="h-8 w-8" />,
    href: "/html-minifier",
    title: "HTML Minifier",
    description: "Minify HTML code by removing spaces, line breaks, and comments.",
  },
  {
    icon: <CodeXml className="h-8 w-8" />,
    href: "/html-entity-decoder",
    title: "HTML Entity Decoder",
    description: "Convert HTML entities back to normal text instantly.",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    href: "/css-box-shadow-generator",
    title: "CSS Box Shadow Generator",
    description: "Visually design CSS box shadows and copy the generated code instantly.",
  },
  {
    icon: <Pipette className="h-8 w-8" />,
    href: "/css-gradient-generator",
    title: "CSS Gradient Generator",
    description: "Create custom linear and radial gradients with a color picker and copy the CSS.",
  },
  {
    icon: <Sheet className="h-8 w-8" />,
    href: "/csv-viewer",
    title: "CSV Viewer",
    description: "Upload a CSV file and view it in a clean, sortable, and searchable table.",
  },
  {
    icon: <Table className="h-8 w-8" />,
    href: "/table-to-csv-converter",
    title: "Table to CSV Converter",
    description: "Convert any HTML table into a downloadable CSV file.",
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
    icon: <Calendar className="h-8 w-8" />,
    href: "/date-difference-calculator",
    title: "Date Difference Calculator",
    description: "Calculate the number of days, weeks, or months between two dates.",
  },
   {
    icon: <Ratio className="h-8 w-8" />,
    href: "/aspect-ratio-calculator",
    title: "Aspect Ratio Calculator",
    description: "Calculate correct dimensions while maintaining an image’s aspect ratio.",
  },
  {
    icon: <Scaling className="h-8 w-8" />,
    href: "/px-to-rem-converter",
    title: "Pixel to Rem Converter",
    description: "Convert pixel values to rem and vice versa for responsive web design.",
  },
  {
    icon: <Timer className="h-8 w-8" />,
    href: "/stopwatch-timer",
    title: "Stopwatch & Timer",
    description: "A responsive stopwatch and countdown timer that works offline."
  },
  {
    icon: <Keyboard className="h-8 w-8" />,
    href: "/keyboard-event-tester",
    title: "Keyboard Event Tester",
    description: "Detect and display key codes and key names when you press any key.",
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
    icon: <TerminalSquare className="h-8 w-8" />,
    href: "/markdown-editor",
    title: "Markdown Editor",
    description: "A live Markdown editor that shows instant preview of formatted text.",
  },
  {
    icon: <Type className="h-8 w-8" />,
    href: "/word-counter",
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs in your text.",
  },
  {
    icon: <Pilcrow className="h-8 w-8" />,
    href: "/lorem-ipsum-generator",
    title: "Lorem Ipsum Generator",
    description: "Generate random placeholder text with an exact number of words.",
  },
  {
    icon: <Smile className="h-8 w-8" />,
    href: "/random-emoji-generator",
    title: "Random Emoji Generator",
    description: "Generate a random emoji or emoji set instantly.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    href: "/time-zone-converter",
    title: "Time Zone Converter",
    description: "Compare the current time across different parts of the world.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    href: "/ip-address-finder",
    title: "IP Address Finder",
    description: "Display your public IP address using a free API.",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    href: "/color-picker",
    title: "Color Picker",
    description: "Pick a color and get its HEX, RGB, and HSL codes for your projects.",
  },
  {
    icon: <Youtube className="h-8 w-8" />,
    href: "/youtube-thumbnail-downloader",
    title: "YouTube Thumbnail Downloader",
    description: "Download high-quality thumbnails from any YouTube video instantly.",
  },
   {
    icon: <Video className="h-8 w-8" />,
    href: "/vimeo-thumbnail-downloader",
    title: "Vimeo Thumbnail Downloader",
    description: "Download the thumbnail from any public Vimeo video.",
  },
  {
    icon: <Video className="h-8 w-8" />,
    href: "/dailymotion-thumbnail-downloader",
    title: "Dailymotion Thumbnail Downloader",
    description: "Download the thumbnail from any Dailymotion video.",
  },
  {
    icon: <Database className="h-8 w-8" />,
    href: "/local-storage-editor",
    title: "Local Storage Editor",
    description: "View, edit, and delete data stored in your browser's local storage.",
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
    icon: <Search className="h-8 w-8 text-primary" />,
    href: "/guide#search-guide",
    title: "How to Find Tools",
    description: "Quickly find any tool or guide using the search bar.",
    steps: [
      "Click the search icon in the header or press Ctrl+K (or Cmd+K on Mac).",
      "Type the name of the tool you're looking for (e.g., 'password' or 'color picker').",
      "Click on the desired tool from the search results to navigate to its page.",
      "You can also switch between searching for 'Tools' and 'Guides' using the tabs.",
    ],
  },
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
    icon: <Binary className="h-8 w-8 text-primary" />,
    href: "/guide#base-converter",
    title: "Base Converter Guide",
    description: "How to convert numbers between different bases.",
    steps: [
      "Go to the Base Converter page.",
      "Enter the number you wish to convert in the 'From' input.",
      "Select the base of your input number (e.g., Binary for '1010').",
      "Select the target base you want to convert to.",
      "The result will be displayed automatically.",
      "Use the swap button to quickly reverse the conversion."
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
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    href: "/guide#password-strength-checker",
    title: "Password Strength Checker Guide",
    description: "How to test your password's security.",
    steps: [
        "Navigate to the Password Strength Checker page.",
        "Type your password into the input field.",
        "As you type, a strength meter will show how secure your password is.",
        "Review the checklist below the meter to see which criteria your password meets (e.g., length, uppercase letters).",
        "Improve your password until it reaches the 'Very Strong' level."
    ]
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    href: "/guide#random-username-generator",
    title: "Username Generator Guide",
    description: "How to create random usernames.",
    steps: [
      "Go to the Random Username Generator page.",
      "Enter an optional keyword to base the usernames on.",
      "Use the switches to include numbers or random words.",
      "Click 'Generate Usernames' to get a list of suggestions.",
      "Click the copy icon next to any username to copy it."
    ]
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    href: "/guide#text-encryption",
    title: "Text Encryption Guide",
    description: "How to encrypt and decrypt text.",
    steps: [
      "Go to the Text Encryption Tool page.",
      "Enter the text you want to process in the input area.",
      "Set a 'shift key' (a number between 1 and 25).",
      "Click 'Encrypt' to scramble the text or 'Decrypt' to unscramble it.",
      "The result will appear in the output box, ready to be copied."
    ]
  },
   {
    icon: <Tags className="h-8 w-8 text-primary" />,
    href: "/guide#meta-tag-generator",
    title: "Meta Tag Generator Guide",
    description: "How to generate SEO meta tags.",
    steps: [
        "Navigate to the Meta Tag Generator page.",
        "Fill in the Title, Description, and Keywords for your webpage.",
        "The HTML meta tags will be generated automatically in the code block.",
        "Click the copy icon to copy the generated tags to your clipboard."
    ]
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    href: "/guide#open-graph-generator",
    title: "Open Graph Generator Guide",
    description: "How to generate Open Graph tags.",
    steps: [
      "Go to the Open Graph Generator page.",
      "Fill in the fields: Title, Type, Image URL, Page URL, and Description.",
      "The HTML `og:` meta tags will generate instantly in the code box below.",
      "Click the copy button to use them in your website's `<head>` section."
    ]
  },
  {
    icon: <Table className="h-8 w-8 text-primary" />,
    href: "/guide#html-table-generator",
    title: "HTML Table Generator Guide",
    description: "How to create HTML tables.",
    steps: [
      "Visit the HTML Table Generator page.",
      "Enter the number of rows and columns you need.",
      "Check the boxes if you want to include a table header (`<thead>`) or footer (`<tfoot>`).",
      "The HTML code will be created in the code box on the right.",
      "Click the copy button to grab the code."
    ]
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    href: "/guide#html-minifier",
    title: "HTML Minifier Guide",
    description: "How to minify your HTML code.",
    steps: [
      "Open the HTML Minifier tool.",
      "Paste your full HTML code into the 'Original HTML' text area.",
      "Click the 'Minify HTML' button.",
      "Your compressed HTML will appear in the 'Minified HTML' box below.",
      "Click the copy button to get the minified code."
    ]
  },
  {
    icon: <CodeXml className="h-8 w-8 text-primary" />,
    href: "/guide#html-entity-decoder",
    title: "HTML Entity Decoder Guide",
    description: "How to decode HTML entities.",
    steps: [
      "Navigate to the HTML Entity Decoder page.",
      "Paste your text containing HTML entities (e.g., `&lt;p&gt;`) into the left text area.",
      "The decoded text (e.g., `<p>`) will instantly appear in the right text area.",
      "Click the copy button above the decoded text to copy it to your clipboard."
    ]
  },
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    href: "/guide#css-box-shadow-generator",
    title: "CSS Box Shadow Generator Guide",
    description: "How to visually design a box shadow.",
    steps: [
        "Go to the CSS Box Shadow Generator page.",
        "Use the sliders to adjust horizontal/vertical offset, blur, and spread.",
        "Pick a color and adjust its opacity.",
        "Toggle the 'inset' switch if needed.",
        "Your shadow will update in the live preview area.",
        "Click the copy icon to grab the generated CSS code."
    ]
  },
  {
    icon: <Pipette className="h-8 w-8 text-primary" />,
    href: "/guide#css-gradient-generator",
    title: "CSS Gradient Generator Guide",
    description: "How to create CSS gradients.",
    steps: [
      "Open the CSS Gradient Generator.",
      "Choose between 'Linear' and 'Radial' gradient types.",
      "Adjust the sliders and color stops to design your gradient.",
      "Add or remove color stops as needed.",
      "The live preview shows your gradient in real-time.",
      "Click the copy icon to get the final CSS `background` property."
    ]
  },
  {
    icon: <Sheet className="h-8 w-8 text-primary" />,
    href: "/guide#csv-viewer",
    title: "CSV Viewer Guide",
    description: "How to view and search CSV files.",
    steps: [
      "Go to the CSV Viewer page.",
      "Click the upload area and select a `.csv` file from your device.",
      "The data will be displayed in a table.",
      "You can sort columns by clicking on their headers.",
      "Use the search bar at the top to filter rows across all columns."
    ]
  },
  {
    icon: <Table className="h-8 w-8 text-primary" />,
    href: "/guide#table-to-csv-converter",
    title: "Table to CSV Converter Guide",
    description: "How to convert an HTML table to CSV.",
    steps: [
      "Visit the Table to CSV Converter page.",
      "Paste your full HTML code containing a `<table>` element into the text area.",
      "Click the 'Convert & Download CSV' button.",
      "The tool will parse the table and trigger a download for the resulting `.csv` file."
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
    icon: <Calendar className="h-8 w-8 text-primary" />,
    href: "/guide#date-difference-calculator",
    title: "Date Difference Guide",
    description: "How to find the time between dates.",
    steps: [
      "Go to the Date Difference Calculator page.",
      "Select a 'Start Date' and an 'End Date' using the date pickers.",
      "Click the 'Calculate Difference' button.",
      "The result will be shown in total months, weeks, and days."
    ]
  },
    {
    icon: <Ratio className="h-8 w-8 text-primary" />,
    href: "/guide#aspect-ratio-calculator",
    title: "Aspect Ratio Calculator Guide",
    description: "Learn how to calculate dimensions.",
    steps: [
      "Go to the Aspect Ratio Calculator page.",
      "Enter the original width and height of your item (e.g., 1920 and 1080).",
      "In the 'New Dimensions' section, type either your desired new width or new height.",
      "The other dimension will be calculated automatically to maintain the aspect ratio.",
      "Click 'Reset' to clear the fields and start over."
    ]
  },
  {
    icon: <Scaling className="h-8 w-8 text-primary" />,
    href: "/guide#px-to-rem-converter",
    title: "Pixel to Rem Converter Guide",
    description: "How to convert between px and rem.",
    steps: [
      "Open the Pixel to Rem Converter page.",
      "Set the 'Base Font Size' for your project (usually 16px).",
      "Enter a value in either the 'Pixels (px)' or 'Rems (rem)' field.",
      "The other field will update automatically based on your input."
    ]
  },
  {
    icon: <Timer className="h-8 w-8 text-primary" />,
    href: "/guide#stopwatch-timer",
    title: "Stopwatch & Timer Guide",
    description: "How to use the timing tools.",
    steps: [
      "Go to the Stopwatch & Timer page.",
      "Select either the 'Stopwatch' or 'Timer' tab.",
      "For the Stopwatch, use Start/Pause, Reset, and Lap buttons to measure time.",
      "For the Timer, set a duration using the preset buttons, then use Start/Pause and Reset."
    ]
  },
  {
    icon: <Keyboard className="h-8 w-8 text-primary" />,
    href: "/guide#keyboard-event-tester",
    title: "Keyboard Event Tester Guide",
    description: "How to inspect keyboard events.",
    steps: [
      "Navigate to the Keyboard Event Tester page.",
      "Simply press any key on your keyboard.",
      "The tool will instantly display the `event.key`, `event.code`, and `event.which` values.",
      "It will also show which modifier keys (Shift, Ctrl, Alt, Meta) were active during the keypress."
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
        "Content is saved to your browser's local storage automatically. Use the Save button for manual saves.",
        "You can Download your note as an HTML file or Clear the editor."
    ]
  },
   {
    icon: <TerminalSquare className="h-8 w-8 text-primary" />,
    href: "/guide#markdown-editor",
    title: "Markdown Editor Guide",
    description: "A quick guide to the live markdown editor.",
    steps: [
        "Go to the Markdown Editor page.",
        "Type your Markdown syntax in the left-hand panel.",
        "As you type, a live preview of the formatted text will appear in the right-hand panel.",
        "The editor supports standard Markdown and GitHub-Flavored Markdown (GFM)."
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
    icon: <Pilcrow className="h-8 w-8 text-primary" />,
    href: "/guide#lorem-ipsum-generator",
    title: "Lorem Ipsum Generator Guide",
    description: "How to generate placeholder text.",
    steps: [
      "Navigate to the Lorem Ipsum Generator page.",
      "Enter the desired number of words into the input field.",
      "Click the 'Generate Text' button.",
      "Your placeholder text will appear in the text area below.",
      "Click the copy icon to copy the text to your clipboard."
    ]
  },
  {
    icon: <Smile className="h-8 w-8 text-primary" />,
    href: "/guide#random-emoji-generator",
    title: "Random Emoji Generator Guide",
    description: "How to generate random emojis.",
    steps: [
      "Go to the Random Emoji Generator page.",
      "Set the number of emojis you want to generate.",
      "Click the 'Generate' button.",
      "Your random emoji(s) will appear in the display box.",
      "Click 'Copy to Clipboard' to copy the result."
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
    icon: <Globe className="h-8 w-8 text-primary" />,
    href: "/guide#ip-address-finder",
    title: "IP Address Finder Guide",
    description: "How to find your public IP address.",
    steps: [
      "Go to the IP Address Finder page.",
      "The tool will automatically fetch and display your public IP address.",
      "You can click 'Copy IP' to copy the address to your clipboard.",
      "Click 'Refresh' to fetch the IP address again."
    ]
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    href: "/guide#color-picker",
    title: "Color Picker Guide",
    description: "How to pick a color and copy its codes.",
    steps: [
        "Go to the Color Picker page.",
        "Use the color swatch to visually select a color, or manually input a HEX code.",
        "The page will instantly display the HEX, RGB, and HSL values for the selected color.",
        "Click the copy icon next to any code to copy it to your clipboard.",
    ]
  },
  {
    icon: <Youtube className="h-8 w-8 text-primary" />,
    href: "/guide#youtube-thumbnail-downloader",
    title: "YouTube Thumbnail Downloader Guide",
    description: "How to download thumbnails from YouTube videos.",
    steps: [
        "Navigate to the YouTube Thumbnail Downloader.",
        "Paste the URL of the video into the input field.",
        "Click 'Get Thumbnails'.",
        "A gallery of available thumbnails will appear.",
        "Click the 'Download' button below the thumbnail you want to save."
    ]
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    href: "/guide#vimeo-thumbnail-downloader",
    title: "Vimeo Thumbnail Downloader Guide",
    description: "How to download thumbnails from Vimeo videos.",
    steps: [
        "Navigate to the Vimeo Thumbnail Downloader.",
        "Paste the URL of the video into the input field.",
        "Click 'Get Thumbnail'.",
        "The highest quality thumbnail will appear.",
        "Click the 'Download' button below the thumbnail to save it."
    ]
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    href: "/guide#dailymotion-thumbnail-downloader",
    title: "Dailymotion Thumbnail Downloader Guide",
    description: "How to download thumbnails from Dailymotion videos.",
    steps: [
        "Navigate to the Dailymotion Thumbnail Downloader.",
        "Paste the URL of the video into the input field.",
        "Click 'Get Thumbnail'.",
        "The highest quality thumbnail will appear.",
        "Click the 'Download' button below the thumbnail to save it."
    ]
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    href: "/guide#local-storage-editor",
    title: "Local Storage Editor Guide",
    description: "How to manage your browser's local storage.",
    steps: [
      "Open the Local Storage Editor page.",
      "The tool will display all entries currently in your browser's local storage for this domain.",
      "Click on an entry to expand it.",
      "You can edit the value in the text area and click 'Save'.",
      "Click 'Delete' to remove an entry.",
      "Use the 'Add New Entry' form to create new key-value pairs."
    ]
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    href: "/guide#contact",
    title: "Contact Form Guide",
    description: "How to send us a message.",
    steps: [
        "Go to the Contact page.",
        "Fill in your name and message in the required fields.",
        "You can optionally add your email and a subject.",
        "Click 'Send Message via WhatsApp'. This will open WhatsApp with a pre-filled message ready to be sent to us.",
        "Alternatively, you can click the email link to send a direct email."
    ]
  },
];
