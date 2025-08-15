
"use client"

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Save, Download, Trash2, FileText } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'huzi-pk-notepad-content';

export default function NotepadPage() {
    const [note, setNote] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        try {
            const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedNote) {
                setNote(savedNote);
            }
        } catch (error) {
            console.error("Could not read from local storage", error);
        }
    }, []);

    const handleSave = useCallback(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, note);
            toast({
                title: "Note Saved!",
                description: "Your note has been saved locally in your browser.",
            });
        } catch (error) {
            console.error("Could not save to local storage", error);
            toast({
                title: "Error Saving",
                description: "Could not save the note. Your browser might be in private mode or storage is full.",
                variant: "destructive",
            });
        }
    }, [note, toast]);

    const handleDownload = () => {
        const blob = new Blob([note], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'note.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleClear = () => {
        setNote('');
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
             toast({
                title: "Notepad Cleared",
                description: "The content has been cleared.",
            });
        } catch (error) {
            console.error("Could not clear local storage", error);
        }
    };
    
    return (
        <div className="container mx-auto py-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Digital Notepad</CardTitle>
                        <CardDescription>Your private space to write, save, and download notes. All data is stored locally.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                           <Button onClick={handleSave}>
                               <Save className="mr-2" /> Save Note
                           </Button>
                           <Button onClick={handleDownload} variant="secondary">
                               <Download className="mr-2" /> Download (.txt)
                           </Button>
                           <Button onClick={handleClear} variant="destructive" className="col-span-2 md:col-span-1">
                               <Trash2 className="mr-2" /> Clear Notepad
                           </Button>
                        </div>
                         <Textarea
                            placeholder="Start writing here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="min-h-[50vh] text-base font-mono bg-muted/50"
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
