
"use client"

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Upload, Download, RefreshCw, FileText, Loader2, FileCog } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { PDFDocument } from 'pdf-lib';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function PdfCompressorPage() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [quality, setQuality] = useState(0.75);
    const [isCompressing, setIsCompressing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const pdfCompressorGuide = guides.find(g => g.href.includes('pdf-compressor'));

    const handleGuideClick = () => {
        requestAnimationFrame(() => {
            const guideElement = document.getElementById('guide-section');
            if (guideElement) {
                const yOffset = -80;
                const y = guideElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        let selectedFile: File | null = null;
        if ('dataTransfer' in e) {
            e.preventDefault();
            e.stopPropagation();
            selectedFile = e.dataTransfer.files?.[0] || null;
        } else {
            selectedFile = e.target.files?.[0] || null;
        }

        if (selectedFile && selectedFile.type === 'application/pdf') {
            handleReset();
            setOriginalFile(selectedFile);
            setOriginalSize(selectedFile.size);
        } else if(selectedFile) {
            toast({
                title: "Invalid File",
                description: "Please select a valid PDF file.",
                variant: "destructive",
            });
        }
    };
    
    const handleCompress = async () => {
        if (!originalFile) {
            toast({
                title: "No File",
                description: "Please upload a PDF file first.",
                variant: "destructive",
            });
            return;
        }

        setIsCompressing(true);
        setCompressedSize(0);
        toast({ title: 'Compression Started', description: 'This may take a moment for large PDFs...' });

        try {
            const pdfBytes = await originalFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes, {
                // Some PDFs have objects that are not compliant with the spec, this can help
                ignoreEncryption: true,
            });

            const imageObjects = Array.from(pdfDoc.context.indirectObjects.values()).filter(
                (obj): obj is any =>
                obj && obj.dict && obj.dict.get(pdfDoc.context.obj('Subtype')) === pdfDoc.context.obj('Image')
            );

            if(imageObjects.length === 0) {
                 toast({ title: "No Images Found", description: "This PDF contains no images to compress.", variant: "destructive" });
                 setIsCompressing(false);
                 return;
            }

            for (const image of imageObjects) {
                const stream = image;
                const imageBytes = stream.getContents();
                const filter = stream.dict.get(pdfDoc.context.obj('Filter'));

                let compressedImage;
                
                try {
                    // Handle JPEGs
                    if (filter === pdfDoc.context.obj('DCTDecode')) {
                         compressedImage = await pdfDoc.embedJpg(imageBytes);
                    } 
                    // Handle PNGs (and other FlateDecoded images)
                    else if (filter === pdfDoc.context.obj('FlateDecode')) {
                        // We attempt to re-embed as PNG. This might not reduce size for all PNGs.
                         compressedImage = await pdfDoc.embedPng(imageBytes);
                    }
                    else {
                        // Skip unsupported image formats
                        continue;
                    }

                    const newImageRef = pdfDoc.context.register(pdfDoc.context.obj(compressedImage));
                    // Replace the old image object with the new compressed one
                    stream.dict.delete(pdfDoc.context.obj('Filter'));
                    stream.dict.set(pdfDoc.context.obj('Width'), pdfDoc.context.obj(compressedImage.width));
                    stream.dict.set(pdfDoc.context.obj('Height'), pdfDoc.context.obj(compressedImage.height));
                    
                    // Directly replace the image reference. This is a more robust way.
                    const pages = pdfDoc.getPages();
                    for (const page of pages) {
                        const { XObject } = page.node.Resources();
                        if (XObject) {
                            XObject.entries().forEach(([key, value]) => {
                                if (value === image.ref) {
                                    page.node.set(key, newImageRef);
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.warn("Could not compress an image, skipping it.", e);
                    continue; // Skip image if it fails to process
                }
            }
            
            const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

            setCompressedSize(compressedPdfBytes.length);

            const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `compressed-${originalFile.name}`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(link.href);
            
             toast({ title: 'Success!', description: 'Your compressed PDF has been downloaded.' });

        } catch (error: any) {
            console.error(error);
            toast({
                title: "Compression Failed",
                description: error.message || "Could not compress the PDF. It may be corrupted or in an unsupported format.",
                variant: "destructive",
            });
        } finally {
            setIsCompressing(false);
        }
    };
    
    const handleReset = () => {
        setOriginalFile(null);
        setOriginalSize(0);
        setCompressedSize(0);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const sizeReduction = originalSize > 0 && compressedSize > 0
        ? `-${Math.round(((originalSize - compressedSize) / originalSize) * 100)}%`
        : '';
    
    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <FileCog className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">PDF Compressor</CardTitle>
                        <CardDescription>Reduce the file size of your PDFs by compressing images within them.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!originalFile ? (
                            <Card 
                                className="border-2 border-dashed border-muted-foreground/50 h-48 flex items-center justify-center text-center cursor-pointer hover:border-primary transition-colors"
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
                                <div className="space-y-2 text-muted-foreground">
                                    <Upload className="h-10 w-10 mx-auto" />
                                    <p>Click or drag & drop a PDF to compress</p>
                                </div>
                            </Card>
                        ) : (
                            <div className="space-y-6">
                               <Card className="p-4 flex items-center justify-between bg-muted">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-6 w-6 text-primary"/>
                                        <div>
                                            <p className="font-semibold truncate">{originalFile.name}</p>
                                            <p className="text-sm text-muted-foreground">{formatBytes(originalSize)}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={handleReset}>
                                        <RefreshCw className="h-5 w-5"/>
                                    </Button>
                                </Card>

                                <Card className="p-6 bg-muted/50">
                                    <div className="space-y-2">
                                        <Label htmlFor="quality">Image Quality: <span className="font-bold">{(quality * 100).toFixed(0)}%</span></Label>
                                        <Slider
                                            id="quality"
                                            min={0.1}
                                            max={1}
                                            step={0.05}
                                            value={[quality]}
                                            onValueChange={(value) => setQuality(value[0])}
                                            disabled={isCompressing}
                                        />
                                         <p className="text-xs text-muted-foreground">Lower quality means smaller file size. Affects only JPEG images inside the PDF.</p>
                                    </div>
                                </Card>

                                {compressedSize > 0 && (
                                     <Card className="text-center p-4">
                                        <p className="text-lg text-muted-foreground">New Size</p>
                                        <p className="text-3xl font-bold">{formatBytes(compressedSize)}</p>
                                        <p className="text-xl font-semibold text-green-600">{sizeReduction}</p>
                                    </Card>
                                )}
                               
                               <div className="text-center">
                                   <Button onClick={handleCompress} disabled={isCompressing} size="lg">
                                       {isCompressing ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Compressing...</> : <><Download className="mr-2" /> Compress & Download</>}
                                   </Button>
                               </div>
                           </div>
                        )}
                    </CardContent>
                </Card>

                {pdfCompressorGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" id="guide-section" className="border-none flex flex-col items-center">
                            <AccordionTrigger onClick={handleGuideClick}>
                                <FancyAccordionButton />
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{pdfCompressorGuide.title}</CardTitle>
                                        <CardDescription>{pdfCompressorGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {pdfCompressorGuide.steps.map((step, stepIndex) => (
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
