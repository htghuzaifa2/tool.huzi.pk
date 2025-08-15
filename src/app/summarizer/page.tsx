"use client"

import { useState } from "react"
import { summarizeText } from "@/ai/flows/summarize-text"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Wand2 } from "lucide-react"

export default function SummarizerPage() {
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to summarize.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setSummary("")
    try {
      const result = await summarizeText({ text })
      setSummary(result.summary)
    } catch (error) {
      console.error("Summarization error:", error)
      toast({
        title: "Error",
        description: "Failed to summarize the text. Please try again.",
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
          <h1 className="text-4xl font-bold font-headline">AI Text Summarizer</h1>
          <p className="text-muted-foreground mt-2">
            Condense any article or text into a brief, easy-to-read summary.
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
          <Button onClick={handleSummarize} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Summarize
              </>
            )}
          </Button>

          {(isLoading || summary) && (
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>Your concise summary is ready.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                  </div>
                ) : (
                  <p className="text-base whitespace-pre-wrap">{summary}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
