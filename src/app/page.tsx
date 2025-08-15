
"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUp } from "lucide-react"
import { tools } from "@/lib/search-data"

const ITEMS_PER_PAGE = 25;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTools = tools.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: document.getElementById('tools')?.offsetTop, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
       window.scrollTo({ top: document.getElementById('tools')?.offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <main>
      <section className="py-20 md:py-32">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Your Ultimate Digital Toolbox
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            A curated collection of client-side utilities and tools to streamline your everyday tasks.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#tools">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="tools" className="py-16 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">
              Explore Our Tools
            </h2>
             {currentPage > 1 && (
                <div className="mt-4">
                    <Button onClick={handlePrevPage} variant="outline">
                        <ArrowUp className="mr-2 h-5 w-5" /> Load Previous
                    </Button>
                </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTools.map((tool) => (
              <Link href={tool.href} key={tool.href} className="group">
                <Card className="h-full hover:border-primary transition-colors duration-300 transform hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4 text-primary">{tool.icon}</div>
                    <CardTitle className="font-headline">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
           {currentPage < totalPages && (
            <div className="mt-12 flex justify-center">
              <Button onClick={handleNextPage} variant="default" size="lg">
                Load More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
