"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const DisintegratingText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const text = children?.toString() || "";

  const chars = text.split("").map((char, index) => ({
    char,
    position: index,
    isSpace: char === " ",
  }));

  return (
    <div className={className} style={{ position: "relative" }}>
      <motion.div
        className="inline-block cursor-default"
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
    <div className="py-5">
      <div className="md:hidden">
        <h1 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
          No decks, no pitch meetings
        </h1>
      </div>
      <div className="hidden md:block">
        <DisintegratingText className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
          No decks, no pitch meetings
        </DisintegratingText>
      </div>
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
            <p className="mb-4">I would love to talk to you if:</p>
            <ul className="list-none space-y-2">
              <li>
                + You&apos;re obsessed with building, tinkering, and creating
                your ideas
              </li>
              <li>
                + You&apos;ve built a company before and think may want to start
                another
              </li>
              <li>
                + You&apos;re thinking about what to do next but not sure
                whether you want to start a company or join one
              </li>
              <li>
                + You love trying new products, discovering new markets, and
                thinking about the direction the world is going
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
