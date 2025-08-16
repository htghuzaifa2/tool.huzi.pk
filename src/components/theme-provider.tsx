
"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark" | "blue" | "orange"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "toolbox-hub-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // This code now runs only on the client, after the initial render.
    let storedTheme: Theme;
    try {
      storedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    } catch (e) {
      storedTheme = defaultTheme;
    }
    setTheme(storedTheme);
  }, [storageKey, defaultTheme]);

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark", "theme-blue", "theme-orange")
    
    if (theme === "light") {
      root.classList.add("light")
    } else if (theme === "blue") {
      root.classList.add("theme-blue")
    } else if (theme === "orange") {
      root.classList.add("theme-orange")
    } else {
      root.classList.add(theme)
    }

  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch (e) {
        // ignore
      }
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
