
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightLeft } from "lucide-react"

type Category = "length" | "mass" | "temperature";

const units = {
  length: { meters: "Meters", kilometers: "Kilometers", miles: "Miles", feet: "Feet" },
  mass: { kilograms: "Kilograms", grams: "Grams", pounds: "Pounds", ounces: "Ounces" },
  temperature: { celsius: "Celsius", fahrenheit: "Fahrenheit", kelvin: "Kelvin" },
};

const conversionFactors: Record<string, number> = {
  // Length to meters
  meters: 1,
  kilometers: 1000,
  miles: 1609.34,
  feet: 0.3048,
  // Mass to kilograms
  kilograms: 1,
  grams: 0.001,
  pounds: 0.453592,
  ounces: 0.0283495,
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [inputValue, setInputValue] = useState("1");
  const [result, setResult] = useState("");

  useEffect(() => {
    const currentUnits = units[category];
    const unitKeys = Object.keys(currentUnits);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1]);
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
    
    setResult(output.toFixed(4));
  }, [inputValue, fromUnit, toUnit, category]);

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">Unit Converter</h1>
          <p className="text-muted-foreground mt-2">
            Quickly convert between different units of measurement.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="w-full">
              <label className="text-sm font-medium">Category</label>
              <Select onValueChange={(v) => setCategory(v as Category)} defaultValue={category}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="length">Length</SelectItem>
                  <SelectItem value="mass">Mass</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
              <div className="w-full space-y-2">
                 <label className="text-sm font-medium">From</label>
                 <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="text-lg" />
                 <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {Object.entries(units[category]).map(([key, name]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>

              <div className="pt-8">
                <ArrowRightLeft className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="w-full space-y-2">
                <label className="text-sm font-medium">To</label>
                <Input type="text" value={result} readOnly className="text-lg font-bold bg-muted" />
                <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      {Object.entries(units[category]).map(([key, name]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
