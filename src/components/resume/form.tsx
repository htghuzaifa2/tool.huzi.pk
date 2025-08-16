
"use client"

import { useFormContext, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Label } from '../ui/label';

export const resumeSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    summary: z.string().optional(),
    experience: z.array(z.object({
        id: z.string(),
        jobTitle: z.string().min(1, 'Job title is required'),
        company: z.string().min(1, 'Company is required'),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string(),
    })).optional(),
    education: z.array(z.object({
        id: z.string(),
        degree: z.string().min(1, 'Degree is required'),
        institution: z.string().min(1, 'Institution is required'),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string().optional(),
    })).optional(),
    skills: z.string().optional(),
});

export type ResumeData = z.infer<typeof resumeSchema>;

export function ResumeForm() {
    const { register, control, formState: { errors } } = useFormContext<ResumeData>();

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
        control,
        name: "experience",
    });

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "education",
    });
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle className="text-xl">Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input placeholder="John Doe" {...register('fullName')} />
                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                    </div>
                    <div>
                        <Label>Job Title</Label>
                        <Input placeholder="Software Engineer" {...register('jobTitle')} />
                        {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle.message}</p>}
                    </div>
                    <div>
                        <Label>Email Address</Label>
                        <Input placeholder="john.doe@example.com" {...register('email')} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                     <div>
                        <Label>Phone Number</Label>
                        <Input placeholder="123-456-7890" {...register('phone')} />
                    </div>
                     <div>
                        <Label>Address or Location</Label>
                        <Input placeholder="Anytown, USA" {...register('address')} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-xl">Professional Summary</CardTitle></CardHeader>
                <CardContent>
                    <Textarea placeholder="Write a brief summary about yourself..." {...register('summary')} className="min-h-[120px]" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-xl">Work Experience</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {experienceFields.map((field, index) => (
                        <div key={field.id} className="p-4 border rounded-md space-y-3 relative">
                             <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                            <Input placeholder="Job Title" {...register(`experience.${index}.jobTitle`)} />
                            <Input placeholder="Company" {...register(`experience.${index}.company`)} />
                             <div className="flex gap-4">
                                <Input placeholder="Start Date (e.g., Jan 2020)" {...register(`experience.${index}.startDate`)} />
                                <Input placeholder="End Date (e.g., Present)" {...register(`experience.${index}.endDate`)} />
                            </div>
                            <Textarea placeholder="Description of your role and achievements. Use a new line for each point." {...register(`experience.${index}.description`)} className="min-h-[100px]" />
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendExperience({ id: Date.now().toString(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}>
                        <PlusCircle className="mr-2" /> Add Experience
                    </Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader><CardTitle className="text-xl">Education</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {educationFields.map((field, index) => (
                         <div key={field.id} className="p-4 border rounded-md space-y-3 relative">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                            <Input placeholder="Degree or Certificate" {...register(`education.${index}.degree`)} />
                            <Input placeholder="Institution Name" {...register(`education.${index}.institution`)} />
                            <div className="flex gap-4">
                                <Input placeholder="Start Date" {...register(`education.${index}.startDate`)} />
                                <Input placeholder="End Date" {...register(`education.${index}.endDate`)} />
                            </div>
                             <Textarea placeholder="Optional description (e.g., relevant coursework)" {...register(`education.${index}.description`)} />
                        </div>
                    ))}
                     <Button type="button" variant="outline" onClick={() => appendEducation({ id: Date.now().toString(), degree: '', institution: '', startDate: '', endDate: '', description: '' })}>
                        <PlusCircle className="mr-2" /> Add Education
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="text-xl">Skills</CardTitle></CardHeader>
                <CardContent>
                    <Textarea placeholder="Enter your skills, separated by commas..." {...register('skills')} />
                </CardContent>
            </Card>
        </div>
    );
}

