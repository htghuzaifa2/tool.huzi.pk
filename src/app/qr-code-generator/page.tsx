
"use client"

import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Text } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, text, and more.',
};

export default function QRCodeGeneratorPage() {
    const [text, setText] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (text) {
            QRCode.toDataURL(text, {
                width: 256,
                margin: 2,
                errorCorrectionLevel: 'H'
            })
            .then(url => {
                setQrCodeUrl(url);
            })
            .catch(err => {
                console.error(err);
            });
        } else {
            setQrCodeUrl('');
        }
    }, [text]);

    const handleDownload = () => {
        if (qrCodeUrl) {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold font-headline">QR Code Generator</CardTitle>
                        <CardDescription>Enter text or a URL to generate a QR code.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="relative">
                            <Text className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Enter text or URL"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        
                        {qrCodeUrl && (
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <img src={qrCodeUrl} alt="Generated QR Code" width="256" height="256" />
                                </div>
                                <Button onClick={handleDownload}>
                                    <Download className="mr-2 h-5 w-5" />
                                    Download QR Code
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
