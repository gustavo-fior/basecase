"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const quotes = [
  {
    text: "Alana is an investor who genuinely cares to understand, use your product, and recommend it. I still get great feedback from her and her network to improve Vercel, Next.js, v0, and more.",
    author: "Guillermo Rauch",
    title: "Founder & CEO",
    company: "Vercel",
    url: "https://vercel.com",
  },
  {
    text: "What sets Alana apart is her ability to get down into the details. She's constantly exploring new features, helping us identify edge cases, and connecting us with developers.",
    author: "Paul Copplestone",
    title: "Co-Founder & CEO",
    company: "Supabase",
    url: "https://supabase.com",
  },
  {
    text: "Alana dives deep into our product, regularly filing detailed bug reports and feature suggestions. Her hands-on approach and technical understanding have made her an invaluable partner.",
    author: "Paul Klein IV",
    title: "Founder & CEO",
    company: "Browserbase",
    url: "https://browserbase.com",
  },
  {
    text: "Having an investor who actually uses your product daily is rare. Alana's deep understanding of developer tools has helped shape Resend's roadmap and her bug reports are as detailed as they come.",
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
    <div className="pt-10 sm:min-h-[150px] min-h-[300px]">
      <div
        {...handlers}
        className="border-l-4 border-[#CE4B01] pl-6 sm:h-[150px] h-[300px] flex flex-col justify-between"
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
            className="text-[#CE4B01] hover:text-[#F25E01]"
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
