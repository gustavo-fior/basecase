"use client";

import { useState } from "react";

// Break down each letter into smaller sections, with additional splits for B and A
const B_ASCII = {
  line1: `██████╗`,
  line2Left: `██╔`,
  line2Right: `══██╗`,
  line3: `██████╔╝`,
  line4Left: `██╔`,
  line4Right: `══██╗`,
  line5: `██████╔╝`,
  line6: `╚═════╝`,
};

const A_ASCII = {
  line1: ` █████╗`,
  line2Left: `██╔`,
  line2Right: `══██╗`,
  line3: `███████║`,
  line4Left: `██╔`,
  line4Right: `══██║`,
  line5Left: `██║`,
  line5Right: `  ██║`,
  line6: `╚═╝  ╚═╝`,
};

const S_ASCII = {
  line1: `███████╗`,
  line2: `██╔════╝`,
  line3: `███████╗`,
  line4: `╚════██║`,
  line5: `███████║`,
  line6: `╚══════╝`,
};

const E_ASCII = {
  line1: `███████╗`,
  line2: `██╔════╝`,
  line3: `█████╗`,
  line4: `██╔══╝`,
  line5: `███████╗`,
  line6: `╚══════╝`,
};

const C_ASCII = {
  line1: ` ██████╗`,
  line2: `██╔════╝`,
  line3: `██║`,
  line4: `██║`,
  line5: `╚██████╗`,
  line6: ` ╚═════╝`,
};

export const Hero = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("curl https://www.basecase.sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl py-5">
      <div className="font-mono hidden md:block">
        <pre className="whitespace-pre text-base flex items-center gap-2 mb-4">
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
        <pre className="font-mono whitespace-pre text-[var(--color-primary)] mb-4 flex">
          {/* Example for B */}
          <span className="flex flex-col">
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "B-line1"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("B-line1")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {B_ASCII.line1}
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "B-line2Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("B-line2Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {B_ASCII.line2Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "B-line2Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("B-line2Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {B_ASCII.line2Right}
              </span>
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "B-line3"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("B-line3")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {B_ASCII.line3}
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "B-line4Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("B-line4Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {B_ASCII.line4Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "B-line4Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("B-line4Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {B_ASCII.line4Right}
              </span>
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "B-line5"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("B-line5")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {B_ASCII.line5}
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "B-line6"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("B-line6")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {B_ASCII.line6}
            </span>
          </span>

          {/* Example for A */}
          <span className="flex flex-col">
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "A1-line1"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("A1-line1")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {A_ASCII.line1}
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A1-line2Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A1-line2Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line2Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A1-line2Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A1-line2Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line2Right}
              </span>
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "A1-line3"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("A1-line3")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {A_ASCII.line3}
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A1-line4Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A1-line4Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line4Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A1-line4Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A1-line4Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line4Right}
              </span>
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A1-line5Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A1-line5Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line5Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A1-line5Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A1-line5Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line5Right}
              </span>
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "A1-line6"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("A1-line6")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {A_ASCII.line6}
            </span>
          </span>

          {/* Example for S */}
          <span className="flex flex-col">
            {Object.entries(S_ASCII).map(([key, value]) => (
              <span
                key={key}
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === `S-${key}`
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection(`S-${key}`)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {value}
              </span>
            ))}
          </span>

          {/* Example for E */}
          <span className="flex flex-col">
            {Object.entries(E_ASCII).map(([key, value]) => (
              <span
                key={key}
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === `E-${key}`
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection(`E-${key}`)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {value}
              </span>
            ))}
          </span>

          {/* Example for C */}
          <span className="flex flex-col">
            {Object.entries(C_ASCII).map(([key, value]) => (
              <span
                key={key}
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === `C-${key}`
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection(`C-${key}`)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {value}
              </span>
            ))}
          </span>

          {/* Second A */}
          <span className="flex flex-col">
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "A2-line1"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("A2-line1")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {A_ASCII.line1}
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A2-line2Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A2-line2Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line2Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A2-line2Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A2-line2Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line2Right}
              </span>
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "A2-line3"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("A2-line3")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {A_ASCII.line3}
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A2-line4Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A2-line4Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line4Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A2-line4Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A2-line4Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line4Right}
              </span>
            </span>
            <span className="flex">
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A2-line5Left"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A2-line5Left")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line5Left}
              </span>
              <span
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === "A2-line5Right"
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection("A2-line5Right")}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {A_ASCII.line5Right}
              </span>
            </span>
            <span
              className={`transition-colors duration-200 cursor-default ${
                hoveredSection === "A2-line6"
                  ? "text-[var(--color-secondary)]"
                  : ""
              }`}
              onMouseEnter={() => setHoveredSection("A2-line6")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {A_ASCII.line6}
            </span>
          </span>

          {/* Second S */}
          <span className="flex flex-col">
            {Object.entries(S_ASCII).map(([key, value]) => (
              <span
                key={`S2-${key}`}
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === `S2-${key}`
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection(`S2-${key}`)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {value}
              </span>
            ))}
          </span>

          {/* Second E */}
          <span className="flex flex-col">
            {Object.entries(E_ASCII).map(([key, value]) => (
              <span
                key={`E2-${key}`}
                className={`transition-colors duration-200 cursor-default ${
                  hoveredSection === `E2-${key}`
                    ? "text-[var(--color-secondary)]"
                    : ""
                }`}
                onMouseEnter={() => setHoveredSection(`E2-${key}`)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {value}
              </span>
            ))}
          </span>
        </pre>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-[var(--color-primary)] md:text-black dark:md:text-white md:text-xl">
        First check to future founders
      </h1>
      <p className="text-xl">
        Basecase writes the first check to builders who are still dreaming,
        tinkering, and exploring what they want to create.
      </p>
    </div>
  );
};
