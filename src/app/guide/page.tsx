
"use client"

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides as allGuides } from "@/lib/search-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp } from "lucide-react";

const ITEMS_PER_PAGE = 25;

export default function GuidePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allGuides.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGuides = allGuides.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Add a new guide for the image compressor
  if (!allGuides.find(g => g.href.includes('image-compressor'))) {
      allGuides.push({
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
      });
      allGuides.sort((a,b) => a.title.localeCompare(b.title));
  }


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
          {currentPage > 1 && (
            <div className="mt-4">
              <Button onClick={handlePrevPage} variant="outline">
                <ArrowUp className="mr-2 h-5 w-5" /> Load Previous
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {currentGuides.map((guide, index) => (
             <Card key={guide.href} id={guide.href.replace('/guide#', '')}>
              <CardHeader>
                <Link href={guide.href.replace('/guide#', '/')}>
                  <div className="flex items-center gap-4">
                      {guide.icon}
                      <div>
                          <CardTitle className="font-headline">{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                      </div>
                  </div>
                </Link>
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
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          {currentPage > 1 && (
              <Button onClick={handlePrevPage} variant="outline">
                  <ArrowUp className="mr-2 h-4 w-4" /> Previous Page
              </Button>
          )}
          {currentPage < totalPages && (
              <Button onClick={handleNextPage} variant="default">
                  Next Page <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
          )}
        </div>
      </div>
    </div>
  );
}
