
"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Table, Download } from 'lucide-react';

export default function TableToCsvConverterPage() {
    const [htmlInput, setHtmlInput] = useState('');
    const { toast } = useToast();

    const handleConvertAndDownload = () => {
        if (!htmlInput.trim()) {
            toast({
                title: 'Error',
                description: 'Please paste your HTML table code first.',
                variant: 'destructive',
            });
            return;
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const tableEl = doc.querySelector('table');

            if (!tableEl) {
                throw new Error('No <table> element found in the provided HTML.');
            }

            const rows = Array.from(tableEl.querySelectorAll('tr'));
            const csvContent = rows.map(row => {
                const cells = Array.from(row.querySelectorAll('th, td'));
                const rowData = cells.map(cell => {
                    let text = cell.textContent || '';
                    text = text.replace(/"/g, '""'); // Escape double quotes
                    if (text.includes(',') || text.includes('\n') || text.includes('"')) {
                        text = `"${text}"`; // Wrap in double quotes if necessary
                    }
                    return text;
                }).join(',');
                return rowData;
            }).join('\n');

            if (!csvContent.trim()) {
                throw new Error('Could not extract any data from the table.');
            }

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'table_data.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: 'Success!',
                description: 'Your CSV file has been downloaded.',
            });

        } catch (error: any) {
            toast({
                title: 'Conversion Failed',
                description: error.message || 'Could not convert the provided HTML.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <Table className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Table to CSV Converter</CardTitle>
                        <CardDescription>Paste your HTML table code and download it as a CSV file.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Textarea
                            placeholder="<table border='1'>...</table>"
                            value={htmlInput}
                            onChange={(e) => setHtmlInput(e.target.value)}
                            className="min-h-[300px] font-mono text-sm"
                        />
                        <Button
                            onClick={handleConvertAndDownload}
                            size="lg"
                            className="w-full"
                        >
                            <Download className="mr-2" /> Convert & Download CSV
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
