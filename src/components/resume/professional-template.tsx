
"use client"

import { Mail, Phone, MapPin } from 'lucide-react';
import type { ResumeData } from './form';
import type { FontFamily } from '@/app/resume-builder/page';

interface TemplateProps {
    data: ResumeData;
    accentColor: string;
    fontSize: number;
    fontFamily: FontFamily;
}

export function ProfessionalTemplate({ data, accentColor }: TemplateProps) {
    const renderDescription = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.trim() === '') return null;
            return <li key={index} className="text-muted-foreground/80 leading-snug">{line.replace(/^-/, '').trim()}</li>
        });
    };

    return (
        <div>
            {/* Header */}
            <div className="text-center border-b-2 pb-4 mb-6" style={{ borderColor: accentColor }}>
                <h1 className="text-4xl font-bold tracking-tight" style={{ color: accentColor }}>{data.fullName || 'Your Name'}</h1>
                <h2 className="text-xl font-semibold text-muted-foreground mt-1">{data.jobTitle || 'Your Job Title'}</h2>
                <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
                    {data.email && <span className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: accentColor }}/>{data.email}</span>}
                    {data.phone && <span className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: accentColor }}/>{data.phone}</span>}
                    {data.address && <span className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: accentColor }}/>{data.address}</span>}
                </div>
            </div>

            {/* Summary */}
            {data.summary && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold uppercase pb-2 mb-2" style={{ color: accentColor, borderBottomColor: accentColor, borderBottomWidth: '1px' }}>Summary</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{data.summary}</p>
                </div>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold uppercase pb-2 mb-3" style={{ color: accentColor, borderBottomColor: accentColor, borderBottomWidth: '1px' }}>Experience</h3>
                    <div className="space-y-4">
                        {data.experience?.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="text-base font-bold text-foreground">{exp.jobTitle}</h4>
                                    <p className="text-sm text-muted-foreground font-medium">{exp.startDate} - {exp.endDate}</p>
                                </div>
                                <p className="text-base font-semibold text-foreground/80">{exp.company}</p>
                                <ul className="list-disc list-outside mt-2 pl-5 space-y-1">
                                    {renderDescription(exp.description)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
             {data.education && data.education.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-bold uppercase pb-2 mb-3" style={{ color: accentColor, borderBottomColor: accentColor, borderBottomWidth: '1px' }}>Education</h3>
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
            )}

            {/* Skills */}
            {data.skills && (
                <div>
                    <h3 className="text-lg font-bold uppercase pb-2 mb-2" style={{ color: accentColor, borderBottomColor: accentColor, borderBottomWidth: '1px' }}>Skills</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{data.skills}</p>
                </div>
            )}
        </div>
    );
}

