

import { Calculator, CaseSensitive, Ruler, QrCode, KeyRound, HeartPulse, Cake, Image, FileText, Info, MessageSquare, Pencil, Pilcrow, Type, Banknote, Globe, FileImage, Palette, Youtube, ShieldCheck, Tags, TerminalSquare, Layers, Video, Pipette, Sheet, Table, Timer, Lock, Database, Binary, Code, Share2, Ratio, Scaling, CodeXml, Keyboard, Calendar, Smile, Search, GitCompareArrows, Users, Languages, Shuffle, Scroll, Braces, Voicemail, Eraser, ArrowDownUp, BarChart, Gift, FileSearch, Combine, Minimize, Merge, Split, ListChecks, BarChart2 } from "lucide-react";

export const tools = [
  {
    icon: <BarChart2 className="h-8 w-8" />,
    href: "/youtube-channel-analyzer",
    title: "YouTube Channel Analyzer",
    description: "Get in-depth statistics and analytics for any YouTube channel.",
  },
  {
    icon: <Gift className="h-8 w-8" />,
    href: "/random-picker-wheel",
    title: "Random Picker Wheel",
    description: "Spin a virtual wheel to randomly select a winner from a list of options.",
  },
  {
    icon: <ListChecks className="h-8 w-8" />,
    href: "/random-item-picker",
    title: "Random Item Picker",
    description: "Enter a list of items and let the tool randomly pick one for you.",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    href: "/resume-builder",
    title: "Resume Builder",
    description: "Create and customize professional resumes with a live preview.",
  },
  {
    icon: <Merge className="h-8 w-8" />,
    href: "/pdf-merger",
    title: "PDF Merger",
    description: "Combine multiple PDF files into one single document.",
  },
  {
    icon: <Split className="h-8 w-8" />,
    href: "/pdf-splitter",
    title: "PDF Splitter",
    description: "Split a single PDF into multiple smaller documents by page range.",
  },
  {
    icon: <Minimize className="h-8 w-8" />,
    href: "/image-compressor",
    title: "Image Compressor",
    description: "Compress JPG, PNG, and WEBP images to reduce file size.",
  },
  {
    icon: <QrCode className="h-8 w-8" />,
    href: "/qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes for URLs, text, WiFi, and more.",
  },
  {
    icon: <Combine className="h-8 w-8" />,
    href: "/paragraph-merger",
    title: "Paragraph Merger",
    description: "Merge multiple paragraphs into a single block of text.",
  },
  {
    icon: <CodeXml className="h-8 w-8" />,
    href: "/html-escaper-unescaper",
    title: "HTML Escaper / Unescaper",
    description: "Encode and decode special HTML characters for safe web display.",
  },
  {
    icon: <FileSearch className="h-8 w-8" />,
    href: "/text-pattern-finder",
    title: "Text Pattern Finder (Regex)",
    description: "Search and highlight specific patterns or words using regular expressions.",
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    href: "/word-density-analyzer",
    title: "Word Density Analyzer",
    description: "Analyze your text to see how many times each word appears.",
  },
  {
    icon: <ArrowDownUp className="h-8 w-8" />,
    href: "/number-sorter",
    title: "Number Sorter",
    description: "Sort a list of numbers in ascending or descending order.",
  },
  {
    icon: <Eraser className="h-8 w-8" />,
    href: "/punctuation-remover",
    title: "Punctuation Remover",
    description: "Remove all punctuation marks from text with one click.",
  },
  {
    icon: <Voicemail className="h-8 w-8" />,
    href: "/vowel-consonant-counter",
    title: "Vowel & Consonant Counter",
    description: "Count the number of vowels and consonants in any text.",
  },
  {
    icon: <Braces className="h-8 w-8" />,
    href: "/json-validator",
    title: "JSON Validator",
    description: "Check if JSON data is valid and highlight errors directly in the browser.",
  },
  {
    icon: <Shuffle className="h-8 w-8" />,
    href: "/sentence-shuffler",
    title: "Sentence Shuffler",
    description: "Randomly shuffle sentences in a paragraph while keeping punctuation intact.",
  },
  {
    icon: <Shuffle className="h-8 w-8" />,
    href: "/anagram-finder",
    title: "Anagram Finder",
    description: "Find all possible letter combinations (permutations) for a given word.",
  },
  {
    icon: <Languages className="h-8 w-8" />,
    href: "/morse-code-translator",
    title: "Morse Code Translator",
    description: "Convert text to Morse code and back, with sound playback.",
  },
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
    title: "Word & Character Counter",
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
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    href: "/guide#youtube-channel-analyzer",
    title: "YouTube Channel Analyzer Guide",
    description: "How to get analytics for a YouTube channel.",
    steps: [
        "Go to the YouTube Channel Analyzer page.",
        "Paste the URL of the YouTube channel you want to analyze into the search bar.",
        "Click the 'Analyze Channel' button.",
        "The tool will fetch and display the channel's statistics, including subscriber count, total views, and video count.",
        "Use the tabs to switch between the 'About' and 'Statistics' sections for more detailed information."
    ]
  },
  {
    icon: <Gift className="h-8 w-8 text-primary" />,
    href: "/guide#random-picker-wheel",
    title: "Random Picker Wheel Guide",
    description: "How to randomly pick an option using a spinning wheel.",
    steps: [
        "Go to the Random Picker Wheel page.",
        "In the text area, enter each option on a new line.",
        "The wheel on the right will update with your options.",
        "Click the 'Spin the Wheel' button to start the animation.",
        "The wheel will spin and land on a random winner, which will be announced in a notification. A confetti celebration will also trigger."
    ]
  },
  {
    icon: <ListChecks className="h-8 w-8 text-primary" />,
    href: "/guide#random-item-picker",
    title: "Random Item Picker Guide",
    description: "How to randomly pick an item from a list.",
    steps: [
        "Go to the Random Item Picker page.",
        "In the text area, enter each item on a new line.",
        "Click the 'Pick a Random Item' button.",
        "Watch the animation as it highlights different items.",
        "The winning item will be displayed. You can then copy it to your clipboard."
    ]
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    href: "/guide#resume-builder",
    title: "Resume Builder Guide",
    description: "How to create your professional resume.",
    steps: [
      "Navigate to the Resume Builder page.",
      "Fill in your personal and professional details in the form on the left.",
      "Use the 'Add Experience' and 'Add Education' buttons to add multiple entries.",
      "As you type, the resume preview on the right will update in real-time.",
      "Once you are satisfied with your resume, click the 'Download as PDF' button."
    ]
  },
  {
    icon: <Merge className="h-8 w-8 text-primary" />,
    href: "/guide#pdf-merger",
    title: "PDF Merger Guide",
    description: "How to combine multiple PDFs into one.",
    steps: [
      "Go to the PDF Merger page.",
      "Click the upload area or drag and drop your PDF files.",
      "Once uploaded, you can drag the files in the list to reorder them.",
      "Click the 'Merge PDFs' button to combine them.",
      "Your browser will automatically download the single, merged PDF file."
    ]
  },
  {
    icon: <Split className="h-8 w-8 text-primary" />,
    href: "/guide#pdf-splitter",
    title: "PDF Splitter Guide",
    description: "How to split a PDF into multiple files.",
    steps: [
      "Go to the PDF Splitter page.",
      "Upload your PDF file.",
      "In the 'Page ranges' input, specify which pages you want to extract. For example, '1-3' will create one PDF with pages 1, 2, and 3. '1, 3-5' will create two PDFs: one with page 1, and another with pages 3, 4, and 5.",
      "Click the 'Split & Download ZIP' button.",
      "A ZIP file containing your new, smaller PDFs will be downloaded."
    ]
  },
  {
    icon: <Minimize className="h-8 w-8 text-primary" />,
    href: "/guide#image-compressor",
    title: "Image Compressor Guide",
    description: "How to compress images.",
    steps: [
      "Go to the Image Compressor page.",
      "Upload an image file (JPG, PNG, or WebP).",
      "Adjust the quality slider to your desired compression level.",
      "Click 'Compress Image' to see the result and the new file size.",
      "Click 'Download' to save the compressed image."
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
    icon: <Type className="h-8 w-8 text-primary" />,
    href: "/guide#word-counter",
    title: "Word Counter Guide",
    description: "Count words, characters, sentences, and paragraphs in your text.",
    steps: [
        "Go to the Word Counter page.",
        "Type or paste your text into the text area.",
        "The counters for words, characters, sentences, and paragraphs will update in real-time.",
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
    icon: <CodeXml className="h-8 w-8 text-primary" />,
    href: "/guide#html-escaper-unescaper",
    title: "HTML Escaper/Unescaper Guide",
    description: "How to encode and decode HTML entities.",
    steps: [
      "Navigate to the HTML Escaper / Unescaper page.",
      "Paste your text into the input field.",
      "Click 'Encode' to convert special characters like '<' to '&lt;'.",
      "Click 'Decode' to convert entities like '&lt;' back to '<'.",
      "Click the copy button above the output to copy it to your clipboard."
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
    icon: <QrCode className="h-8 w-8 text-primary" />,
    href: "/guide#qr-code-generator",
    title: "QR Code Generator Guide",
    description: "Create and download QR codes.",
    steps: [
      "Visit the QR Code Generator page.",
      "Select the type of QR code you want: Text, WiFi, or vCard.",
      "Fill in the required information for your chosen type.",
      "Customize the colors, size, and error correction level in the accordion menus.",
      "Your QR code will update live on the right.",
      "Click 'Download PNG' or 'Download SVG' to save the image."
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
];

    