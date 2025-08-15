
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from "lucide-react";

export default function AgeCalculatorPage() {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
    const [error, setError] = useState('');

    const calculateAge = () => {
        setError('');
        if (!birthDate) {
            setError('Please enter your date of birth.');
            return;
        }

        const today = new Date();
        const birth = new Date(birthDate);

        if (birth > today) {
            setError('Date of birth cannot be in the future.');
            setAge(null);
            return;
        }
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
        
        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }

        setAge({ years, months, days });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold font-headline">Age Calculator</CardTitle>
                        <CardDescription>Find out your exact age, down to the day.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="pl-10"
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        <Button onClick={calculateAge} size="lg" className="w-full">Calculate Age</Button>
                        
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        {age && (
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold">{age.years}</CardTitle>
                                        <p className="text-muted-foreground">Years</p>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold">{age.months}</CardTitle>
                                        <p className="text-muted-foreground">Months</p>
                                    </CardHeader>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-4xl font-bold">{age.days}</CardTitle>
                                        <p className="text-muted-foreground">Days</p>
                                    </CardHeader>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
