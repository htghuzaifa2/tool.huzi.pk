
"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Binary } from "lucide-react";

type Base = '2' | '8' | '10' | '16';
const baseOptions: { value: Base; label: string }[] = [
    { value: '2', label: 'Binary' },
    { value: '8', label: 'Octal' },
    { value: '10', label: 'Decimal' },
    { value: '16', label: 'Hexadecimal' },
];

const baseValidationRegex: Record<Base, RegExp> = {
    '2': /^[01]*$/,
    '8': /^[0-7]*$/,
    '10': /^[0-9]*$/,
    '16': /^[0-9a-fA-F]*$/,
};

export default function BaseConverterPage() {
    const [inputValue, setInputValue] = useState("1010");
    const [fromBase, setFromBase] = useState<Base>('2');
    const [toBase, setToBase] = useState<Base>('10');
    const [result, setResult] = useState("");

    useEffect(() => {
        if (!inputValue.trim() || !baseValidationRegex[fromBase].test(inputValue)) {
            setResult("Invalid input for this base");
            return;
        }

        try {
            const decimalValue = parseInt(inputValue, parseInt(fromBase));
            if (isNaN(decimalValue)) {
                setResult("Invalid input");
                return;
            }
            const convertedValue = decimalValue.toString(parseInt(toBase)).toUpperCase();
            setResult(convertedValue);
        } catch (error) {
            setResult("Conversion error");
        }
    }, [inputValue, fromBase, toBase]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (baseValidationRegex[fromBase].test(value)) {
            setInputValue(value);
        }
    };
    
    const handleSwapBases = () => {
        const oldFrom = fromBase;
        setFromBase(toBase);
        setToBase(oldFrom);
        setInputValue(result);
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                         <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Binary className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Base Converter</CardTitle>
                        <CardDescription>Convert numbers between binary, octal, decimal, and hexadecimal.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
                            <div className="w-full space-y-2">
                                <label className="text-sm font-medium">From</label>
                                <Input
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="text-lg font-mono"
                                />
                                <Select value={fromBase} onValueChange={(v) => { setFromBase(v as Base); setInputValue('') }}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {baseOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:pt-8">
                                <Button variant="ghost" size="icon" onClick={handleSwapBases}>
                                    <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
                                </Button>
                            </div>

                            <div className="w-full space-y-2">
                                <label className="text-sm font-medium">To</label>
                                <Input type="text" value={result} readOnly className="text-lg font-bold bg-muted font-mono" />
                                <Select value={toBase} onValueChange={(v) => setToBase(v as Base)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {baseOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
