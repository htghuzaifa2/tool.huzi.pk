"use client"

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, Table, Code, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function HtmlTableGeneratorPage() {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
    const [hasHeader, setHasHeader] = useState(true);
    const [hasFooter, setHasFooter] = useState(false);
    const { toast } = useToast();
    const tableGeneratorGuide = guides.find(g => g.href.includes('html-table-generator'));

    const generatedHtml = useMemo(() => {
        let tableHtml = '<table>\n';

        if (hasHeader) {
            tableHtml += '  <thead>\n';
            tableHtml += '    <tr>\n';
            for (let j = 1; j <= cols; j++) {
                tableHtml += `      <th>Header ${j}</th>\n`;
            }
            tableHtml += '    </tr>\n';
            tableHtml += '  </thead>\n';
        }

        tableHtml += '  <tbody>\n';
        for (let i = 1; i <= rows; i++) {
            tableHtml += '    <tr>\n';
            for (let j = 1; j <= cols; j++) {
                tableHtml += `      <td>Row ${i}, Cell ${j}</td>\n`;
            }
            tableHtml += '    </tr>\n';
        }
        tableHtml += '  </tbody>\n';

        if (hasFooter) {
            tableHtml += '  <tfoot>\n';
            tableHtml += '    <tr>\n';
            for (let j = 1; j <= cols; j++) {
                tableHtml += `      <td>Footer ${j}</td>\n`;
            }
            tableHtml += '    </tr>\n';
            tableHtml += '  </tfoot>\n';
        }

        tableHtml += '</table>';
        return tableHtml;
    }, [rows, cols, hasHeader, hasFooter]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedHtml);
        toast({
            title: "Copied!",
            description: "HTML table code copied to clipboard.",
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Table className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">HTML Table Generator</CardTitle>
                        <CardDescription>Quickly generate clean HTML code for tables.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6 p-4 border rounded-lg">
                            <div className="space-y-2">
                                <Label htmlFor="rows">Number of Rows</Label>
                                <Input
                                    id="rows"
                                    type="number"
                                    value={rows}
                                    onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cols">Number of Columns</Label>
                                <Input
                                    id="cols"
                                    type="number"
                                    value={cols}
                                    onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="header" checked={hasHeader} onCheckedChange={(checked) => setHasHeader(Boolean(checked))} />
                                <Label htmlFor="header">Include Table Header (&lt;thead&gt;)</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Checkbox id="footer" checked={hasFooter} onCheckedChange={(checked) => setHasFooter(Boolean(checked))} />
                                <Label htmlFor="footer">Include Table Footer (&lt;tfoot&gt;)</Label>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="w-full bg-muted">
                                <CardHeader className="flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Code className="h-5 w-5" />
                                        <CardTitle className="text-lg font-headline">Generated HTML</CardTitle>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <pre className="p-4 rounded-md bg-background/70 text-sm overflow-x-auto h-64">
                                        <code className="whitespace-pre-wrap">
                                            {generatedHtml}
                                        </code>
                                    </pre>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
                {tableGeneratorGuide && (
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
                                        <CardTitle className="font-headline">{tableGeneratorGuide.title}</CardTitle>
                                        <CardDescription>{tableGeneratorGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {tableGeneratorGuide.steps.map((step, stepIndex) => (
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
