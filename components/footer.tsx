"use client";

import { useKeyboardShortcut } from "@/hooks/keyboard-shortcuts";

export default function Footer() {
  useKeyboardShortcut({
    handlers: [
      {
        key: "w",
        handler: () => window.open("https://alanagoyal.com", "_blank"),
        description: "Open website",
      },
      {
        key: "t",
        handler: () => window.open("https://x.com/alanaagoyal", "_blank"),
        description: "Open Twitter",
      },
    ],
  });

  return (
    <footer className="mx-auto px-4 py-5 text-center">
      <div className="flex justify-center space-x-4">
        <a
          href="https://alanagoyal.com"
          className="p-2 rounded-lg [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] hover:text-gray-300 dark:hover:text-gray-600 inline-flex items-center text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          [w] website
        </a>
        <a
          href="https://x.com/alanaagoyal"
          className="p-2 rounded-lg [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)] hover:text-gray-300 dark:hover:text-gray-600 inline-flex items-center text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          [t] twitter
        </a>
      </div>
    </footer>
  );
}
