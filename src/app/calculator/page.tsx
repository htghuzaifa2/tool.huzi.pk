
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const buttonClasses = "text-2xl h-16"

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0")
  const [currentValue, setCurrentValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleDigitClick = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(display)
    
    if (currentValue === null) {
      setCurrentValue(String(inputValue))
    } else if (operator) {
      const result = performCalculation()
      setCurrentValue(String(result))
      setDisplay(String(result))
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = (): number => {
    const prevValue = parseFloat(currentValue!)
    const inputValue = parseFloat(display)
    switch (operator) {
      case "+": return prevValue + inputValue;
      case "-": return prevValue - inputValue;
      case "*": return prevValue * inputValue;
      case "/": return prevValue / inputValue;
      default: return inputValue;
    }
  }

  const handleEqualsClick = () => {
    if (operator && currentValue !== null) {
      const result = performCalculation()
      setDisplay(String(result))
      setCurrentValue(null)
      setOperator(null)
      setWaitingForOperand(false)
    }
  }

  const handleClearClick = () => {
    setDisplay("0")
    setCurrentValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }
  
  const handleDecimalClick = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">Calculator</h1>
          <p className="text-muted-foreground mt-2">
            Your trusty companion for quick calculations.
          </p>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="bg-muted text-right p-4 rounded-lg mb-4">
              <p className="text-4xl font-mono font-bold text-foreground break-all">{display}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="secondary" className={buttonClasses} onClick={handleClearClick}>AC</Button>
              <Button variant="secondary" className={buttonClasses} disabled>+/-</Button>
              <Button variant="secondary" className={buttonClasses} disabled>%</Button>
              <Button variant="destructive" className={buttonClasses} onClick={() => handleOperatorClick("/")}>÷</Button>

              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("7")}>7</Button>
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("8")}>8</Button>
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("9")}>9</Button>
              <Button variant="destructive" className={buttonClasses} onClick={() => handleOperatorClick("*")}>×</Button>
              
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("4")}>4</Button>
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("5")}>5</Button>
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("6")}>6</Button>
              <Button variant="destructive" className={buttonClasses} onClick={() => handleOperatorClick("-")}>-</Button>

              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("1")}>1</Button>
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("2")}>2</Button>
              <Button variant="outline" className={buttonClasses} onClick={() => handleDigitClick("3")}>3</Button>
              <Button variant="destructive" className={buttonClasses} onClick={() => handleOperatorClick("+")}>+</Button>

              <Button variant="outline" className={`${buttonClasses} col-span-2`} onClick={() => handleDigitClick("0")}>0</Button>
              <Button variant="outline" className={buttonClasses} onClick={handleDecimalClick}>.</Button>
              <Button className={buttonClasses} onClick={handleEqualsClick}>=</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
