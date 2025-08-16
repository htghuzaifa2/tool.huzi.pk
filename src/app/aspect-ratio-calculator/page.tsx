
"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Ratio, RefreshCw } from 'lucide-react';

// Function to remove trailing zeros and the decimal point if not needed
const formatNumber = (num: number) => {
    return num.toFixed(2).replace(/\.00$/, '').replace(/(\.\d*?)0+$/, '$1');
};

export default function AspectRatioCalculatorPage() {
    const [originalWidth, setOriginalWidth] = useState('1920');
    const [originalHeight, setOriginalHeight] = useState('1080');
    const [newWidth, setNewWidth] = useState('');
    const [newHeight, setNewHeight] = useState('');
    const [lastChanged, setLastChanged] = useState<'width' | 'height' | null>(null);

    useEffect(() => {
        const ow = parseFloat(originalWidth);
        const oh = parseFloat(originalHeight);

        if (ow > 0 && oh > 0) {
            if (lastChanged === 'width') {
                const nw = parseFloat(newWidth);
                if (nw > 0) {
                    const calculatedHeight = (nw * oh) / ow;
                    setNewHeight(formatNumber(calculatedHeight));
                } else {
                    setNewHeight('');
                }
            } else if (lastChanged === 'height') {
                const nh = parseFloat(newHeight);
                if (nh > 0) {
                    const calculatedWidth = (nh * ow) / oh;
                    setNewWidth(formatNumber(calculatedWidth));
                } else {
                    setNewWidth('');
                }
            }
        }
    }, [originalWidth, originalHeight, newWidth, newHeight, lastChanged]);
    
    const handleReset = () => {
        setOriginalWidth('1920');
        setOriginalHeight('1080');
        setNewWidth('');
        setNewHeight('');
        setLastChanged(null);
    }
    
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setter(value);
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Ratio className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Aspect Ratio Calculator</CardTitle>
                        <CardDescription>Calculate dimensions while maintaining an image’s aspect ratio.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <Card className="p-6 bg-muted/50">
                            <CardTitle className="text-xl mb-4">Original Dimensions</CardTitle>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-full space-y-2">
                                    <label htmlFor="orig-w" className="text-sm font-medium">Width</label>
                                    <Input id="orig-w" type="text" placeholder="e.g., 1920" value={originalWidth} onChange={(e) => handleInputChange(setOriginalWidth, e.target.value)} />
                                </div>
                                <span className="font-bold text-2xl md:pt-6">:</span>
                                <div className="w-full space-y-2">
                                    <label htmlFor="orig-h" className="text-sm font-medium">Height</label>
                                    <Input id="orig-h" type="text" placeholder="e.g., 1080" value={originalHeight} onChange={(e) => handleInputChange(setOriginalHeight, e.target.value)} />
                                </div>
                            </div>
                        </Card>
                        
                        <Card className="p-6">
                             <CardTitle className="text-xl mb-4">New Dimensions</CardTitle>
                             <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-full space-y-2">
                                    <label htmlFor="new-w" className="text-sm font-medium">Width</label>
                                    <Input 
                                        id="new-w" 
                                        type="text" 
                                        placeholder="Enter new width"
                                        value={newWidth} 
                                        onChange={(e) => { handleInputChange(setNewWidth, e.target.value); setLastChanged('width'); }}
                                    />
                                </div>
                                <span className="font-bold text-2xl md:pt-6">=</span>
                                <div className="w-full space-y-2">
                                    <label htmlFor="new-h" className="text-sm font-medium">Height</label>
                                     <Input 
                                        id="new-h" 
                                        type="text" 
                                        placeholder="Enter new height"
                                        value={newHeight} 
                                        onChange={(e) => { handleInputChange(setNewHeight, e.target.value); setLastChanged('height'); }}
                                    />
                                </div>
                            </div>
                        </Card>

                        <div className="text-center">
                            <Button variant="outline" onClick={handleReset}>
                                <RefreshCw className="mr-2 h-4 w-4" /> Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
