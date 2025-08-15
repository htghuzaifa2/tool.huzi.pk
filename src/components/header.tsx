
"use client"
import Link from "next/link"
import { Box, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { SearchDialog } from "./search-dialog"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/guide", label: "Guide" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Box className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              tool.huzi.pk
            </span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => 
             <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
          )}
        </nav>

        <div className="flex items-center justify-end space-x-2">
          <SearchDialog />
          <ThemeSwitcher />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center space-x-2">
                  <Box className="h-6 w-6 text-primary" />
                  <span className="font-bold">tool.huzi.pk</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                      {navLinks.map(link => 
                          <Link
                            key={link.href}
                            href={link.href}
                            className="text-foreground"
                          >
                            {link.label}
                          </Link>
                      )}
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
