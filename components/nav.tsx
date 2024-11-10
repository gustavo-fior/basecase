"use client";

import { useEffect, useState } from "react";
import { SnakeGame } from "./snake";
import { ColorSwitcher } from "./color-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { GitHistory } from "./git";
import { Gamepad, GitCommit } from "lucide-react";

export default function Navigation() {
  const [showSnake, setShowSnake] = useState(false);
  const [showGit, setShowGit] = useState(false);
  const [minimizedSnake, setMinimizedSnake] = useState(false);
  const [minimizedGit, setMinimizedGit] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.metaKey ||
        event.ctrlKey ||
        window.getSelection()?.toString()
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
      <nav className="w-full sticky top-0 z-50 mb-10">
        <div className="flex max-w-4xl justify-between items-center px-4 mx-auto py-4 sm:py-6">
          <div className="flex items-center">
            <a
              href={process.env.NEXT_PUBLIC_URL}
              className="p-2 sm:h-auto h-12 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-primary)] inline-flex items-center"
            >
              <svg
                width="32"
                height="20"
                className="sm:w-[26px] sm:h-[16px] w-[32px] h-[20px] text-white"
                viewBox="0 0 596 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M159.732 47.9949C131.464 47.9949 110.397 57.3286 98.1299 73.8625V0H0V194.666H119.157C129.611 198.127 141.731 200 155.465 200C209.6 200 239.201 170.399 239.201 126.131V121.864C239.201 77.5959 209.6 47.9949 159.732 47.9949ZM119.731 107.997C134.931 107.997 141.065 113.864 141.065 123.997C141.065 134.131 134.931 139.998 119.731 139.998C104.53 139.998 98.1299 133.864 98.1299 123.997C98.1299 114.13 104.263 107.997 119.731 107.997Z"
                    fill="currentColor"
                  />
                  <path
                    d="M245.455 121.864C245.455 81.0624 278.522 47.9946 363.859 47.9946C449.195 47.9946 476.129 75.9956 482.529 116.53H383.059C380.926 111.197 376.126 107.197 363.859 107.197C349.725 107.197 343.324 113.33 343.324 123.997C343.324 134.664 349.725 140.798 363.859 140.798C376.126 140.798 380.926 136.798 383.059 131.464H482.796C476.396 171.999 447.061 200 363.859 200C280.656 200 245.455 166.932 245.455 126.131V121.864Z"
                    fill="currentColor"
                  />
                  <path
                    d="M483.685 166.667H597.018V193.333H483.685V166.667Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </a>
            <div className="hidden md:flex items-center space-x-2 ml-2">
              <a
                href="https://alanagoyal.com"
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] inline-flex items-center text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                [W] Website
              </a>
              <a
                href="https://x.com/alanaagoyal"
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] inline-flex items-center text-xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                [T] Twitter
              </a>
              <button
                onClick={() => setShowGit(true)}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] inline-flex items-center text-xs"
              >
                [C] Commits
              </button>
              <button
                onClick={() => setShowSnake(true)}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] inline-flex items-center text-xs"
              >
                [S] Snake
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ColorSwitcher />
            <ThemeSwitcher />
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
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 py-2 px-4 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]">
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
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 py-2 px-4 [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]">
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
