"use client"

import * as React from "react"
import { useCallback } from "react"
import { Palette } from "lucide-react"
import { themeColors, type ThemeColor } from "@/config/colors"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ColorThemeSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const setThemeColor = useCallback((color: ThemeColor) => {
    const root = document.documentElement
    const colors = themeColors[color]
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-background-light', colors.light)
    root.style.setProperty('--color-background-dark', colors.dark)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`bg-gray-100 dark:bg-gray-800 px-4 py-2 hover:text-[var(--color-primary)] rounded relative ${
          isScrolled ? 'backdrop-blur-sm bg-gray-100/30 dark:bg-gray-800/30' : ''
        }`}>
          <div className="w-[1rem] h-[1rem] relative">
            <Palette className="h-[1rem] w-[1rem]" />
          </div>
          <span className="sr-only">Change theme color</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="dark:bg-[var(--color-background-dark)] bg-[var(--color-background-light)]"
      >
        {Object.entries(themeColors).map(([key, color]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setThemeColor(key as ThemeColor)}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: color.primary }}
              />
              <span className="font-mono">{color.name}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}