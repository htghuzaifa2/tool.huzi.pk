
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides as allGuides } from "@/lib/search-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 3;

export default function GuidePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allGuides.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentGuides = allGuides.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {currentGuides.map((guide, index) => (
             <Card key={guide.href} id={guide.href.split('#')[1]}>
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

        {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-4">
              <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline">
                <ArrowLeft className="mr-2 h-5 w-5" /> Previous
              </Button>
              <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline">
                Next <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
      </div>
    </div>
  );
}
