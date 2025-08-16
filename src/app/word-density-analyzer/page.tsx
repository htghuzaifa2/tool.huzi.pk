
"use client"

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, ArrowUpDown, BookOpen } from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { guides } from "@/lib/search-data";

type WordStat = {
  word: string;
  count: number;
  density: string;
};

const columns: ColumnDef<WordStat>[] = [
  {
    accessorKey: "word",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Word
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Count
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.getValue("count")}</div>,
  },
  {
    accessorKey: "density",
    header: "Density",
    cell: ({ row }) => <div className="text-right">{row.getValue("density")}</div>
  },
];


export default function WordDensityAnalyzerPage() {
    const [text, setText] = useState("Here is some sample text. This text is for demonstration purposes. Text analysis is useful.");
    const [sorting, setSorting] = useState<SortingState>([{ id: 'count', desc: true }]);
    const wordDensityGuide = guides.find(g => g.href.includes('word-density-analyzer'));

    const wordStats = useMemo(() => {
        if (!text.trim()) return { stats: [], total: 0 };

        const words = text
            .toLowerCase()
            .replace(/[^\w\s']|_/g, "") // remove punctuation except apostrophes
            .replace(/\s+/g, " ")
            .split(/\s+/)
            .filter(Boolean);

        const totalWords = words.length;
        if (totalWords === 0) return { stats: [], total: 0 };

        const wordCounts = words.reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const stats: WordStat[] = Object.entries(wordCounts).map(([word, count]) => ({
            word,
            count,
            density: `${((count / totalWords) * 100).toFixed(2)}%`,
        }));

        return { stats, total: totalWords };
    }, [text]);
    
    const table = useReactTable({
        data: wordStats.stats,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <BarChart className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Word Density Analyzer</CardTitle>
                        <CardDescription>Analyze your text to see how many times each word appears.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                               <Textarea
                                    placeholder="Paste your text here..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="min-h-[300px] md:min-h-[400px] font-mono text-sm"
                               />
                               <p className="text-sm text-center text-muted-foreground">Total words: {wordStats.total}</p>
                            </div>
                            <div className="space-y-4">
                                <ScrollArea className="h-[400px] rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            {table.getHeaderGroups().map(headerGroup => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map(header => (
                                                        <TableHead key={header.id}>
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                        <TableBody>
                                            {table.getRowModel().rows?.length ? (
                                                table.getRowModel().rows.map(row => (
                                                    <TableRow key={row.id}>
                                                        {row.getVisibleCells().map(cell => (
                                                            <TableCell key={cell.id} className="font-mono text-sm">
                                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                                        No text to analyze.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {wordDensityGuide && (
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="guide" className="border-none flex flex-col items-center">
                            <AccordionTrigger asChild>
                                <button className="relative inline-flex items-center justify-center overflow-hidden rounded-lg p-0.5 font-medium text-foreground group bg-gradient-to-br from-primary via-accent to-destructive group-hover:from-primary/90 group-hover:via-accent/90 group-hover:to-destructive/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 h-11 px-8">
                                    <span className="relative flex items-center px-6 py-3 transition-all ease-in duration-200 bg-background rounded-md group-hover:bg-opacity-0">
                                        <BookOpen className="mr-2 h-5 w-5 transition-transform duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:rotate-12" />
                                        Read The Guide
                                    </span>
                                </button>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 w-full">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{wordDensityGuide.title}</CardTitle>
                                        <CardDescription>{wordDensityGuide.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                            {wordDensityGuide.steps.map((step, stepIndex) => (
                                                <li key={stepIndex}>{step}</li>
                                            ))}
                                        </ol>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    );
}
