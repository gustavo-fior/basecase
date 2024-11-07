"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const quotes = [
  {
    text: "Alana is a rare breed of investor who genuinely cares to understand your product, use it, and recommend it. I still get great feedback from her and her network to improve Vercel, Next.js, v0, and more. We're proud to have her as an investor at Vercel.",
    author: "Guillermo Rauch",
    title: "Founder & CEO",
    company: "Vercel",
    url: "https://vercel.com",
    image: "/images/guillermo.jpg",
  },
  {
    text: "Alana is building something special at Basecase. What sets her apart is her ability to get down into the details. She's constantly exploring new features, helping us identify edge cases, and connecting us with developers. She's our number one supporter.",
    author: "Paul Copplestone",
    title: "Co-Founder & CEO",
    company: "Supabase",
    url: "https://supabase.com",
    image: "/images/paul.jpg",
  },
  {
    text: "It's rare to have an investor who uses your product regularly. Alana's deep understanding of developer tools has helped shape Resend's roadmap and her bug reports are as detailed as they come. She's played an important role in our journey.",
    author: "Zeno Rocha",
    title: "Founder & CEO",
    company: "Resend",
    url: "https://resend.com",
    image: "/images/zeno.jpg",
  },
  {
    text: "Alana was the first check into Browserbase and has been an indispensable partner to us as we've scaled. She is always tinkering with the product, reporting bugs, and jamming with the entire team to help us build a better product.",
    author: "Paul Klein IV",
    title: "Founder & CEO",
    company: "Browserbase",
    url: "https://browserbase.com",
    image: "/images/paul-klein.jpg",
  },
  {
    text: "Alana is everything you want in an investor. She is proactively helpful, responds instantly, and builds a community of founders that feels like a family. If you’re considering starting a company, she should be your first call.",
    author: "Jordan Singer",
    title: "Founder & CEO",
    company: "Mainframe",
    url: "https://mainfra.me",
    image: "/images/jordan.jpg",
  },
  {
    text: "Alana's network is unlike any investor out there. She's helped introduce us to key talent and dozens of potential customers. Her hands-on approach to recruiting and customer development has been instrumental in Ashby's growth.",
    author: "Benji Encz",
    title: "Founder & CEO",
    company: "Ashby",
    url: "https://ashbyhq.com",
    image: "/images/benji.jpg",
  }

];

export const Quotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isFocused) return;
    
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

  // Auto-cycle quotes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Modified event listeners
  useEffect(() => {
    if (isFocused) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isFocused]);

  return (
    <div className="py-5 sm:min-h-[100px] min-h-[225px]">
      <div
        {...handlers}
        className="flex gap-6 sm:h-[100px] h-[225px]"
        tabIndex={0}
        role="region"
        aria-label="Testimonial quotes"
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <div className="flex-shrink-0 hidden sm:block">
          <img
            src={quotes[currentIndex].image}
            alt={quotes[currentIndex].author}
            className="w-12 h-12 rounded-full object-cover grayscale"
          />
        </div>
        <div className="border-l-4 border-[var(--color-primary)] pl-6 flex flex-col justify-between">
          <p className="text-sm italic">
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
    </div>
  );
};
