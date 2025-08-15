
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pilcrow } from "lucide-react";

export default function RichTextEditorPage() {

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Pilcrow className="w-8 h-8" />
                </div>
                <CardTitle className="text-4xl font-bold font-headline">Rich Text Editor</CardTitle>
                <CardDescription>An advanced editor for all your formatting needs. Currently under construction.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg p-8 text-center bg-muted/50 min-h-[300px] flex items-center justify-center">
                    <p className="text-muted-foreground">Coming soon... Rich text editing features will be available here.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
