"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { SnakeGame } from "./snake";
import { ColorThemeSwitcher } from "./color-theme-switcher";
import { GitHistory } from "./git";

export default function Navigation() {
  const [showSnake, setShowSnake] = useState(false);
  const [showGit, setShowGit] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "w":
          window.open("https://alanagoyal.com", "_blank");
          break;
        case "t":
          window.open("https://x.com/alanaagoyal", "_blank");
          break;
        case "c":
          setShowGit(true);
          break;
        case "s":
          setShowSnake(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      <meta
        name="terminal-description"
        content="Use W/T/G/S keyboard shortcuts to navigate"
      />
      <nav className="w-full sticky top-0">
        <div className="flex justify-between items-center px-4 py-4">
          <div className="hidden md:flex space-x-4">
            <a
              href="https://alanagoyal.com"
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:text-[var(--color-primary)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              [W] Website
            </a>

            <a
              href="https://x.com/alanaagoyal"
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:text-[var(--color-primary)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              [T] Twitter
            </a>
            <button
              onClick={() => setShowGit(true)}
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:text-[var(--color-primary)]"
            >
              [C] Commits
            </button>
            <button
              onClick={() => setShowSnake(true)}
              className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:text-[var(--color-primary)]"
            >
              [S] Snake
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <ColorThemeSwitcher />
            <ModeToggle />
            <a
              href="mailto:hi@basecase.vc?subject=hello!"
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-secondary)] inline-block text-base md:text-base text-sm"
            >
              Talk to a developer
            </a>
          </div>
        </div>
      </nav>

      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
      {showGit && <GitHistory onClose={() => setShowGit(false)} />}
    </>
  );
}
