"use client";

export const Hero = () => {
  // Split heading into logical parts that should stay together
  const headingParts = ["First", "check", "to", "future founders"];

  return (
    <div className="max-w-3xl py-5">
      <h1 className="text-3xl font-bold mb-4 flex flex-wrap cursor-default">
        {headingParts.map((part, index) => (
          <span key={index} className="whitespace-nowrap">
            {/* Add line break before "future" on smaller screens */}
            {index === 3 && <span className="w-full block sm:hidden"></span>}
            {/* Split each part into letters for hover effect */}
            {part.split('').map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="transition-colors duration-200 hover:text-[var(--color-primary)]"
              >
                {letter}
              </span>
            ))}
            {/* Add space between words, except for the last word */}
            {index < headingParts.length - 1 && (
              <span>&nbsp;</span>
            )}
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
