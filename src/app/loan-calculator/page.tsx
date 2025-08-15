
"use client"

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Banknote } from "lucide-react";

const COLORS = ['#3F51B5', '#E53935']; // Primary and a contrasting color for interest

export default function LoanCalculatorPage() {
    const [loanAmount, setLoanAmount] = useState(10000);
    const [interestRate, setInterestRate] = useState(5);
    const [loanTerm, setLoanTerm] = useState(5);

    const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
        const principal = parseFloat(String(loanAmount));
        const rate = parseFloat(String(interestRate)) / 100 / 12;
        const term = parseFloat(String(loanTerm)) * 12;

        if (principal > 0 && rate > 0 && term > 0) {
            const monthly = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
            const total = monthly * term;
            const interest = total - principal;
            return {
                monthlyPayment: monthly.toFixed(2),
                totalPayment: total.toFixed(2),
                totalInterest: interest.toFixed(2),
            };
        }
        return { monthlyPayment: '0.00', totalPayment: '0.00', totalInterest: '0.00' };
    }, [loanAmount, interestRate, loanTerm]);
    
    const chartData = [
        { name: 'Principal', value: parseFloat(String(loanAmount)) },
        { name: 'Interest', value: parseFloat(totalInterest) },
    ];
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                 <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Banknote className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Loan Calculator</CardTitle>
                        <CardDescription>Estimate your monthly loan payments and total cost.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="amount">Loan Amount: <span className="font-bold">{formatCurrency(loanAmount)}</span></Label>
                                <Slider id="amount" value={[loanAmount]} onValueChange={(val) => setLoanAmount(val[0])} min={1000} max={100000} step={1000} />
                            </div>
                            <div>
                                <Label htmlFor="interest">Interest Rate (%): <span className="font-bold">{interestRate.toFixed(2)}</span></Label>
                                <Slider id="interest" value={[interestRate]} onValueChange={(val) => setInterestRate(val[0])} min={0.1} max={20} step={0.1} />
                            </div>
                            <div>
                                <Label htmlFor="term">Loan Term (Years): <span className="font-bold">{loanTerm}</span></Label>
                                <Slider id="term" value={[loanTerm]} onValueChange={(val) => setLoanTerm(val[0])} min={1} max={30} step={1} />
                            </div>

                            <Card className="bg-muted p-6">
                                <CardTitle className="text-lg mb-4">Results</CardTitle>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Monthly Payment</span>
                                        <span className="font-bold">{formatCurrency(parseFloat(monthlyPayment))}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Payment</span>
                                        <span className="font-bold">{formatCurrency(parseFloat(totalPayment))}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Total Interest</span>
                                        <span className="font-bold">{formatCurrency(parseFloat(totalInterest))}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
