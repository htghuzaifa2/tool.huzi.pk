
"use client"

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Save, Download, Trash2, FileText } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const LOCAL_STORAGE_KEY = 'huzi-pk-notepad-notes';

type Note = {
  id: number;
  content: string;
  date: string;
};

export default function NotepadPage() {
    const [currentNote, setCurrentNote] = useState('');
    const [savedNotes, setSavedNotes] = useState<Note[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const savedNotesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedNotesJson) {
                setSavedNotes(JSON.parse(savedNotesJson));
            }
        } catch (error) {
            console.error("Could not read notes from local storage", error);
        }
    }, []);

    const handleSaveNote = useCallback(() => {
        if (!currentNote.trim()) {
            toast({
                title: "Empty Note",
                description: "Cannot save an empty note.",
                variant: "destructive",
            });
            return;
        }

        try {
            const newNote: Note = {
                id: Date.now(),
                content: currentNote,
                date: new Date().toLocaleString(),
            };
            const updatedNotes = [newNote, ...savedNotes];
            setSavedNotes(updatedNotes);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
            setCurrentNote('');
            toast({
                title: "Note Saved!",
                description: "Your new note has been successfully saved.",
            });
        } catch (error) {
            console.error("Could not save to local storage", error);
            toast({
                title: "Error Saving",
                description: "Could not save the note. Your browser might be in private mode or storage is full.",
                variant: "destructive",
            });
        }
    }, [currentNote, savedNotes, toast]);
    
    const handleDeleteNote = (id: number) => {
        try {
            const updatedNotes = savedNotes.filter(note => note.id !== id);
            setSavedNotes(updatedNotes);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
            toast({
                title: "Note Deleted",
                description: "The note has been removed.",
            });
        } catch (error) {
            console.error("Could not delete from local storage", error);
        }
    }
    
    const handleDownloadNote = (content: string) => {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `note-${timestamp}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
                         <Textarea
                            placeholder="Start writing your new note here..."
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            className="min-h-[200px] text-base font-mono bg-muted/50"
                        />
                        <div className="text-center">
                           <Button onClick={handleSaveNote} size="lg">
                               <Save className="mr-2" /> Save New Note
                           </Button>
                        </div>
                    </CardContent>
                </Card>
                
                {savedNotes.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-center mb-6 font-headline">Saved Notes</h2>
                        <div className="grid gap-6">
                            {savedNotes.map((note) => (
                                <Card key={note.id} className="break-words">
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground whitespace-pre-wrap font-mono">{note.content}</p>
                                    </CardContent>
                                    <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                                        <p className="text-xs text-muted-foreground">Saved: {note.date}</p>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleDownloadNote(note.content)}>
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your note.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteNote(note.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
