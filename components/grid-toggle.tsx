"use client";

import { useEffect, useState } from "react";
import { Grid } from "lucide-react";
import { useKeyboardShortcut } from "@/hooks/keyboard-shortcuts";

export function GridToggle() {
  const [showGrid, setShowGrid] = useState(false);

  const toggleGrid = () => {
    const newState = !showGrid;
    setShowGrid(newState);
    localStorage.setItem("grid-enabled", JSON.stringify(newState));
  };

  useKeyboardShortcut({
    handlers: [
      {
        key: "g",
        handler: toggleGrid,
        description: "Toggle grid overlay",
      },
    ],
  });

  useEffect(() => {
    const root = document.documentElement;
    if (showGrid) {
      root.setAttribute('data-grid', 'true');
    } else {
      root.removeAttribute('data-grid');
    }
  }, [showGrid]);

  useEffect(() => {
    const savedGrid = localStorage.getItem("grid-enabled");
    if (savedGrid !== null) {
      setShowGrid(JSON.parse(savedGrid));
    }
  }, []);

  return (
    <button
      onClick={toggleGrid}
      className="hidden md:flex rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 py-2 px-4 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]"
    >
      <Grid className={`w-4 h-4 ${showGrid ? 'text-[var(--color-primary)]' : 'text-gray-500'}`} />
    </button>
  );
}
