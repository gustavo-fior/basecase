"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="p-1 flex items-center rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]">
      <button
        onClick={() => setTheme("light")}
        className={`rounded-md p-1 transition-colors ${
          theme === "light" 
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light mode</span>
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`rounded-md p-1 transition-colors ${
          theme === "dark" 
            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" 
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark mode</span>
      </button>
    </div>
  )
}
