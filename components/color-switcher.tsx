"use client";

import * as React from "react";
import { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { themeColors, type ThemeColor } from "@/config/colors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ColorSwitcher() {
  const setThemeColor = useCallback((color: ThemeColor) => {
    const root = document.documentElement;
    const colors = themeColors[color];

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-background-light", colors.light);
    root.style.setProperty("--color-background-dark", colors.dark);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] inline-flex items-center gap-2"
        >
          <div
            className="w-4 h-4 rounded-full [background-color:var(--color-primary)]"
          />
          <ChevronDown className="h-4 w-4" />
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
  );
}
