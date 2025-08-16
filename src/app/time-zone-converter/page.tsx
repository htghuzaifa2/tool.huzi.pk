"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, Trash2, Globe, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

const timeZoneNames = Intl.supportedValuesOf('timeZone');

type SelectedZone = {
    id: number;
    timeZone: string;
};

export default function TimeZoneConverterPage() {
    const [selectedZones, setSelectedZones] = useState<SelectedZone[]>([
        { id: 1, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    ]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const timeZoneConverterGuide = guides.find(g => g.href.includes('time-zone-converter'));

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAddTimeZone = () => {
        const newZone: SelectedZone = {
            id: Date.now(),
            timeZone: 'UTC',
        };
        setSelectedZones([...selectedZones, newZone]);
    };
    
    const handleRemoveTimeZone = (id: number) => {
        setSelectedZones(selectedZones.filter(zone => zone.id !== id));
    };

    const handleTimeZoneChange = (id: number, newTimeZone: string) => {
        setSelectedZones(
            selectedZones.map(zone =>
                zone.id === id ? { ...zone, timeZone: newTimeZone } : zone
            )
        );
    };

    const getFormattedTime = (timeZone: string) => {
        return currentTime.toLocaleTimeString('en-US', {
            timeZone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };
    
     const getFormattedDate = (timeZone: string) => {
        return currentTime.toLocaleDateString('en-US', {
            timeZone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto space-y-8">
                 &lt;Card&gt;
                    &lt;CardHeader className="text-center"&gt;
                        &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                            &lt;Globe className="w-8 h-8" /&gt;
                        &lt;/div&gt;
                        &lt;CardTitle className="text-4xl font-bold font-headline"&gt;Time Zone Converter&lt;/CardTitle&gt;
                        &lt;CardDescription&gt;Compare the current time across different parts of the world.&lt;/CardDescription&gt;
                    &lt;/CardHeader&gt;
                    &lt;CardContent className="space-y-6"&gt;
                        &lt;div className="space-y-4"&gt;
                            {selectedZones.map(zone =&gt; (
                                &lt;Card key={zone.id} className="p-4 flex flex-col md:flex-row items-center justify-between gap-4"&gt;
                                    &lt;div className="flex-1 w-full"&gt;
                                        &lt;Select
                                            value={zone.timeZone}
                                            onValueChange={(newTimeZone) =&gt; handleTimeZoneChange(zone.id, newTimeZone)}
                                        &gt;
                                            &lt;SelectTrigger&gt;&lt;SelectValue /&gt;&lt;/SelectTrigger&gt;
                                            &lt;SelectContent&gt;
                                                {timeZoneNames.map(tz =&gt; (
                                                    &lt;SelectItem key={tz} value={tz}&gt;{tz.replace(/_/g, ' ')}&lt;/SelectItem&gt;
                                                ))}
                                            &lt;/SelectContent&gt;
                                        &lt;/Select&gt;
                                    &lt;/div&gt;
                                    &lt;div className="text-center md:text-right"&gt;
                                        &lt;p className="text-3xl font-bold font-mono"&gt;{getFormattedTime(zone.timeZone)}&lt;/p&gt;
                                        &lt;p className="text-sm text-muted-foreground"&gt;{getFormattedDate(zone.timeZone)}&lt;/p&gt;
                                    &lt;/div&gt;
                                     {selectedZones.length &gt; 1 && (
                                        &lt;Button variant="ghost" size="icon" onClick={() =&gt; handleRemoveTimeZone(zone.id)}&gt;
                                            &lt;Trash2 className="h-5 w-5 text-destructive" /&gt;
                                        &lt;/Button&gt;
                                    )}
                                &lt;/Card&gt;
                            ))}
                        &lt;/div&gt;
                        &lt;div className="text-center"&gt;
                            &lt;Button onClick={handleAddTimeZone}&gt;
                                &lt;Plus className="mr-2 h-5 w-5" /&gt; Add Time Zone
                            &lt;/Button&gt;
                        &lt;/div&gt;
                    &lt;/CardContent&gt;
                &lt;/Card&gt;

                 {timeZoneConverterGuide && (
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
                                        &lt;CardTitle className="font-headline"&gt;{timeZoneConverterGuide.title}&lt;/CardTitle&gt;
                                        &lt;CardDescription&gt;{timeZoneConverterGuide.description}&lt;/CardDescription&gt;
                                    &lt;/CardHeader&gt;
                                    &lt;CardContent&gt;
                                        &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                            {timeZoneConverterGuide.steps.map((step, stepIndex) =&gt; (
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
