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
        className="inline-block"
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
    <div className="max-w-6xl py-5">
      <DisintegratingText className="text-2xl font-bold mb-4 text-[var(--color-primary)]">
        No decks, no pitch meetings
      </DisintegratingText>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">How We work</h2>
          {[
            "We write the very first check into companies",
            "We lead rounds with $1-2M checks and don't take board seats",
            "We work with founders from early ideation through validation & product development",
            "We are often an early beta tester, active user, & paying customer of founders' products",
            "We provide tactical support by making customer & candidate introductions from pre-product to post-IPO",
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3 text-sm">
              <span>* {item}</span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Who We work with</h2>
          <div className="text-sm">
            <p className="mb-4">We may be a good fit for you if:</p>
            <ul className="list-none space-y-2">
              <li>+ You&apos;ve built a company before and think may want to start another</li>
              <li>+ You love building and think you want to build something of your own someday</li>
              <li>+ You are thinking about what to do next and not sure whether to start a company or join one</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-4">We may not be the best fit for you if:</p>
            <ul className="list-none">
              <li>- You are already fundraising and we have never met before</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
