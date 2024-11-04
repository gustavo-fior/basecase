"use client";

import { useState } from "react";

const BASECASE_ASCII = `
██████╗  █████╗ ███████╗███████╗ ██████╗ █████╗ ███████╗███████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██████╔╝███████║███████╗█████╗  ██║     ███████║███████╗█████╗
██╔══██╗██╔══██║╚════██║██╔══╝  ██║     ██╔══██║╚════██║██╔══╝
██████╔╝██║  ██║███████║███████╗╚██████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
`;

export const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("curl https://www.basecase.sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl py-5">
      <div className="font-mono hidden md:block">
        <pre className="whitespace-pre text-base flex items-center gap-2">
          <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
            curl https://www.basecase.sh
          </code>
          <button
            onClick={copyCommand}
            className="hover:opacity-70 transition"
            aria-label={copied ? "Copied" : "Copy command"}
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </pre>
        <pre className="font-mono whitespace-pre text-[var(--color-primary)] mb-8">
          {BASECASE_ASCII}
        </pre>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)] md:text-black dark:md:text-white md:text-xl">
        First check to future founders
      </h1>
      <p className="text-xl">
        Basecase exists to support founders before their companies exist. I
        write the first check to builders who are often still dreaming,
        tinkering, and exploring what they want to create.
      </p>
    </div>
  );
};
