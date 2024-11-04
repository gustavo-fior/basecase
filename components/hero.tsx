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
    navigator.clipboard.writeText("curl -L https://basecase.sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="max-w-3xl py-10">
      <div className="font-mono hidden md:block">
        <pre className="whitespace-pre text-base flex items-center gap-2">
          <span className="font-bold text-[#CE4B01]">alanagoyal@Alanas-MacBook-Air basecase %</span>
          <span className="px-2">curl -L https://basecase.sh</span>
          <button 
            onClick={copyCommand}
            className="hover:opacity-70 transition"
            aria-label={copied ? "Copied" : "Copy command"}
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </pre>
        <pre className="font-mono whitespace-pre text-[#CE4B01] mb-8">
          {BASECASE_ASCII}
        </pre>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-[#CE4B01] md:text-black dark:md:text-white md:text-xl">
        A builder backing builders
      </h1>
      <p className="text-xl">
        Basecase invests in founders before their companies exist. We write the
        first check to technical founders who are often still in the dreaming,
        building, and exploring phase of their journey.
      </p>
    </div>
  );
};
