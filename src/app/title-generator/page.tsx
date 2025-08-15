"use client"

import { useState } from "react"
import { generateTitle } from "@/ai/flows/generate-title"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

export default function TitleGeneratorPage() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to generate a title from.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTitle("")
    try {
      const result = await generateTitle({ text })
      setTitle(result.title)
    } catch (error) {
      console.error("Title generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate a title. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">AI Title Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create a catchy and descriptive title for your text automatically.
          </p>
        </div>

        <div className="space-y-6">
          <Textarea
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] text-base"
            disabled={isLoading}
          />
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Title
              </>
            )}
          </Button>

          {(isLoading || title) && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Title</CardTitle>
                <CardDescription>Here's your AI-generated title.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-6 bg-muted rounded animate-pulse w-3/4"></div>
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold font-headline text-primary">{title}</h2>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
