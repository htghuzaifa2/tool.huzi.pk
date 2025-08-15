
"use client"

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCw } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Password Generator',
    description: 'Generate strong, secure, and random passwords.',
};

export default function PasswordGeneratorPage() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const { toast } = useToast();

    const generatePassword = useCallback(() => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let charset = '';
        if (includeUppercase) charset += upper;
        if (includeLowercase) charset += lower;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;
        
        if (!charset) {
            toast({
                title: "Error",
                description: "Please select at least one character type.",
                variant: "destructive"
            });
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);
    
    useState(generatePassword)

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password);
            toast({
                title: "Copied!",
                description: "Password copied to clipboard.",
            });
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold font-headline">Password Generator</CardTitle>
                        <CardDescription>Create strong and secure passwords.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="relative">
                            <Input
                                type="text"
                                value={password}
                                readOnly
                                placeholder="Your generated password"
                                className="pr-20 text-lg font-mono"
                            />
                            <Button variant="ghost" size="icon" className="absolute right-10 top-1/2 -translate-y-1/2" onClick={generatePassword}>
                                <RefreshCw className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={copyToClipboard}>
                                <Copy className="h-5 w-5" />
                            </Button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                               <Label htmlFor="length">Password Length: <span className="font-bold">{length}</span></Label>
                            </div>
                            <Slider
                                id="length"
                                min={6}
                                max={32}
                                step={1}
                                value={[length]}
                                onValueChange={(value) => setLength(value[0])}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
                                <Label htmlFor="uppercase">Uppercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))} />
                                <Label htmlFor="lowercase">Lowercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
                                <Label htmlFor="numbers">Numbers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
                                <Label htmlFor="symbols">Symbols</Label>
                            </div>
                        </div>
                        
                        <Button onClick={generatePassword} size="lg" className="w-full">
                            <RefreshCw className="mr-2 h-5 w-5" />
                            Generate New Password
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
