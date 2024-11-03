"use client";

import { useEffect } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { GitHub } from "./github";

export default function Navigation() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'g':
          window.open('https://github.com/alanagoyal', '_blank');
          break;
        case 't':
          window.open('https://x.com/alanaagoyal', '_blank');
          break;
        case 'w':
          window.open('https://alanagoyal.com', '_blank');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <meta name="terminal-description" content="Alana Goyal's Links - Use G/T/W keyboard shortcuts to navigate" />
      <nav className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex space-x-4">
              <a 
                href="https://github.com/alanagoyal" 
                className="hover:text-orange-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                [G] GitHub
              </a>
              <a 
                href="https://x.com/alanaagoyal" 
                className="hover:text-orange-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                [T] Twitter
              </a>
              <a 
                href="https://alanagoyal.com" 
                className="hover:text-orange-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                [W] Website
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <GitHub />
              <ModeToggle />
              <a
                href="mailto:hi@basecase.vc"
                className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-400 inline-block"
              >
                Say Hi
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
