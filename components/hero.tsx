"use client";

export const Hero = () => {
  const headingText = "First check to future founders";

  return (
    <div className="max-w-3xl py-4 sm:py-0">
      <h1 className="text-2xl font-bold mb-4 flex flex-wrap cursor-default">
        {headingText.split('').map((letter, index) => (
          <span
            key={index}
            className="transition-colors duration-200 hover:text-[var(--color-primary)]"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h1>
      <p className="text-sm">
        Basecase writes the first check to builders who are still dreaming,
        tinkering, and exploring what they want to create.
      </p>
    </div>
  );
};
