
"use client"

import { useFormContext } from 'react-hook-form';
import { ResumeData } from './resume-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ResumeTemplate() {
    const { watch } = useFormContext<ResumeData>();
    const data = watch();

    const renderDescription = (text: string) => {
        return text.split('\n').map((line, index) => (
            <li key={index} className="text-muted-foreground text-sm leading-relaxed">{line}</li>
        ));
    };

    return (
        <div id="resume-preview" className="p-8 bg-background text-foreground font-sans w-full min-h-full">
            {/* Header */}
            <div className="text-center border-b-2 border-border pb-4 mb-6">
                <h1 className="text-4xl font-bold tracking-tight text-primary">{data.fullName || 'Your Name'}</h1>
                <h2 className="text-xl font-semibold text-muted-foreground mt-1">{data.jobTitle || 'Your Job Title'}</h2>
                <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
                    {data.email && <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary/80"/>{data.email}</span>}
                    {data.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary/80"/>{data.phone}</span>}
                    {data.address && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary/80"/>{data.address}</span>}
                </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
                <h3 className="text-lg font-bold uppercase text-primary border-b border-border pb-2 mb-2">Summary</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{data.summary || 'A brief professional summary about you...'}</p>
            </div>

            {/* Experience */}
            <div className="mb-6">
                <h3 className="text-lg font-bold uppercase text-primary border-b border-border pb-2 mb-3">Experience</h3>
                <div className="space-y-4">
                    {data.experience?.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-base font-bold text-foreground">{exp.jobTitle}</h4>
                                <p className="text-sm text-muted-foreground font-medium">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-base font-semibold text-foreground/80">{exp.company}</p>
                            <ul className="list-disc list-inside mt-2 pl-2 space-y-1">
                                {renderDescription(exp.description)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="mb-6">
                <h3 className="text-lg font-bold uppercase text-primary border-b border-border pb-2 mb-3">Education</h3>
                 <div className="space-y-4">
                    {data.education?.map((edu) => (
                        <div key={edu.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="text-base font-bold text-foreground">{edu.degree}</h4>
                                 <p className="text-sm text-muted-foreground font-medium">{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p className="text-base font-semibold text-foreground/80">{edu.institution}</p>
                             {edu.description && <p className="text-muted-foreground text-sm italic mt-1">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div>
                <h3 className="text-lg font-bold uppercase text-primary border-b border-border pb-2 mb-2">Skills</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{data.skills || 'List your skills here, separated by commas.'}</p>
            </div>
        </div>
    );
}