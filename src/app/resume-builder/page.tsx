
"use client"

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, Palette, Type, TextQuote, Mail, Phone, MapPin, AlignVerticalSpaceAround } from 'lucide-react';
import { ResumeForm, resumeSchema, type ResumeData } from '@/components/resume/form';
import { ResumeTemplate } from '@/components/resume/template';
import jsPDF from 'jspdf';
import { guides } from "@/lib/search-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const defaultValues: ResumeData = {
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    summary: 'A passionate software engineer with 5+ years of experience in developing web applications using modern technologies. Proven ability to work in fast-paced environments and deliver high-quality code.',
    experience: [
        {
            id: '1',
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            startDate: 'Jan 2020',
            endDate: 'Present',
            description: '- Led a team of 5 engineers to develop a new e-commerce platform.\n- Improved application performance by 30% through code optimization and database tuning.\n- Mentored junior developers and conducted code reviews.'
        },
        {
            id: '2',
            jobTitle: 'Software Engineer',
            company: 'Web Innovations',
            startDate: 'Jun 2017',
            endDate: 'Dec 2019',
            description: '- Developed and maintained front-end features for a SaaS application using React.\n- Collaborated with designers to create responsive and user-friendly interfaces.\n- Wrote unit and integration tests to ensure code quality.'
        }
    ],
    education: [
        {
            id: '1',
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            startDate: 'Sep 2013',
            endDate: 'May 2017',
            description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.'
        }
    ],
    skills: 'React, TypeScript, Node.js, GraphQL, PostgreSQL, Docker, AWS',
};

export type TemplateName = "professional" | "modern" | "minimalist" | "classic";
export type FontFamily = "sans" | "serif" | "mono";

export default function ResumeBuilderPage() {
    const [template, setTemplate] = useState<TemplateName>("professional");
    const [accentColor, setAccentColor] = useState("#3F51B5");
    const [fontSize, setFontSize] = useState(10);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [fontFamily, setFontFamily] = useState<FontFamily>("sans");
    
    // Visibility toggles
    const [showEmail, setShowEmail] = useState(true);
    const [showPhone, setShowPhone] = useState(true);
    const [showAddress, setShowAddress] = useState(true);

    const methods = useForm<ResumeData>({
        resolver: zodResolver(resumeSchema),
        defaultValues,
    });
    const resumeBuilderGuide = guides.find(g => g.href.includes('resume-builder'));
    
    const handleGuideClick = () => {
        requestAnimationFrame(() => {
            const guideElement = document.getElementById('guide-section');
            if (guideElement) {
                const yOffset = -80;
                const y = guideElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    };

    const handleDownloadPdf = () => {
        const resumeElement = document.getElementById('resume-preview');
        if (!resumeElement) return;

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });
        
        doc.html(resumeElement, {
            callback: function (doc) {
                doc.save('resume.pdf');
            },
            x: 0,
            y: 0,
            html2canvas: {
                scale: 0.73,
                useCORS: true,
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <div className="container mx-auto py-10">
                <div className="text-center mb-12">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-20 h-20 flex items-center justify-center mb-4">
                        <FileText className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline">Resume Builder</h1>
                    <p className="text-muted-foreground mt-2 text-lg">Create and customize a professional resume in minutes.</p>
                </div>

                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Information</CardTitle>
                                <CardDescription>Fill out the form to build your resume.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResumeForm />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Customize Layout</CardTitle>
                                <CardDescription>Change the look of your resume.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <Label>Template</Label>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        {(["professional", "modern", "minimalist", "classic"] as TemplateName[]).map(t => (
                                             <button key={t} onClick={() => setTemplate(t)} className={cn('border-2 rounded-lg p-2 transition-all', template === t ? 'border-primary ring-2 ring-primary' : 'border-border hover:border-primary/50')}>
                                                 <div className="bg-muted h-24 w-full rounded-md flex items-center justify-center">
                                                     <p className="text-sm font-semibold capitalize">{t}</p>
                                                 </div>
                                             </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label>Contact Information</Label>
                                    <div className="grid grid-cols-3 gap-4 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Switch id="showEmail" checked={showEmail} onCheckedChange={setShowEmail} />
                                            <Label htmlFor="showEmail" className="flex items-center gap-1"><Mail className="w-4 h-4" /> Email</Label>
                                        </div>
                                         <div className="flex items-center space-x-2">
                                            <Switch id="showPhone" checked={showPhone} onCheckedChange={setShowPhone} />
                                            <Label htmlFor="showPhone" className="flex items-center gap-1"><Phone className="w-4 h-4" /> Phone</Label>
                                        </div>
                                         <div className="flex items-center space-x-2">
                                            <Switch id="showAddress" checked={showAddress} onCheckedChange={setShowAddress} />
                                            <Label htmlFor="showAddress" className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Address</Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <Label htmlFor="accent-color">Accent Color</Label>
                                        <div className="relative mt-2">
                                            <Palette className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <input id="accent-color" type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-full h-10 pl-10 pr-2 rounded-md border border-input" />
                                        </div>
                                    </div>
                                     <div>
                                        <Label>Font Family</Label>
                                        <Select value={fontFamily} onValueChange={(v) => setFontFamily(v as FontFamily)}>
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Select a font" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sans">Sans Serif</SelectItem>
                                                <SelectItem value="serif">Serif</SelectItem>
                                                <SelectItem value="mono">Monospace</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="font-size">Font Size ({fontSize}pt)</Label>
                                        <Slider id="font-size" min={8} max={12} step={0.5} value={[fontSize]} onValueChange={(v) => setFontSize(v[0])} className="mt-2" />
                                    </div>
                                     <div>
                                        <Label htmlFor="line-height">Line Spacing ({lineHeight.toFixed(1)})</Label>
                                        <Slider id="line-height" min={1.2} max={1.8} step={0.1} value={[lineHeight]} onValueChange={(v) => setLineHeight(v[0])} className="mt-2" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4 lg:sticky lg:top-4">
                        <Button onClick={handleDownloadPdf} className="w-full" size="lg">
                            <Download className="mr-2" /> Download as PDF
                        </Button>
                        <Card className="overflow-hidden">
                            <div className="h-[792px] w-full bg-background shadow-lg overflow-hidden">
                                <div className="h-full w-full scale-[0.4] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.55] xl:scale-[0.7] origin-top-left">
                                  <ResumeTemplate 
                                    template={template}
                                    accentColor={accentColor}
                                    fontSize={fontSize}
                                    fontFamily={fontFamily}
                                    lineHeight={lineHeight}
                                    showEmail={showEmail}
                                    showPhone={showPhone}
                                    showAddress={showAddress}
                                  />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                 {resumeBuilderGuide && (
                    <div className="mt-8">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="guide" id="guide-section" className="border-none flex flex-col items-center">
                                <AccordionTrigger onClick={handleGuideClick}>
                                    <FancyAccordionButton />
                                </AccordionTrigger>
                                <AccordionContent className="pt-6 w-full">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="font-headline">{resumeBuilderGuide.title}</CardTitle>
                                            <CardDescription>{resumeBuilderGuide.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                                {resumeBuilderGuide.steps.map((step, stepIndex) => (
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
        </FormProvider>
    );
}
