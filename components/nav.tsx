"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { SnakeGame } from "./snake";
import { ColorThemeSwitcher } from "./color-theme-switcher";
import { GitHistory } from "./git";
import { Gamepad, GitCommit } from "lucide-react";

export default function Navigation() {
  const [showSnake, setShowSnake] = useState(false);
  const [showGit, setShowGit] = useState(false);
  const [minimizedSnake, setMinimizedSnake] = useState(false);
  const [minimizedGit, setMinimizedGit] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav className="w-full sticky top-0 z-50">
        <div className="flex justify-between items-center px-4 max-w-5xl mx-auto py-4 sm:py-6">
          <div className="hidden md:flex space-x-4">
            <a
              href="https://alanagoyal.com"
              className={`px-2 py-1 rounded hover:text-[var(--color-primary)] bg-gray-100 dark:bg-gray-800 ${
                isScrolled ? 'backdrop-blur-sm bg-gray-100/30 dark:bg-gray-800/30' : ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              [W] Website
            </a>

            <a
              href="https://x.com/alanaagoyal"
              className={`px-2 py-1 rounded hover:text-[var(--color-primary)] bg-gray-100 dark:bg-gray-800 ${
                isScrolled ? 'backdrop-blur-sm bg-gray-100/30 dark:bg-gray-800/30' : ''
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              [T] Twitter
            </a>
            <button
              onClick={() => setShowGit(true)}
              className={`px-2 py-1 rounded hover:text-[var(--color-primary)] bg-gray-100 dark:bg-gray-800 ${
                isScrolled ? 'backdrop-blur-sm bg-gray-100/30 dark:bg-gray-800/30' : ''
              }`}
            >
              [C] Commits
            </button>
            <button
              onClick={() => setShowSnake(true)}
              className={`px-2 py-1 rounded hover:text-[var(--color-primary)] bg-gray-100 dark:bg-gray-800 ${
                isScrolled ? 'backdrop-blur-sm bg-gray-100/30 dark:bg-gray-800/30' : ''
              }`}
            >
              [S] Snake
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <ColorThemeSwitcher isScrolled={isScrolled} />
            <ModeToggle isScrolled={isScrolled} />
            <a
              href="mailto:hi@basecase.vc?subject=hello!"
              className={`px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:bg-[var(--color-secondary)] inline-block text-base md:text-base text-sm ${
                isScrolled ? 'backdrop-blur-sm bg-[var(--color-primary)]/30' : ''
              }`}
            >
              Talk to a developer
            </a>
          </div>
        </div>
      </nav>

      {showSnake && (
        <SnakeGame 
          onClose={() => setShowSnake(false)} 
          isMinimized={minimizedSnake}
          onMinimize={setMinimizedSnake}
        />
      )}
      {showGit && (
        <GitHistory 
          onClose={() => setShowGit(false)} 
          isMinimized={minimizedGit}
          onMinimize={setMinimizedGit}
        />
      )}

      {(minimizedSnake || minimizedGit) && (
        <div className="fixed bottom-4 right-4 flex gap-2 z-50">
          {minimizedSnake && showSnake && (
            <div 
              className="cursor-pointer"
              onClick={() => setMinimizedSnake(false)}
            >
              <div className="flex items-center gap-2 border border-gray-800 shadow dark:border-gray-200 py-2 px-4 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]">
                <Gamepad className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-sm">Snake game</span>
              </div>
            </div>
          )}
          {minimizedGit && showGit && (
            <div 
              className="cursor-pointer"
              onClick={() => setMinimizedGit(false)}
            >
              <div className="flex items-center gap-2 border border-gray-800 shadow dark:border-gray-200 py-2 px-4 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]">
                <GitCommit className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-sm">Git commit history</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
