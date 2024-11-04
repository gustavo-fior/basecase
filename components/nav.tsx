"use client";

import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { GitHub } from "./github";
import { SnakeGame } from "./snake";
import { ColorThemeSwitcher } from "./color-theme-switcher";

export default function Navigation() {
  const [showSnake, setShowSnake] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "g":
          window.open("https://github.com/alanagoyal", "_blank");
          break;
        case "t":
          window.open("https://x.com/alanaagoyal", "_blank");
          break;
        case "w":
          window.open("https://alanagoyal.com", "_blank");
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
        content="Alana Goyal's Links - Use G/T/W keyboard shortcuts to navigate"
      />
      <nav className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-4">
              <a
                href="https://github.com/alanagoyal"
                className="hover:text-[var(--color-primary)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                [G] GitHub
              </a>
              <a
                href="https://x.com/alanaagoyal"
                className="hover:text-[var(--color-primary)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                [T] Twitter
              </a>
              <a
                href="https://alanagoyal.com"
                className="hover:text-[var(--color-primary)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                [W] Website
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <ColorThemeSwitcher />
              <ModeToggle />
              <a
                href="mailto:hi@basecase.vc?subject=hello%20from%20basecase.sh!&body=hi%20alana%2C%20i%20saw%20your%20website%20and%20wanted%20to%20reach%20out..."
                className="px-4 py-2 bg-[var(--color-primary)] text-black rounded hover:bg-[var(--color-secondary)] inline-block"
              >
                Say hello
              </a>
            </div>
          </div>
        </div>
      </nav>

      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
    </>
  );
}
