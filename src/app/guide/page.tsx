
"use client"

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides as allGuides } from "@/lib/search-data";
import type { Metadata } from 'next';

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
          {allGuides.map((guide, index) => (
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
                          <AccordionTrigger>
                            How to Use
                          </AccordionTrigger>
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
