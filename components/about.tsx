"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const DisintegratingText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const text = children?.toString() || "";

  // Create an array of characters with their positions
  const chars = text.split("").map((char, index) => ({
    char,
    position: index,
    isSpace: char === " ",
  }));

  // Convert Lucide icon to cursor URL
  useEffect(() => {
    // Updated SVG string with stroke="#9333ea" ([#CE4B01]) and smaller dimensions (16x16)
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>`;

    // Convert SVG to base64
    const base64Svg = btoa(svgString);

    // Create style element with adjusted cursor hotspot (8 8 for smaller icon)
    const style = document.createElement("style");
    style.textContent = `
      .wand-cursor {
        cursor: url('data:image/svg+xml;base64,${base64Svg}') 8 8, auto !important;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={className} style={{ position: "relative" }}>
      <motion.div
        className={`inline-block ${isHovered ? "wand-cursor" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {chars.map((item, i) =>
          item.isSpace ? (
            <span key={i}>&nbsp;</span>
          ) : (
            <motion.span
              key={i}
              style={{
                display: "inline-block",
                position: isHovered ? "relative" : "static",
              }}
              animate={
                isHovered
                  ? {
                      y: Math.random() * 100 - 50,
                      x: Math.random() * 100 - 50,
                      scale: 0,
                      opacity: 0,
                    }
                  : {
                      y: 0,
                      x: 0,
                      scale: 1,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {item.char}
            </motion.span>
          )
        )}
      </motion.div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="max-w-6xl py-10">
      <DisintegratingText className="text-2xl font-bold mb-8 text-[#CE4B01]">
        No decks, no pitch meetings.
      </DisintegratingText>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">How I work</h2>
          {[
            "I write the very first check into companies",
            "I lead rounds with $1-2M checks and don't take board seats",
            "I work with founders from early ideation through validation & product development",
            "I am often an early beta tester, active user, & paying customer of founders' products",
            "I provide tactical support by making customer & candidate introductions from pre-product to post-IPO",
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3 text-sm">
              <span>* {item}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Who I work with</h2>
          <div className="text-sm">
            <p className="mb-4">I may be a good fit for you if:</p>
            <ul className="list-none space-y-2">
              <li>+ You&apos;ve built a company before and think may want to start another</li>
              <li>+ You love building and think you want to build something of your own someday</li>
              <li>+ You are thinking about what to do next and not sure whether to start a company or join one</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-4">I may not be the best fit for you if:</p>
            <ul className="list-none">
              <li>- You are already fundraising and we have never met before</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
