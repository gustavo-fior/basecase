"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useKeyboardShortcut } from '../hooks/keyboard-shortcuts';

const quotes = [
  {
    text: "alana is a rare breed of investor who genuinely cares to understand your product, use it, and recommend it. i still get great feedback from her and her network to improve vercel, next.js, v0, and more. we're proud to have her as an investor.",
    author: "guillermo rauch",
    title: "founder & ceo",
    company: "vercel",
    url: "https://vercel.com",
  },
  {
    text: "alana is building something special. what sets her apart is her ability to get down into the details. she's constantly exploring new features, helping us identify edge cases, and connecting us with developers. she's our number one supporter.",
    author: "paul copplestone",
    title: "co-founder & ceo",
    company: "supabase",
    url: "https://supabase.com",
  },
  {
    text: "alana's network is unlike any investor out there. she's helped introduce us to key talent and dozens of potential customers. her hands-on approach to recruiting and customer development has been instrumental in ashby's growth.",
    author: "benji encz",
    title: "co-founder & ceo",
    company: "ashby",
    url: "https://ashbyhq.com",
  },
  {
    text: "it's rare to have an investor who uses your product regularly. alana's deep understanding of developer tools has helped shape resend's roadmap and her bug reports are as detailed as they come. she's played an important role in our journey.",
    author: "zeno rocha",
    title: "co-founder & ceo",
    company: "resend",
    url: "https://resend.com",
  },
  {
    text: "alana was the first check into browserbase and has been an indispensable partner to us as we've scaled. she is always tinkering with the product, reporting bugs, and jamming with the entire team to help us build a better product.",
    author: "paul klein iv",
    title: "founder & ceo",
    company: "browserbase",
    url: "https://browserbase.com",
  },
  {
    text: "alana is everything you want in an investor. she is proactively helpful, responds instantly, and builds a community of founders that feels like a family. if you're considering starting a company, she should be your first call.",
    author: "jordan singer",
    title: "founder & ceo",
    company: "mainframe",
    url: "https://mainfra.me",
  },
];

export const Quotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add auto-advance timer with resize handling
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const handleResize = () => {
      // Clear existing timer
      if (timer) clearInterval(timer);
      
      // Only set new timer if mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        timer = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000);
      }
    };

    // Initial setup
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useKeyboardShortcut({
    handlers: [
      {
        key: 'n',
        handler: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length),
        description: 'Next quote'
      },
      {
        key: 'p',
        handler: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length),
        description: 'Previous quote'
      }
    ]
  });

  // Add swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    },
    onSwipedRight: () => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length
      );
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
  });

  return (
    <div className="pt-5 pb-10">
      <div className="flex items-center gap-6">
        <div
          {...handlers}
          className="flex gap-6"
          tabIndex={0}
          role="region"
          aria-label="Testimonial quotes"
        >
          <div className="border-l-4 border-[var(--color-primary)] pl-6 flex flex-col justify-between">
            <p className="text-sm">&ldquo;{quotes[currentIndex].text}&rdquo;</p>
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

        <button
          onClick={() =>
            setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length)
          }
          className="hidden md:block text-sm p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors whitespace-nowrap [background-color:var(--color-background-light)] dark:[background-color:var(--color-background-dark)]"
        >
          [n] next
        </button>
      </div>
    </div>
  );
};
