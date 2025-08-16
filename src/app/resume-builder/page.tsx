
"use client"

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import { ResumeForm, resumeSchema, type ResumeData } from '@/components/resume-form';
import { ResumeTemplate } from '@/components/resume-template';
import jsPDF from 'jspdf';
import { guides } from "@/lib/search-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FancyAccordionButton } from '@/components/ui/fancy-accordion-button';

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

export default function ResumeBuilderPage() {
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
                scale: 0.75, // Adjust scale to fit A4 page. 0.75 is a good starting point.
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
                    <p className="text-muted-foreground mt-2 text-lg">Create a professional resume in minutes.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Information</CardTitle>
                            <CardDescription>Fill out the form below to build your resume.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResumeForm />
                        </CardContent>
                    </Card>

                    <div className="space-y-4 lg:sticky lg:top-24">
                        <Button onClick={handleDownloadPdf} className="w-full" size="lg">
                            <Download className="mr-2" /> Download as PDF
                        </Button>
                        <Card className="overflow-hidden">
                            <div id="resume-preview-container" className="h-[792px] w-full overflow-y-auto bg-background shadow-lg">
                                <ResumeTemplate />
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