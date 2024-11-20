"use client";

import { useScramble } from "use-scramble";

export const Hero = () => {
  return (
    <div className="max-w-xl py-5">
      <h1 className="text-3xl font-bold mb-4 cursor-default h-[80px] sm:h-auto">
        <span className="inline-block">
          <ScrambleText 
            text="first check to future founders" 
            className="whitespace-pre-wrap md:whitespace-nowrap"
          />
        </span>
      </h1>
      <p className="text-sm">
        basecase writes the first check to builders who are still dreaming,
        tinkering, and exploring what they want to create.
      </p>
    </div>
  );
};

export const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const { ref } = useScramble({
    text,
    speed: 0.8,
    tick: 1,
    step: 1,
    scramble: 3,
    seed: 3,
  });

  return <span ref={ref} className={className} />;
};
