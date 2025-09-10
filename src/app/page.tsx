
"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { tools } from "@/lib/search-data"

export default function Home() {
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
            <Link href="#tools">
              <Button size="lg">Explore Tools</Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="tools" className="py-16 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">
              Explore Our Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
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
        </div>
      </section>
    </main>
  );
}
