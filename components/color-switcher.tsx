"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { themeColors, type ThemeColor } from "@/config/colors";

export function ColorThemeSwitcher() {
  const [currentColorKey, setCurrentColorKey] = useState<ThemeColor>("red");
  const [isAnimating, setIsAnimating] = useState(false);

  // Get the next color key
  const getNextColorKey = (current: ThemeColor): ThemeColor => {
    const colorKeys = Object.keys(themeColors) as ThemeColor[];
    const currentIndex = colorKeys.indexOf(current);
    return colorKeys[(currentIndex + 1) % colorKeys.length];
  };

  const nextColorKey = getNextColorKey(currentColorKey);

  // Move DOM manipulation to useEffect
  useEffect(() => {
    const colors = themeColors[currentColorKey];
    const root = document.documentElement;
    
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-background-light", colors.light);
    root.style.setProperty("--color-background-dark", colors.dark);
  }, [currentColorKey]); // Add currentColorKey as dependency

  const setThemeColor = useCallback(() => {
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentColorKey(nextColorKey);
      setIsAnimating(false);
    }, 500);
  }, [nextColorKey]);

  return (
    <button
      onClick={setThemeColor}
      className={`
        p-2 rounded-full relative
        ${isAnimating ? "animate-bounce scale-110" : ""}
        hover:scale-110 transition-all duration-500
        w-10 h-10
      `}
    >
      <div className="w-6 h-6 relative">
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(45deg, ${themeColors[currentColorKey].primary}, ${themeColors[nextColorKey].primary})`,
          }}
        />
      </div>
      <span className="sr-only">Change theme color</span>
    </button>
  );
}
