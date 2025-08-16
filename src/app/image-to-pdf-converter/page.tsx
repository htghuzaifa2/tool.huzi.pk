
"use client"

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Upload, Download, RefreshCw, FileImage, X, Loader2, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

export default function ImageToPdfConverterPage() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const imageToPdfGuide = guides.find(g => g.href.includes('image-to-pdf-converter'));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            if(imageFiles.length !== files.length) {
                toast({
                    title: "Invalid Files",
                    description: "Some selected files were not images and have been ignored.",
                    variant: "destructive",
                });
            }
            setSelectedFiles(prev => [...prev, ...imageFiles]);
        }
    };
    
    const handleConvert = async () => {
        if (selectedFiles.length === 0) {
            toast({
                title: "No Files",
                description: "Please select at least one image file.",
                variant: "destructive",
            });
            return;
        }

        setIsConverting(true);
        toast({ title: 'Conversion Started', description: 'Your PDF is being generated...' });

        try {
            // Initialize with default portrait orientation
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });
            
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const imgData = await readFileAsDataURL(file);
                const img = await loadImage(imgData);

                const isLandscape = img.width > img.height;
                const orientation = isLandscape ? 'l' : 'p';
                
                // A4 dimensions in mm: Portrait (210x297), Landscape (297x210)
                const pdfWidth = isLandscape ? 297 : 210;
                const pdfHeight = isLandscape ? 210 : 297;

                if (i > 0) {
                    pdf.addPage([pdfWidth, pdfHeight], orientation);
                } else {
                    // For the first page, set the orientation if it's not the default
                    if(isLandscape) {
                        pdf.addPage([pdfWidth, pdfHeight], orientation);
                        pdf.deletePage(1); // delete the initial blank page
                    }
                }

                const margin = 10; // 10mm margin on all sides
                const usableWidth = pdfWidth - (margin * 2);
                const usableHeight = pdfHeight - (margin * 2);

                const aspectRatio = img.width / img.height;
                let newWidth, newHeight;

                if (usableWidth / aspectRatio <= usableHeight) {
                    newWidth = usableWidth;
                    newHeight = newWidth / aspectRatio;
                } else {
                    newHeight = usableHeight;
                    newWidth = newHeight * aspectRatio;
                }
                
                const x = (pdfWidth - newWidth) / 2;
                const y = (pdfHeight - newHeight) / 2;
                
                pdf.addImage(imgData, file.type.split('/')[1].toUpperCase(), x, y, newWidth, newHeight);
            }
            
            pdf.save('converted-images.pdf');
            toast({ title: 'Success!', description: 'Your PDF has been downloaded.' });
        } catch (error) {
            console.error(error);
            toast({
                title: "Conversion Failed",
                description: "Something went wrong while creating the PDF.",
                variant: "destructive",
            });
        } finally {
            setIsConverting(false);
        }
    };

    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    
    const loadImage = (src: string): Promise<HTMLImageElement> => {
         return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    const handleReset = () => {
        setSelectedFiles([]);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }
    
    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold font-headline">Image to PDF Converter</CardTitle>
                        <CardDescription>Convert JPG, PNG, or WebP images into a single PDF file.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Card 
                            className="border-2 border-dashed border-muted-foreground/50 h-48 flex items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                multiple
                            />
                            <div className="space-y-2 text-muted-foreground">
                                <Upload className="h-10 w-10 mx-auto" />
                                <p>Click or drag to upload images</p>
                                <p className="text-xs">Multiple files accepted</p>
                            </div>
                        </Card>

                        {selectedFiles.length > 0 && (
                            <div className="space-y-4">
                               <h3 className="text-lg font-semibold text-center">Image Queue ({selectedFiles.length})</h3>
                               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-72 overflow-y-auto p-2 bg-muted rounded-md">
                                   {selectedFiles.map((file, index) => (
                                       <div key={index} className="relative group">
                                           <div className="aspect-square bg-cover bg-center rounded-md" style={{backgroundImage: `url(${URL.createObjectURL(file)})`}}></div>
                                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                               <Button variant="destructive" size="icon" onClick={() => removeFile(index)}>
                                                   <X className="h-4 w-4" />
                                               </Button>
                                           </div>
                                            <p className="text-xs truncate mt-1">{file.name}</p>
                                       </div>
                                   ))}
                               </div>
                               
                               <div className="flex justify-center gap-4">
                                   <Button onClick={handleConvert} disabled={isConverting} size="lg">
                                       {isConverting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Converting...</> : <><FileImage className="mr-2" /> Convert to PDF</>}
                                   </Button>
                                   <Button variant="outline" onClick={handleReset} size="lg">
                                       <RefreshCw className="mr-2" /> Clear All
                                   </Button>
                               </div>
                           </div>
                        )}
                    </CardContent>
                </Card>

                {imageToPdfGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                                <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40">
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                </button>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{imageToPdfGuide.title}</CardTitle>
                                        <CardDescription>{imageToPdfGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {imageToPdfGuide.steps.map((step, stepIndex) => (
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
