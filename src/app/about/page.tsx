
"use client"

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function AboutPage() {
  
  const openPortfolio = () => {
    window.open("https://htghuzaifa.huzi.pk/", "_blank");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            About Our Mission
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Empowering everyone with simple, powerful tools.
          </p>
        </div>
        <div className="prose dark:prose-invert lg:prose-xl mx-auto text-center">
          <p>
            Welcome to tool.huzi.pk! We believe that powerful utilities shouldn't be complicated or expensive. Our mission is to provide a collection of free, intuitive, and privacy-focused online tools that just work.
          </p>
          <p>
            Every tool on this platform runs directly in your browser. This means your data remains your own—never uploaded, never stored. Whether you're a developer, a writer, or just someone looking to simplify a task, our toolbox is built for you.
          </p>
        </div>
        <div className="text-center mt-12">
            <Button 
              onClick={openPortfolio}
              size="lg"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40"
            >
              <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                <Rocket className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                Meet the Creator
              </span>
            </Button>
        </div>
      </div>
    </div>
  );
}
