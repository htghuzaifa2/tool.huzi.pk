
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calculator, CaseSensitive, Ruler, QrCode, KeyRound } from "lucide-react";

const guides = [
  {
    icon: <CaseSensitive className="h-8 w-8 text-primary" />,
    title: "Text Tools",
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
    title: "Unit Converter",
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
    title: "Calculator",
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
    title: "QR Code Generator",
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
    title: "Password Generator",
    description: "Generate strong, secure passwords.",
    steps: [
      "Head to the Password Generator page.",
      "Use the slider to set your desired password length.",
      "Check the boxes to include uppercase letters, lowercase letters, numbers, or symbols.",
      "A new password is generated automatically. Click the refresh button to get a new one.",
      "Click the copy icon to copy the password to your clipboard."
    ]
  },
];

export default function GuidePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Tool Guides
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Your step-by-step instructions for using our powerful tools.
          </p>
        </div>

        <div className="space-y-8">
          {guides.map((guide, index) => (
             <Card key={index}>
              <CardHeader>
                  <div className="flex items-center gap-4">
                      {guide.icon}
                      <div>
                          <CardTitle className="font-headline">{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                      </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="font-semibold">How to Use</AccordionTrigger>
                          <AccordionContent>
                              <ol className="list-decimal list-inside space-y-2 pt-2 text-muted-foreground">
                                  {guide.steps.map((step, stepIndex) => (
                                      <li key={stepIndex}>{step}</li>
                                  ))}
                              </ol>
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              </CardContent>
          </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
