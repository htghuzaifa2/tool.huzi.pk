
"use client"

import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Loader2, BookOpen, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from 'pdfjs-dist';
import HTMLFlipBook from 'react-pageflip';
import { guides } from "@/lib/search-data";
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from '@/components/ui/progress';

// Set up the worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const runtime = 'edge';

const Page = React.forwardRef<HTMLDivElement, { pageNumber: number, children: React.ReactNode }>(({ pageNumber, children }, ref) => {
    return (
      <div ref={ref} className="bg-background shadow-md flex items-center justify-center" data-density="hard">
        <div className="flex flex-col items-center justify-center w-full h-full">
            {children}
            <span className="absolute bottom-2 right-2 text-xs text-muted-foreground">{pageNumber + 1}</span>
        </div>
      </div>
    );
});
Page.displayName = "Page";

export default function FlipbookMakerPage() {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pages, setPages] = useState<string[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const flipBook = useRef<any>(null);
    const { toast } = useToast();
    const flipbookGuide = guides.find(g => g.href.includes('flipbook-maker'));

    const handleGuideClick = () => {
        requestAnimationFrame(() => {
            const guideElement = document.getElementById('guide-section');
            if (guideElement) {
                const yOffset = -80; // a little space from the top
                const y = guideElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        let file: File | null = null;
        if ('dataTransfer' in e) {
            e.preventDefault();
            e.stopPropagation();
            file = e.dataTransfer.files?.[0] || null;
        } else {
            file = e.target.files?.[0] || null;
        }

        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            handleConvert(file);
        } else if(file) {
            toast({
                title: "Invalid File",
                description: "Please select a valid PDF file.",
                variant: "destructive",
            });
        }
    };

    const handleConvert = useCallback(async (file: File) => {
        if (!file) {
             toast({ title: "No PDF file selected", variant: "destructive"});
             return;
        }

        setIsConverting(true);
        setPages([]);
        setProgress(0);
        toast({ title: "Conversion Started", description: "Your PDF is being converted to a flipbook." });

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            const newPages: string[] = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if(context){
                    const renderContext = { canvasContext: context, viewport: viewport };
                    await page.render(renderContext).promise;
                    newPages.push(canvas.toDataURL('image/jpeg', 0.9));
                }
                setProgress(((i / numPages) * 100));
            }

            setPages(newPages);
            toast({ title: "Success!", description: "Your flipbook is ready."});
        } catch (error: any) {
            console.error(error);
            toast({
                title: "Conversion Failed",
                description: error.message || "An unexpected error occurred while processing the PDF.",
                variant: "destructive",
            });
        } finally {
            setIsConverting(false);
        }
    }, [toast]);
    
    const handleDownload = () => {
        if (pages.length === 0) return;
        pages.forEach((pageData, index) => {
            const link = document.createElement('a');
            link.href = pageData;
            link.download = `page_${index + 1}.jpg`;
            link.click();
        });
        toast({title: "Download Started", description: `Downloading ${pages.length} pages.`});
    };

    return (
        <div className="container mx-auto py-10">
            <div className="text-center mb-10">
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8" />
                </div>
                <CardTitle className="text-4xl font-bold font-headline">Flipbook Maker</CardTitle>
                <CardDescription className="max-w-2xl mx-auto mt-2">
                    PDF to flipbook free, no ads and highly customizable with different page flip effects. Share, download or embed them creating outstanding magazines, catalogs, brochures, reports, restaurant menus and more.
                </CardDescription>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                 <Card className="p-6">
                    {!pdfFile && (
                        <div 
                            className="border-2 border-dashed border-muted-foreground/50 h-64 flex items-center justify-center text-center cursor-pointer hover:border-primary transition-colors flex-col"
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleFileChange}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="application/pdf"
                                className="hidden"
                            />
                            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Drag and drop the PDF to convert</p>
                            <Button className="mt-4" variant="secondary">
                                Upload
                            </Button>
                        </div>
                    )}
                    {pdfFile && (
                         <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <BookOpen className="h-8 w-8 text-primary" />
                                <div className='flex-1'>
                                    <p className="font-semibold truncate">{pdfFile.name}</p>
                                    <p className="text-sm text-muted-foreground">{pages.length > 0 ? `${pages.length} pages` : ''}</p>
                                </div>
                            </div>
                            {isConverting && (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Converting... {Math.round(progress)}%</p>
                                    <Progress value={progress} />
                                </div>
                            )}
                            {pages.length > 0 && (
                                <div className='flex gap-2'>
                                    <Button onClick={handleDownload} variant="outline"><Download className="mr-2"/> Download Pages</Button>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-lg aspect-[4/3] bg-muted rounded-md flex items-center justify-center">
                        {pages.length > 0 ? (
                             <HTMLFlipBook
                                width={300}
                                height={400}
                                size="stretch"
                                minWidth={200}
                                maxWidth={1000}
                                minHeight={300}
                                maxHeight={1200}
                                showCover={true}
                                ref={flipBook}
                                className="mx-auto"
                            >
                                {pages.map((page, index) => (
                                    <Page key={index} pageNumber={index}>
                                        <img src={page} alt={`Page ${index + 1}`} className="max-w-full max-h-full object-contain" />
                                    </Page>
                                ))}
                            </HTMLFlipBook>
                        ) : (
                            isConverting ? 
                            <Loader2 className="h-12 w-12 text-muted-foreground animate-spin"/> :
                            <p className="text-muted-foreground">Preview will appear here</p>
                        )}
                    </div>
                     {pages.length > 0 && (
                        <div className="flex items-center gap-2 mt-4">
                            <Button variant="outline" size="icon" onClick={() => flipBook.current?.pageFlip().flipPrev()}>
                                <ChevronLeft />
                            </Button>
                            <p className="text-sm text-muted-foreground">Page Turn</p>
                             <Button variant="outline" size="icon" onClick={() => flipBook.current?.pageFlip().flipNext()}>
                                <ChevronRight />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {flipbookGuide && (
                <div className="mt-12 max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" id="guide-section" className="border-none flex flex-col items-center">
                            <AccordionTrigger onClick={handleGuideClick}>
                                <FancyAccordionButton />
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{flipbookGuide.title}</CardTitle>
                                        <CardDescription>{flipbookGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {flipbookGuide.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </div>
    );
}

