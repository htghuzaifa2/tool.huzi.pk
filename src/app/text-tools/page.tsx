"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
};

const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
};

export default function TextToolsPage() {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const lines = text.split(/\r\n|\r|\n/).length;
    return { words, characters, lines };
  }, [text]);

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Text Manipulation Tools</h1>
          <p className="text-muted-foreground mt-2">
            A versatile set of tools to convert, count, and analyze your text.
          </p>
        </div>

        <Tabs defaultValue="case-converter" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="case-converter">Case Converter</TabsTrigger>
            <TabsTrigger value="counter">Counter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="case-converter">
            <Card>
              <CardHeader>
                <CardTitle>Case Converter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to convert..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[250px] text-base"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button onClick={() => setText(text.toUpperCase())}>Uppercase</Button>
                  <Button onClick={() => setText(text.toLowerCase())}>Lowercase</Button>
                  <Button onClick={() => setText(toTitleCase(text))}>Title Case</Button>
                  <Button onClick={() => setText(toSentenceCase(text))}>Sentence Case</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="counter">
             <Card>
              <CardHeader>
                <CardTitle>Text Counter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to analyze..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[250px] text-base"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.words}</CardTitle>
                            <p className="text-muted-foreground">Words</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.characters}</CardTitle>
                            <p className="text-muted-foreground">Characters</p>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold">{stats.lines}</CardTitle>
                            <p className="text-muted-foreground">Lines</p>
                        </CardHeader>
                    </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
