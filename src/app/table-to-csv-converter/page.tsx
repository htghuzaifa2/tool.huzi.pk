"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Table, Download, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function TableToCsvConverterPage() {
    const [htmlInput, setHtmlInput] = useState('');
    const { toast } = useToast();
    const tableToCsvGuide = guides.find(g => g.href.includes('table-to-csv-converter'));

    const handleConvertAndDownload = () => {
        if (!htmlInput.trim()) {
            toast({
                title: 'Error',
                description: 'Please paste your HTML table code first.',
                variant: 'destructive',
            });
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const tableEl = doc.querySelector('table');

            if (!tableEl) {
                throw new Error('No <table> element found in the provided HTML.');
            }

            const rows = Array.from(tableEl.querySelectorAll('tr'));
            const csvContent = rows.map(row => {
                const cells = Array.from(row.querySelectorAll('th, td'));
                const rowData = cells.map(cell => {
                    let text = cell.textContent || '';
                    text = text.replace(/"/g, '""'); // Escape double quotes
                    if (text.includes(',') || text.includes('\n') || text.includes('"')) {
                        text = `"${text}"`; // Wrap in double quotes if necessary
                    }
                    return text;
                }).join(',');
                return rowData;
            }).join('\n');

            if (!csvContent.trim()) {
                throw new Error('Could not extract any data from the table.');
            }

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'table_data.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: 'Success!',
                description: 'Your CSV file has been downloaded.',
            });

        } catch (error: any) {
            toast({
                title: 'Conversion Failed',
                description: error.message || 'Could not convert the provided HTML.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Table className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Table to CSV Converter</CardTitle>
                        <CardDescription>Paste your HTML table code and download it as a CSV file.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Textarea
                            placeholder="<table border='1'>...</table>"
                            value={htmlInput}
                            onChange={(e) => setHtmlInput(e.target.value)}
                            className="min-h-[300px] font-mono text-sm"
                        />
                        <Button
                            onClick={handleConvertAndDownload}
                            size="lg"
                            className="w-full"
                        >
                            <Download className="mr-2" /> Convert & Download CSV
                        </Button>
                    </CardContent>
                </Card>

                 {tableToCsvGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                               <div className="flex justify-center">
                                    <Button
                                    size="lg"
                                    variant="ghost"
                                    className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
                                    >
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                    </Button>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{tableToCsvGuide.title}</CardTitle>
                                        <CardDescription>{tableToCsvGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {tableToCsvGuide.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    );
}
