
"use client"

import { useFormContext } from 'react-hook-form';
import type { ResumeData } from './form';
import type { FontFamily } from '@/app/resume-builder/page';
import { ProfessionalTemplate } from './professional-template';
import { ModernTemplate } from './modern-template';
import { MinimalistTemplate } from './minimalist-template';
import { ClassicTemplate } from './classic-template';
import { CreativeTemplate } from './creative-template';
import { TechnicalTemplate } from './technical-template';

export type TemplateName = "professional" | "modern" | "minimalist" | "classic" | "creative" | "technical";

interface ResumeTemplateProps {
    template: TemplateName;
    accentColor: string;
    fontSize: number;
    fontFamily: FontFamily;
    lineHeight: number;
    showEmail: boolean;
    showPhone: boolean;
    showAddress: boolean;
    showPhoto: boolean;
}

export function ResumeTemplate({ template, ...customization }: ResumeTemplateProps) {
    const { watch } = useFormContext<ResumeData>();
    const data = watch();

    const fontClasses: Record<FontFamily, string> = {
        sans: 'font-sans',
        serif: 'font-serif',
        mono: 'font-mono',
    }

    const commonProps = { data, ...customization };

    const renderTemplate = () => {
        switch (template) {
            case 'modern':
                return <ModernTemplate {...commonProps} />;
            case 'minimalist':
                return <MinimalistTemplate {...commonProps} />;
            case 'classic':
                return <ClassicTemplate {...commonProps} />;
            case 'creative':
                return <CreativeTemplate {...commonProps} />;
            case 'technical':
                return <TechnicalTemplate {...commonProps} />;
            case 'professional':
            default:
                return <ProfessionalTemplate {...commonProps} />;
        }
    }

    return (
        <div 
            id="resume-preview" 
            className={`w-[816px] h-[1056px] bg-background text-foreground p-10 ${fontClasses[customization.fontFamily]}`}
            style={{ 
                fontSize: `${customization.fontSize}pt`,
                lineHeight: customization.lineHeight,
                color: 'hsl(var(--foreground))',
                backgroundColor: 'hsl(var(--background))'
            }}
        >
            {renderTemplate()}
        </div>
    );
}
