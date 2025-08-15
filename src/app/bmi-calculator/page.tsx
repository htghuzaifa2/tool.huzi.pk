
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BmiCalculatorPage() {
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    
    // Metric state
    const [heightCm, setHeightCm] = useState('');
    const [weightKg, setWeightKg] = useState('');

    // Imperial state
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [weightLbs, setWeightLbs] = useState('');

    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [error, setError] = useState('');

    const calculateBmi = () => {
        setError('');
        setBmi(null);
        setBmiCategory('');

        let height = 0;
        let weight = 0;

        if (unit === 'metric') {
            const h = parseFloat(heightCm);
            const w = parseFloat(weightKg);
            if (h > 0 && w > 0) {
                height = h / 100; // convert cm to meters
                weight = w;
            } else {
                setError('Please enter valid height and weight.');
                return;
            }
        } else { // Imperial
            const ft = parseFloat(heightFt);
            const inch = parseFloat(heightIn) || 0;
            const lbs = parseFloat(weightLbs);
            if (ft > 0 && lbs > 0) {
                height = (ft * 12) + inch;
                weight = lbs;
            } else {
                setError('Please enter valid height and weight.');
                return;
            }
        }

        const bmiValue = unit === 'metric' 
            ? weight / (height * height) 
            : (weight / (height * height)) * 703;

        setBmi(bmiValue);
        setBmiCategory(getBmiCategory(bmiValue));
    };

    const getBmiCategory = (bmi: number) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
        if (bmi >= 25 && bmi < 29.9) return 'Overweight';
        return 'Obesity';
    };
    
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Underweight': return 'text-blue-500';
            case 'Normal weight': return 'text-green-500';
            case 'Overweight': return 'text-yellow-500';
            case 'Obesity': return 'text-red-500';
            default: return '';
        }
    }


    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold font-headline">BMI Calculator</CardTitle>
                        <CardDescription>Calculate your Body Mass Index.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs defaultValue="metric" onValueChange={(value) => setUnit(value as 'metric' | 'imperial')} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="metric">Metric</TabsTrigger>
                                <TabsTrigger value="imperial">Imperial</TabsTrigger>
                            </TabsList>
                            <TabsContent value="metric" className="space-y-4 pt-4">
                                <Input type="number" placeholder="Height (cm)" value={heightCm} onChange={e => setHeightCm(e.target.value)} />
                                <Input type="number" placeholder="Weight (kg)" value={weightKg} onChange={e => setWeightKg(e.target.value)} />
                            </TabsContent>
                            <TabsContent value="imperial" className="space-y-4 pt-4">
                               <div className="flex gap-4">
                                 <Input type="number" placeholder="Height (ft)" value={heightFt} onChange={e => setHeightFt(e.target.value)} />
                                 <Input type="number" placeholder="Height (in)" value={heightIn} onChange={e => setHeightIn(e.target.value)} />
                               </div>
                                <Input type="number" placeholder="Weight (lbs)" value={weightLbs} onChange={e => setWeightLbs(e.target.value)} />
                            </TabsContent>
                        </Tabs>

                        <Button onClick={calculateBmi} size="lg" className="w-full">Calculate BMI</Button>

                        {error && <p className="text-red-500 text-center">{error}</p>}
                        
                        {bmi !== null && (
                            <Card className="text-center p-6 bg-muted">
                                <p className="text-lg text-muted-foreground">Your BMI is</p>
                                <p className="text-5xl font-bold">{bmi.toFixed(1)}</p>
                                <p className={`text-2xl font-semibold ${getCategoryColor(bmiCategory)}`}>{bmiCategory}</p>
                            </Card>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
