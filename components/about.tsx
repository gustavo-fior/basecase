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
        <h1 className="text-lg font-bold mb-4">No decks, no pitch meetings</h1>
      </div>
      <div className="hidden md:block">
        <DisintegratingText className="text-lg font-bold mb-4">
          No decks, no pitch meetings
        </DisintegratingText>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-semibold text-sm">How I work</h2>
          <div className="space-y-3 text-sm">
            {[
              "I write the very first check into companies",
              "I lead rounds with $1-2M checks, no board seat",
              "I work with founders pre-traction, pre-product, and pre-idea",
              "I am often an early beta tester, active user, and paying customer of the products founders build",
              "I put my network to work for founders, making introductions to candidates, customers, and investors",
              "I spend most of my time with people who have not yet started companies and don't take pitch meetings",
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <span>* {item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold text-sm">Who I work with</h2>
          <div className="space-y-3 text-sm">
            {[
              "Former founders who are driven to make a comeback",
              "Solo founders who've been told they need a co-founder",
              "Underdogs who feel deeply compelled to prove people wrong",
              "Builders who can't help themselves from bringing ideas to life",
              "Futurists who have strong convictions about where the world is going",
              "Anyone who has been told they are too intense, too curious, or too impatient",
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <span>* {item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
