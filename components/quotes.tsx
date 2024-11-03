"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const quotes = [
  {
    text: "Alana is an investor who genuinely cares to understand, use your product, and recommend it. I still get great feedback from her and her network to improve our platform.",
    author: "Guillermo Rauch",
    title: "Founder & CEO",
    company: "Vercel",
    url: "https://vercel.com",
  },
  {
    text: "What sets Alana apart is her commitment to being a power user. She's constantly exploring Supabase's features, helping us identify edge cases, and connecting us with developers. Her technical background makes her feedback incredibly actionable.",
    author: "Paul Copplestone",
    title: "Co-Founder & CEO",
    company: "Supabase",
    url: "https://supabase.com",
  },
  {
    text: "Beyond capital, Alana dives deep into our product, regularly filing detailed bug reports and feature suggestions. Her hands-on approach and technical understanding have made her an invaluable partner.",
    author: "Paul Klein IV",
    title: "Founder & CEO",
    company: "Browserbase",
    url: "https://browserbase.com",
  },
  {
    text: "Having an investor who actually uses your product daily is rare. Alana's deep understanding of developer tools has helped shape Resend's roadmap, and her bug reports are as detailed as they come.",
    author: "Zeno Rocha",
    title: "Founder & CEO",
    company: "Resend",
    url: "https://resend.com",
  },
];

export const Quotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
    } else if (event.key === "ArrowRight") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }
  };

  // Add swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    },
    onSwipedRight: () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500
  });

  // Auto-cycle quotes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Add event listeners when component mounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="py-10 min-h-[150px]">
      <div
        {...handlers}
        className="border-l-4 border-purple-600 pl-6"
        tabIndex={0}
        role="region"
        aria-label="Testimonial quotes"
      >
        <p className="text-lg italic">
          &ldquo;{quotes[currentIndex].text}&rdquo;
        </p>
        <p className="mt-4">
          —{" "}
          <a
            href={quotes[currentIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-500"
          >
            <span className="font-bold">{quotes[currentIndex].author}</span>
            {quotes[currentIndex].title && (
              <span>, {quotes[currentIndex].title}</span>
            )}
            {quotes[currentIndex].company && (
              <span>, {quotes[currentIndex].company}</span>
            )}
          </a>
        </p>
      </div>
    </div>
  );
};
