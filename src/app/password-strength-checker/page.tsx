
"use client"

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, ShieldCheck, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

type StrengthCheck = {
    text: string;
    passed: boolean;
};

export default function PasswordStrengthCheckerPage() {
    const [password, setPassword] = useState('');
    const passwordStrengthGuide = guides.find(g => g.href.includes('password-strength-checker'));
    
    const strength = useMemo(() => {
        let score = 0;
        const checks: StrengthCheck[] = [];

        // Length Check
        if (password.length >= 8) {
            score++;
            checks.push({ text: "At least 8 characters long", passed: true });
        } else {
            checks.push({ text: "At least 8 characters long", passed: false });
        }

        // Uppercase Check
        if (/[A-Z]/.test(password)) {
            score++;
            checks.push({ text: "Contains an uppercase letter", passed: true });
        } else {
            checks.push({ text: "Contains an uppercase letter", passed: false });
        }

        // Lowercase Check
        if (/[a-z]/.test(password)) {
            score++;
            checks.push({ text: "Contains a lowercase letter", passed: true });
        } else {
            checks.push({ text: "Contains a lowercase letter", passed: false });
        }
        
        // Number Check
        if (/\d/.test(password)) {
            score++;
            checks.push({ text: "Contains a number", passed: true });
        } else {
            checks.push({ text: "Contains a number", passed: false });
        }

        // Symbol Check
        if (/[^A-Za-z0-9]/.test(password)) {
            score++;
            checks.push({ text: "Contains a special character", passed: true });
        } else {
            checks.push({ text: "Contains a special character", passed: false });
        }

        return { score, checks };
    }, [password]);

    const getStrengthLabel = () => {
        switch (strength.score) {
            case 0:
            case 1:
                return 'Very Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Moderate';
            case 4:
                return 'Strong';
            case 5:
                return 'Very Strong';
            default:
                return '';
        }
    };
    
    const getStrengthColor = () => {
        switch (strength.score) {
            case 0:
            case 1:
                return 'bg-red-500';
            case 2:
                return 'bg-orange-500';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-blue-500';
            case 5:
                return 'bg-green-500';
            default:
                return 'bg-muted';
        }
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                           <ShieldCheck className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Password Strength Checker</CardTitle>
                        <CardDescription>Test the strength of your password.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a password to test"
                            className="text-lg font-mono text-center"
                        />
                        
                        {password && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Progress value={strength.score * 20} className={`h-3 ${getStrengthColor()}`} />
                                    <span className="font-semibold whitespace-nowrap">{getStrengthLabel()}</span>
                                </div>
                                <Card className="p-4 bg-muted/50">
                                    <ul className="space-y-2">
                                        {strength.checks.map((check, index) => (
                                            <li key={index} className={`flex items-center gap-2 text-sm ${check.passed ? 'text-green-600' : 'text-muted-foreground'}`}>
                                                {check.passed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                                <span>{check.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>

                 {passwordStrengthGuide && (
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
                                        <CardTitle className="font-headline">{passwordStrengthGuide.title}</CardTitle>
                                        <CardDescription>{passwordStrengthGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {passwordStrengthGuide.steps.map((step, stepIndex) => (
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
