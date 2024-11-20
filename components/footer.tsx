"use client";

import { useKeyboardShortcut } from "@/hooks/keyboard-shortcuts";
import Link from "next/link";

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
    <footer className="mx-auto px-4 py-10 text-center">
      <div className="flex justify-center space-x-4">
        <a
          href="https://alanagoyal.com"
          className="p-2 hover:text-[var(--color-primary)] inline-flex items-center text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          [w] website
        </a>
        <a
          href="https://x.com/alanaagoyal"
          className="p-2 hover:text-[var(--color-primary)] inline-flex items-center text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          [t] twitter
        </a>
        <Link
          href="/blog"
          className="md:hidden p-2 hover:text-[var(--color-primary)] inline-flex items-center text-xs"
        >
          [b] blog
        </Link>
      </div>
    </footer>
  );
}
