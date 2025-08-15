
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const ITEMS_PER_PAGE = 25; 

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("tools")
  const [toolsPage, setToolsPage] = useState(1);
  const [guidesPage, setGuidesPage] = useState(1);

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
  
  useEffect(() => {
    setToolsPage(1);
    setGuidesPage(1);
  }, [query, activeTab]);

  const handleResultClick = () => {
    setOpen(false)
    setQuery("")
  }

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(query.toLowerCase()) || 
    guide.description.toLowerCase().includes(query.toLowerCase())
  );

  const renderResults = (
    results: SearchResult[], 
    currentPage: number,
    setCurrentPage: (page: number) => void
  ) => {
      const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentResults = results.slice(startIndex, endIndex);

      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };

      if(query.length > 0 && results.length === 0) {
        return <div className="py-12 text-center text-muted-foreground">No results found.</div>
      }

      return (
        <>
          {currentPage > 1 && (
              <div className="mb-4 flex justify-center">
                  <Button onClick={handlePrevPage} variant="outline" size="sm">
                      <ArrowUp className="mr-2 h-4 w-4" /> Load Previous
                  </Button>
              </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentResults.map((result) => (
              <Link href={result.href} key={result.href} className="group" onClick={handleResultClick}>
                <Card className="h-full hover:border-primary transition-colors duration-300">
                  <CardHeader>
                    <div className="mb-2 text-primary">{result.icon}</div>
                    <CardTitle className="font-headline text-base">{result.title}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{result.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
          {currentPage < totalPages && (
            <div className="mt-4 flex justify-center">
              <Button onClick={handleNextPage} variant="outline" size="sm">
                Load More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </>
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
      <DialogContent className="sm:max-w-[640px] p-0 sm:p-6 sm:rounded-lg top-0 sm:top-[40%] translate-y-0 sm:-translate-y-1/2 rounded-none border-0 sm:border h-screen sm:h-[60vh]">
         <DialogHeader className="p-4 border-b">
           <DialogTitle className="sr-only">Search</DialogTitle>
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for tools or guides..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </DialogHeader>
       
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
          <div className="px-4">
             <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4">
                <TabsContent value="tools" forceMount={true} hidden={activeTab !== 'tools'}>
                  {renderResults(filteredTools, toolsPage, setToolsPage)}
                </TabsContent>
                <TabsContent value="guides" forceMount={true} hidden={activeTab !== 'guides'}>
                  {renderResults(filteredGuides, guidesPage, setGuidesPage)}
                </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
