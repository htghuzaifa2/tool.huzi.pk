
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Copy, Palette } from 'lucide-react';

// Color conversion utilities
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}


export default function ColorPickerPage() {
    const [color, setColor] = useState('#3F51B5');
    const { toast } = useToast();
    
    const rgb = hexToRgb(color);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'N/A';
    const hslString = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : 'N/A';

    const copyToClipboard = (text: string, format: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard!",
            description: `${format} code ${text} copied.`,
        });
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Palette className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Color Picker</CardTitle>
                        <CardDescription>Select a color and get its codes instantly.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="h-48 w-full rounded-lg border shadow-inner" style={{ backgroundColor: color }}></div>
                        
                        <div className="flex items-center gap-4">
                            <label htmlFor="color-picker" className="font-medium">Pick a color:</label>
                            <Input
                                id="color-picker"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="h-12 w-24 p-1 cursor-pointer"
                            />
                        </div>
                        
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">HEX</p>
                                        <p className="font-mono text-muted-foreground">{color}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(color, 'HEX')}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">RGB</p>
                                        <p className="font-mono text-muted-foreground">{rgbString}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(rgbString, 'RGB')}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardContent className="p-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">HSL</p>
                                        <p className="font-mono text-muted-foreground">{hslString}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(hslString, 'HSL')}>
                                        <Copy className="h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
