
"use client"

import { useFormContext } from 'react-hook-form';
import { ResumeData } from './resume-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export function ResumeTemplate() {
    const { watch } = useFormContext<ResumeData>();
    const data = watch();

    const renderDescription = (text: string) => {
        return text.split('\n').map((line, index) => (
            <li key={index} className="text-gray-600 text-[8px] leading-snug">{line}</li>
        ));
    };

    return (
        <div id="resume-preview" className="p-6 bg-white text-gray-800 font-sans text-[8px] leading-normal w-[450px]">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-300 pb-2 mb-4">
                <h1 className="text-2xl font-bold tracking-wider uppercase">{data.fullName || 'Your Name'}</h1>
                <h2 className="text-md font-semibold text-gray-600">{data.jobTitle || 'Your Job Title'}</h2>
                <div className="flex justify-center items-center gap-4 mt-1 text-gray-500 text-[8px]">
                    {data.email && <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5"/>{data.email}</span>}
                    {data.phone && <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5"/>{data.phone}</span>}
                    {data.address && <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5"/>{data.address}</span>}
                </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
                <h3 className="text-xs font-bold uppercase border-b border-gray-300 pb-1 mb-1">Summary</h3>
                <p className="text-gray-600 text-[8px]">{data.summary || 'A brief professional summary about you...'}</p>
            </div>

            {/* Experience */}
            <div className="mb-4">
                <h3 className="text-xs font-bold uppercase border-b border-gray-300 pb-1 mb-2">Experience</h3>
                <div className="space-y-3">
                    {data.experience?.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-[9px] font-bold">{exp.jobTitle}</h4>
                                <p className="text-gray-500 text-[8px] font-medium">{exp.startDate} - {exp.endDate}</p>
                            </div>
                            <p className="text-[9px] font-semibold text-gray-700">{exp.company}</p>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                                {renderDescription(exp.description)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="mb-4">
                <h3 className="text-xs font-bold uppercase border-b border-gray-300 pb-1 mb-2">Education</h3>
                 <div className="space-y-3">
                    {data.education?.map((edu) => (
                        <div key={edu.id}>
                            <div className="flex justify-between items-baseline">
                                <h4 className="text-[9px] font-bold">{edu.degree}</h4>
                                 <p className="text-gray-500 text-[8px] font-medium">{edu.startDate} - {edu.endDate}</p>
                            </div>
                            <p className="text-[9px] font-semibold text-gray-700">{edu.institution}</p>
                             {edu.description && <p className="text-gray-600 text-[8px] italic mt-0.5">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div>
                <h3 className="text-xs font-bold uppercase border-b border-gray-300 pb-1 mb-1">Skills</h3>
                <p className="text-gray-600 text-[8px]">{data.skills || 'List your skills here, separated by commas.'}</p>
            </div>
        </div>
    );
}

