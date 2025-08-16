"use client"

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, QrCode, Wifi, Contact, Palette, Settings, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { guides } from "@/lib/search-data";

type QrType = 'text' | 'wifi' | 'vcard';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export default function QRCodeGeneratorPage() {
    const [qrType, setQrType] = useState<QrType>('text');
    
    // Input states
    const [text, setText] = useState('https://tool.huzi.pk');
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [encryption, setEncryption] = useState('WPA');
    const [vcardName, setVcardName] = useState('');
    const [vcardOrg, setVcardOrg] = useState('');
    const [vcardTitle, setVcardTitle] = useState('');
    const [vcardTel, setVcardTel] = useState('');
    const [vcardEmail, setVcardEmail] = useState('');
    const [vcardUrl, setVcardUrl] = useState('');
    
    // Customization states
    const [qrColor, setQrColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [size, setSize] =useState(256);
    const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('H');

    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const { toast } = useToast();
    const qrCodeGuide = guides.find(g => g.href.includes('qr-code-generator'));

    const getQrCodeValue = useCallback(() => {
        switch (qrType) {
            case 'wifi':
                return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
            case 'vcard':
                let vcardString = 'BEGIN:VCARD\nVERSION:3.0\n';
                if(vcardName) vcardString += `FN:${vcardName}\n`;
                if(vcardOrg) vcardString += `ORG:${vcardOrg}\n`;
                if(vcardTitle) vcardString += `TITLE:${vcardTitle}\n`;
                if(vcardTel) vcardString += `TEL;TYPE=WORK,VOICE:${vcardTel}\n`;
                if(vcardEmail) vcardString += `EMAIL:${vcardEmail}\n`;
                if(vcardUrl) vcardString += `URL:${vcardUrl}\n`;
                vcardString += 'END:VCARD';
                return vcardString;
            case 'text':
            default:
                return text;
        }
    }, [qrType, text, ssid, password, encryption, vcardName, vcardOrg, vcardTitle, vcardTel, vcardEmail, vcardUrl]);
    
    useEffect(() => {
        const value = getQrCodeValue();
        if (value) {
            QRCode.toDataURL(value, {
                width: size,
                margin: 2,
                errorCorrectionLevel: errorCorrection,
                color: {
                    dark: qrColor,
                    light: bgColor,
                }
            })
            .then(url => {
                setQrCodeDataUrl(url);
            })
            .catch(err => {
                console.error(err);
                 toast({ title: "Error", description: "Could not generate QR code.", variant: "destructive"});
            });
        } else {
            setQrCodeDataUrl('');
        }
    }, [getQrCodeValue, size, errorCorrection, qrColor, bgColor, toast]);

    const handleDownload = async (format: 'png' | 'svg') => {
        const value = getQrCodeValue();
        if (!value) return;

        try {
            if (format === 'png') {
                 const link = document.createElement('a');
                 link.href = qrCodeDataUrl;
                 link.download = 'qrcode.png';
                 document.body.appendChild(link);
                 link.click();
                 document.body.removeChild(link);
                 link.href = URL.revokeObjectURL(url);
            } else { // svg
                const svgString = await QRCode.toString(value, {
                    type: 'svg',
                    width: size,
                    margin: 2,
                    errorCorrectionLevel: errorCorrection,
                    color: {
                        dark: qrColor,
                        light: bgColor,
                    }
                });
                const blob = new Blob([svgString], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.svg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                link.href = URL.revokeObjectURL(url);
            }
        } catch (err) {
             console.error(err);
             toast({ title: "Download Error", description: "Failed to create download file.", variant: "destructive"});
        }
    };
    
    const inputFields = {
      'text': [
        {label: "Text or URL", value: text, setter: setText, placeholder: "https://tool.huzi.pk"},
      ],
      'wifi': [
        {label: "Network Name (SSID)", value: ssid, setter: setSsid, placeholder: "My_WiFi_Network"},
        {label: "Password", value: password, setter: setPassword, placeholder: "MySecretPassword"},
      ],
      'vcard': [
        {label: "Full Name", value: vcardName, setter: setVcardName, placeholder: "John Doe"},
        {label: "Organization", value: vcardOrg, setter: setVcardOrg, placeholder: "Doe Corp"},
        {label: "Job Title", value: vcardTitle, setter: setVcardTitle, placeholder: "CEO"},
        {label: "Phone Number", value: vcardTel, setter: setVcardTel, placeholder: "+1-202-555-0104"},
        {label: "Email", value: vcardEmail, setter: setVcardEmail, placeholder: "john.doe@example.com"},
        {label: "Website", value: vcardUrl, setter: setVcardUrl, placeholder: "www.example.com"},
      ]
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <QrCode className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">QR Code Generator</CardTitle>
                        <CardDescription>Generate customizable QR codes for text, URLs, WiFi, and more.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                            <Tabs value={qrType} onValueChange={(v) => setQrType(v as QrType)} className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="text">&lt;QrCode className="mr-2"/&gt;Text/URL</TabsTrigger>
                                    <TabsTrigger value="wifi">&lt;Wifi className="mr-2"/&gt;WiFi</TabsTrigger>
                                    <TabsTrigger value="vcard">&lt;Contact className="mr-2"/&gt;vCard</TabsTrigger>
                                </TabsList>
                                <TabsContent value="text" className="pt-4 space-y-4">
                                  {inputFields.text.map(field => &lt;div key={field.label}&gt;&lt;Label&gt;{field.label}&lt;/Label&gt;&lt;Input placeholder={field.placeholder} value={field.value} onChange={(e) =&gt; field.setter(e.target.value)} /&gt;&lt;/div&gt;)}
                                </TabsContent>
                                <TabsContent value="wifi" className="pt-4 space-y-4">
                                  {inputFields.wifi.map(field => &lt;div key={field.label}&gt;&lt;Label&gt;{field.label}&lt;/Label&gt;&lt;Input placeholder={field.placeholder} value={field.value} onChange={(e) =&gt; field.setter(e.target.value)} /&gt;&lt;/div&gt;)}
                                  &lt;div&gt;
                                    &lt;Label&gt;Encryption&lt;/Label&gt;
                                    &lt;Select value={encryption} onValueChange={setEncryption}&gt;
                                        &lt;SelectTrigger&gt;&lt;SelectValue/&gt;&lt;/SelectTrigger&gt;
                                        &lt;SelectContent&gt;
                                            &lt;SelectItem value="WPA"&gt;WPA/WPA2&lt;/SelectItem&gt;
                                            &lt;SelectItem value="WEP"&gt;WEP&lt;/SelectItem&gt;
                                            &lt;SelectItem value="nopass"&gt;None&lt;/SelectItem&gt;
                                        &lt;/SelectContent&gt;
                                    &lt;/Select&gt;
                                  &lt;/div&gt;
                                </TabsContent>
                                <TabsContent value="vcard" className="pt-4 space-y-4">
                                  {inputFields.vcard.map(field => &lt;div key={field.label}&gt;&lt;Label&gt;{field.label}&lt;/Label&gt;&lt;Input placeholder={field.placeholder} value={field.value} onChange={(e) =&gt; field.setter(e.target.value)} /&gt;&lt;/div&gt;)}
                                </TabsContent>
                            </Tabs>
                            &lt;Accordion type="single" collapsible className="w-full"&gt;
                              &lt;AccordionItem value="item-1"&gt;
                                &lt;AccordionTrigger&gt;&lt;Palette className="mr-2" /&gt;Colors&lt;/AccordionTrigger&gt;
                                &lt;AccordionContent className="grid grid-cols-2 gap-4 pt-2"&gt;
                                  &lt;div className="space-y-2"&gt;
                                    &lt;Label htmlFor="qr-color"&gt;QR Code Color&lt;/Label&gt;
                                    &lt;Input id="qr-color" type="color" value={qrColor} onChange={(e) =&gt; setQrColor(e.target.value)} className="h-12"/&gt;
                                  &lt;/div&gt;
                                   &lt;div className="space-y-2"&gt;
                                    &lt;Label htmlFor="bg-color"&gt;Background Color&lt;/Label&gt;
                                    &lt;Input id="bg-color" type="color" value={bgColor} onChange={(e) =&gt; setBgColor(e.target.value)} className="h-12"/&gt;
                                  &lt;/div&gt;
                                &lt;/AccordionContent&gt;
                              &lt;/AccordionItem&gt;
                              &lt;AccordionItem value="item-2"&gt;
                                &lt;AccordionTrigger&gt;&lt;Settings className="mr-2" /&gt;Options&lt;/AccordionTrigger&gt;
                                &lt;AccordionContent className="space-y-4 pt-2"&gt;
                                  &lt;div className="space-y-2"&gt;
                                    &lt;Label&gt;Size: {size}px&lt;/Label&gt;
                                    &lt;Input type="range" min="64" max="1024" step="8" value={size} onChange={e =&gt; setSize(Number(e.target.value))} /&gt;
                                  &lt;/div&gt;
                                  &lt;div className="space-y-2"&gt;
                                    &lt;Label&gt;Error Correction&lt;/Label&gt;
                                    &lt;Select value={errorCorrection} onValueChange={(v) =&gt; setErrorCorrection(v as ErrorCorrectionLevel)}&gt;
                                        &lt;SelectTrigger&gt;&lt;SelectValue/&gt;&lt;/SelectTrigger&gt;
                                        &lt;SelectContent&gt;
                                            &lt;SelectItem value="L"&gt;Low (L)&lt;/SelectItem&gt;
                                            &lt;SelectItem value="M"&gt;Medium (M)&lt;/SelectItem&gt;
                                            &lt;SelectItem value="Q"&gt;Quartile (Q)&lt;/SelectItem&gt;
                                            &lt;SelectItem value="H"&gt;High (H)&lt;/SelectItem&gt;
                                        &lt;/SelectContent&gt;
                                    &lt;/Select&gt;
                                  &lt;/div&gt;
                                &lt;/AccordionContent&gt;
                              &lt;/AccordionItem&gt;
                            &lt;/Accordion&gt;
                        &lt;/div&gt;
                        &lt;div className="space-y-4"&gt;
                           {qrCodeDataUrl && (
                                &lt;div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-muted"&gt;
                                    &lt;div className="p-4 bg-white rounded-lg shadow-md" style={{backgroundColor: bgColor}}&gt;
                                        &lt;img src={qrCodeDataUrl} alt="Generated QR Code" width={256} height={256} /&gt;
                                    &lt;/div&gt;
                                    &lt;div className="flex gap-4"&gt;
                                        &lt;Button onClick={() =&gt; handleDownload('png')}&gt;
                                            &lt;Download className="mr-2" /&gt; Download PNG
                                        &lt;/Button&gt;
                                        &lt;Button onClick={() =&gt; handleDownload('svg')} variant="secondary"&gt;
                                            &lt;Download className="mr-2" /&gt; Download SVG
                                        &lt;/Button&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                            )}
                        &lt;/div&gt;
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                {qrCodeGuide && (
                    &lt;Accordion type="single" collapsible className="w-full"&gt;
                        &lt;AccordionItem value="guide" className="border-none flex flex-col items-center"&gt;
                            &lt;AccordionTrigger&gt;
                                &lt;Button variant="outline" className="w-fit"&gt;
                                    &lt;BookOpen className="mr-2 h-5 w-5"/&gt;Read The Guide
                                &lt;/Button&gt;
                            &lt;/AccordionTrigger&gt;
                            &lt;AccordionContent className="pt-6 w-full"&gt;
                                &lt;Card&gt;
                                    &lt;CardHeader&gt;
                                        &lt;CardTitle className="font-headline"&gt;{qrCodeGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{qrCodeGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {qrCodeGuide.steps.map((step, stepIndex) =&gt; (
                                                &lt;li key={stepIndex}&gt;{step}&lt;/li&gt;
                                            ))}
                                        &lt;/ol&gt;
                                    &lt;/CardContent&gt;
                                &lt;/Card&gt;
                            &lt;/AccordionContent&gt;
                        &lt;/AccordionItem&gt;
                    &lt;/Accordion&gt;
                )}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}
