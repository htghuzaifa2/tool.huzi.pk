
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  
  const openPortfolio = () => {
    window.open("https://htghuzaifa.huzi.pk/", "_blank");
  };

  return (
    <div className="container mx-auto py-12 md:py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        <div 
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Our Mission
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Empowering everyone with simple, powerful, and privacy-focused tools that just work, right in your browser.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full mb-4">
                        <Heart className="w-10 h-10" />
                    </div>
                    <CardTitle className="font-headline">Built for You</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                    We believe that powerful utilities should not be complicated or expensive. Our mission is to provide a collection of free, intuitive tools for developers, writers, and anyone looking to simplify a task.
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full mb-4">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <CardTitle className="font-headline">Privacy First</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                   Every tool on this platform runs directly in your browser. This means your data remains your own—never uploaded, never stored. Your privacy is paramount.
                </CardContent>
            </Card>
        </div>

        <div 
            className="text-center pt-8"
        >
            <h2 className="text-3xl font-bold font-headline mb-4">Meet the Creator</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                This collection of tools is a passion project by a developer dedicated to building useful things for the web.
            </p>
            <Button 
              onClick={openPortfolio}
              size="lg"
              className="group relative"
            >
                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-background rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                <span className="relative flex items-center">
                    <Rocket className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                    Visit My Portfolio
                </span>
            </Button>
        </div>
      </div>
    </div>
  );
}
