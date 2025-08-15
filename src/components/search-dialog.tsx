
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { tools, guides } from "@/lib/search-data"

type SearchResult = {
    icon: React.ReactNode;
    href: string;
    title: string;
    description: string;
};

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("tools")

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  
  const handleResultClick = () => {
    setOpen(false)
  }

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(query.toLowerCase()) || 
    guide.description.toLowerCase().includes(query.toLowerCase())
  );

  const renderResults = (results: SearchResult[]) => {
      if(query.length > 0 && results.length === 0) {
        return <div className="py-12 text-center text-muted-foreground">No results found.</div>
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        {results.map((result) => (
          <Link href={result.href} key={result.href} className="group" onClick={handleResultClick}>
            <Card className="h-full hover:border-primary transition-colors duration-300">
              <CardHeader>
                <div className="mb-2 text-primary">{result.icon}</div>
                <CardTitle className="font-headline text-base">{result.title}</CardTitle>
                <CardDescription className="text-xs">{result.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[640px] p-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for tools or guides..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4">
             <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="p-4">
                <TabsContent value="tools" forceMount={true} hidden={activeTab !== 'tools'}>
                  {renderResults(filteredTools)}
                </TabsContent>
                <TabsContent value="guides" forceMount={true} hidden={activeTab !== 'guides'}>
                  {renderResults(filteredGuides)}
                </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
