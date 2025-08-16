"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRightLeft, Ruler, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

type Category = "length" | "mass" | "temperature";

const units = {
  length: { meters: "Meters", kilometers: "Kilometers", miles: "Miles", feet: "Feet", inches: "Inches", yards: "Yards" },
  mass: { kilograms: "Kilograms", grams: "Grams", pounds: "Pounds", ounces: "Ounces", stones: "Stones" },
  temperature: { celsius: "Celsius", fahrenheit: "Fahrenheit", kelvin: "Kelvin" },
};

const conversionFactors: Record<string, number> = {
  // Length to meters
  meters: 1,
  kilometers: 1000,
  miles: 1609.34,
  feet: 0.3048,
  inches: 0.0254,
  yards: 0.9144,
  // Mass to kilograms
  kilograms: 1,
  grams: 0.001,
  pounds: 0.453592,
  ounces: 0.0283495,
  stones: 6.35029,
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");
  const unitConverterGuide = guides.find(g => g.href.includes('unit-converter'));

  useEffect(() => {
    const currentUnits = units[category];
    const unitKeys = Object.keys(currentUnits);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
    setInputValue("1");
  }, [category]);

  useEffect(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult("");
      return;
    }

    let output;
    if (category === "temperature") {
      let tempInCelsius: number;
      if (fromUnit === "celsius") tempInCelsius = value;
      else if (fromUnit === "fahrenheit") tempInCelsius = (value - 32) * 5/9;
      else tempInCelsius = value - 273.15; // Kelvin

      if (toUnit === "celsius") output = tempInCelsius;
      else if (toUnit === "fahrenheit") output = (tempInCelsius * 9/5) + 32;
      else output = tempInCelsius + 273.15; // Kelvin
    } else {
      const valueInBase = value * conversionFactors[fromUnit];
      output = valueInBase / conversionFactors[toUnit];
    }
    
    setResult(Number(output.toFixed(5)).toString());
  }, [inputValue, fromUnit, toUnit, category]);

  const handleInputChange = (value: string) => {
    const regex = category === 'temperature' ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
    if (regex.test(value)) {
      setInputValue(value);
    }
  }

  return (
    &lt;div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"&gt;
      &lt;div className="max-w-2xl mx-auto space-y-8"&gt;
        &lt;div className="text-center mb-8"&gt;
           &lt;div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4"&gt;
                &lt;Ruler className="w-8 h-8" /&gt;
            &lt;/div&gt;
          &lt;h1 className="text-4xl font-bold font-headline"&gt;Unit Converter&lt;/h1&gt;
          &lt;p className="text-muted-foreground mt-2"&gt;
            Quickly convert between different units of measurement.
          &lt;/p&gt;
        &lt;/div&gt;

        &lt;Card&gt;
          &lt;CardContent className="pt-6 space-y-6"&gt;
            &lt;div className="w-full"&gt;
              &lt;label className="text-sm font-medium"&gt;Category&lt;/label&gt;
              &lt;Select onValueChange={(v) =&gt; setCategory(v as Category)} defaultValue={category}&gt;
                &lt;SelectTrigger&gt;&lt;SelectValue /&gt;&lt;/SelectTrigger&gt;
                &lt;SelectContent&gt;
                  &lt;SelectItem value="length"&gt;Length&lt;/SelectItem&gt;
                  &lt;SelectItem value="mass"&gt;Mass&lt;/SelectItem&gt;
                  &lt;SelectItem value="temperature"&gt;Temperature&lt;/SelectItem&gt;
                &lt;/SelectContent&gt;
              &lt;/Select&gt;
            &lt;/div&gt;
            
            &lt;div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2"&gt;
              &lt;div className="w-full space-y-2"&gt;
                 &lt;label className="text-sm font-medium"&gt;From&lt;/label&gt;
                 &lt;Input type="text" value={inputValue} onChange={(e) =&gt; handleInputChange(e.target.value)} className="text-lg" /&gt;
                 &lt;Select value={fromUnit} onValueChange={setFromUnit}&gt;
                    &lt;SelectTrigger&gt;&lt;SelectValue/&gt;&lt;/SelectTrigger&gt;
                    &lt;SelectContent&gt;
                      {Object.entries(units[category]).map(([key, name]) =&gt; (
                        &lt;SelectItem key={key} value={key}&gt;{name}&lt;/SelectItem&gt;
                      ))}
                    &lt;/SelectContent&gt;
                  &lt;/Select&gt;
              &lt;/div&gt;

              &lt;div className="pt-8"&gt;
                &lt;ArrowRightLeft className="h-6 w-6 text-muted-foreground" /&gt;
              &lt;/div&gt;

              &lt;div className="w-full space-y-2"&gt;
                &lt;label className="text-sm font-medium"&gt;To&lt;/label&gt;
                &lt;Input type="text" value={result} readOnly className="text-lg font-bold bg-muted" /&gt;
                &lt;Select value={toUnit} onValueChange={setToUnit}&gt;
                    &lt;SelectTrigger&gt;&lt;SelectValue/&gt;&lt;/SelectTrigger&gt;
                    &lt;SelectContent&gt;
                      {Object.entries(units[category]).map(([key, name]) =&gt; (
                        &lt;SelectItem key={key} value={key}&gt;{name}&lt;/SelectItem&gt;
                      ))}
                    &lt;/SelectContent&gt;
                  &lt;/Select&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/CardContent&gt;
        &lt;/Card&gt;

        {unitConverterGuide && (
            &lt;Accordion type="single" collapsible className="w-full"&gt;
                &lt;AccordionItem value="guide" className="border-none flex flex-col items-center"&gt;
                    &lt;AccordionTrigger&gt;
                        &lt;Button variant="outline" className="w-fit"&gt;
                            &lt;BookOpen className="mr-2 h-5 w-5"/&gt;Read The Guide
                        &lt;/Button&gt;
                    &lt;/AccordionTrigger&gt;
                    &lt;AccordionContent className="pt-6 w-full"&gt;
                        &lt;Card&gt;
                            &lt;CardHeader&gt;
                                &lt;CardTitle className="font-headline"&gt;{unitConverterGuide.title}&lt;/CardTitle&gt;
                                &lt;CardDescription&gt;{unitConverterGuide.description}&lt;/CardDescription&gt;
                            &lt;/CardHeader&gt;
                            &lt;CardContent&gt;
                                &lt;ol className="list-decimal list-inside space-y-2 text-muted-foreground"&gt;
                                    {unitConverterGuide.steps.map((step, stepIndex) =&gt; (
                                        &lt;li key={stepIndex}&gt;{step}&lt;/li&gt;
                                    ))}
                                &lt;/ol&gt;
                            &lt;/CardContent&gt;
                        &lt;/Card&gt;
                    &lt;/AccordionContent&gt;
                &lt;/AccordionItem&gt;
            &lt;/Accordion&gt;
        )}
      &lt;/div&gt;
    &lt;/div&gt;
  )
}
