"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const quotes = [
  {
    text: "Alana is a rare breed of investor who genuinely cares to understand, use your product, and recommend it. I still get great feedback from her and her network to improve Vercel, Next.js, v0, and more.",
    author: "Guillermo Rauch",
    title: "Founder & CEO",
    company: "Vercel",
    url: "https://vercel.com",
  },
  {
    text: "Alana is building something special at Basecase. What sets her apart is her ability to get down into the details. She's constantly exploring new features, helping us identify edge cases, and connecting us with developers.",
    author: "Paul Copplestone",
    title: "Co-Founder & CEO",
    company: "Supabase",
    url: "https://supabase.com",
  },
  {
    text: "Having an investor who actually uses your product daily is rare. Alana's deep understanding of developer tools has helped shape Resend's roadmap and her bug reports are as detailed as they come. She's been an instrumental part of our journey.",
    author: "Zeno Rocha",
    title: "Founder & CEO",
    company: "Resend",
    url: "https://resend.com",
  },
  {
    text: "Alana was the first check into Browserbase and has been an integral partner to us since. She is always tinkering with the product, reporting bugs, and jamming with the entire team to help us build a better product.",
    author: "Paul Klein IV",
    title: "Founder & CEO",
    company: "Browserbase",
    url: "https://browserbase.com",
  },
  {
    text: "Alana has a unique ability to believe in people before they believe in themselves. She was the first check into Braintrust and has supported us in hiring our first engineers, closing our first customers, and building a great product.",
    author: "Ankur Goyal",
    title: "Founder & CEO",
    company: "Braintrust",
    url: "https://braintrust.dev",
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
    <div className="py-5 sm:min-h-[100px] min-h-[250px]">
      <div
        {...handlers}
        className="border-l-4 border-[var(--color-primary)] pl-6 sm:h-[100px] h-[250px] flex flex-col justify-between"
        tabIndex={0}
        role="region"
        aria-label="Testimonial quotes"
      >
        <p className="text-base italic">
          &ldquo;{quotes[currentIndex].text}&rdquo;
        </p>
        <p className="mt-4">
          —{" "}
          <a
            href={quotes[currentIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
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
