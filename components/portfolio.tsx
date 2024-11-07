"use client";

import { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

export const Portfolio = () => {
  const portfolio = [
    {
      title: "Ashby",
      icon: "/portfolio/ashby.png",
      description:
        "Ashby helps scaling companies achieve their ambitious growth targets. With Ashby, teams of all sizes can run a fast and efficient hiring process.",
      url: "https://www.ashbyhq.com/",
    },
    {
      title: "Astral",
      icon: "/portfolio/astral.png",
      description:
        "Astral's mission is to make the Python ecosystem more productive by building high-performance developer tools, starting with Ruff.",
      url: "https://www.astral.sh/",
    },
    {
      title: "Baseten",
      icon: "/portfolio/baseten.png",
      description:
        "Baseten provides all the infrastructure you need to deploy and serve ML models performantly, scalably, and cost-efficiently.",
      url: "https://www.baseten.co/",
    },
    {
      title: "Braintrust",
      icon: "/portfolio/braintrust.png",
      description:
        "Braintrust is the enterprise-grade stack for building AI products. From evaluations, to prompt playground, to data management, Braintrust takes uncertainty and tedium out of incorporating AI into your business.",
      url: "https://www.braintrust.dev/",
    },
    {
      title: "Browserbase",
      icon: "/portfolio/browserbase.png",
      description:
        "Browserbase is the all-in-one platform developers need to host, manage, and monitor headless browsers in the cloud.",
      url: "https://www.browserbase.com/",
    },
    {
      title: "Default",
      icon: "/portfolio/default.png",
      description:
        "Default is the all-in-one inbound lead platform that helps modern companies make the most of every lead by consolidating the usually fragmented inbound sales stack into one deeply integrated platform.",
      url: "https://www.default.com/",
    },
    {
      title: "Diagram",
      icon: "/portfolio/diagram.png",
      description: (
        <>
          <span className="text-plum text-sm block mb-2 lowercase">
            Acquired by Figma
          </span>
          Diagram is a design tools company reimagining UI design in the era of
          generative AI.
        </>
      ),
      url: "https://diagram-figma.webflow.io/",
    },
    {
      title: "Doss",
      icon: "/portfolio/doss.png",
      description:
        "Doss is a lightweight ERP and data platform that helps teams manage their operations from purchase order to point of sale.",
      url: "https://doss.com/",
    },
    {
      title: "Graphite",
      icon: "/portfolio/graphite.png",
      description:
        "Graphite is a fast, simple code review platform designed for engineers who want to write and review smaller pull requests, stay unblocked, and ship faster.",
      url: "https://graphite.dev/",
    },
    {
      title: "Mainframe",
      icon: "/portfolio/mainframe.png",
      description:
        "Mainframe's mission is to change the world's relationship with computers.",
      url: "https://mainfra.me/",
    },
    {
      title: "Orb",
      icon: "/portfolio/orb.png",
      description:
        "Orb is developer-first billing infrastructure built to help companies succeed with usage-based pricing.",
      url: "https://www.withorb.com/",
    },
    {
      title: "Pyroscope",
      icon: "/portfolio/pyroscope.png",
      description: (
        <>
          <span className="text-plum text-sm block mb-2 lowercase">
            Acquired by Grafana
          </span>
          Pyroscope is an open source continuous profiling platform that helps
          you find performance issues in your code, locate and fix memory leaks,
          and track changes over time.
        </>
      ),
      url: "https://pyroscope.io/",
    },
    {
      title: "Resend",
      icon: "/portfolio/resend.png",
      description:
        "Resend is the email API for developers to build, test, and deliver transactional emails at scale.",
      url: "https://resend.com/",
    },
    {
      title: "SF Compute",
      icon: "/portfolio/sfcompute.png",
      description:
        "SF Compute runs affordable pre-training clusters for startups, grad students, and research labs.",
      url: "https://sfcompute.com/",
    },
    {
      title: "Supabase",
      icon: "/portfolio/supabase.png",
      description:
        "Supabase is an open source Firebase alternative. Start your project with a Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and storage.",
      url: "https://supabase.com/",
    },
    {
      title: "Vercel",
      icon: "/portfolio/vercel.png",
      description:
        "Vercel's frontend cloud provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.",
      url: "https://vercel.com/",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isIconicHovered, setIsIconicHovered] = useState(false);
  const [cols, setCols] = useState(4);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setCols(window.innerWidth < 768 ? 2 : 4);
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.metaKey ||
        event.ctrlKey ||
        window.getSelection()?.toString()
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "l":
          setIsGridView(false);
          break;
        case "g":
          setIsGridView(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const renderGridIntersections = () => {
    const rows = Math.ceil(portfolio.length / cols);
    const intersections = [];
    const horizontalPoints = cols + 1;
    const verticalPoints = rows + 1;

    for (let row = 0; row < verticalPoints; row++) {
      for (let col = 0; col < horizontalPoints; col++) {
        const isHighlighted = hoveredIndex !== null && (
          // Check if this intersection point is one of the four corners of the hovered item
          (row === Math.floor(hoveredIndex / cols) && col === hoveredIndex % cols) || // top-left
          (row === Math.floor(hoveredIndex / cols) && col === (hoveredIndex % cols) + 1) || // top-right
          (row === Math.floor(hoveredIndex / cols) + 1 && col === hoveredIndex % cols) || // bottom-left
          (row === Math.floor(hoveredIndex / cols) + 1 && col === (hoveredIndex % cols) + 1) // bottom-right
        );

        intersections.push(
          <div
            key={`intersection-${row}-${col}`}
            className={`absolute w-3 h-3 flex items-center justify-center transition-colors duration-200 ${
              isHighlighted ? 'text-[var(--color-primary)]' : 'text-gray-800 dark:text-gray-400'
            }`}
            style={{
              top: `${(row * 100) / rows}%`,
              left: col === 0 ? '0%' : 
                    col === horizontalPoints - 1 ? '100%' : 
                    `${(col * 100) / (cols)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            +
          </div>
        );
      }
    }

    return intersections;
  };

  return (
    <div className="py-5">
      <div className={`flex justify-between items-center ${!isGridView ? 'mb-6' : 'mb-8'}`}>
        <h2 className="text-lg font-bold cursor-default">
          Early partner to{" "}
          <span 
            className={`inline-block transition-all duration-300 ${
              isIconicHovered ? 'scale-110' : 'scale-100'
            }`}
            onMouseEnter={() => setIsIconicHovered(true)}
            onMouseLeave={() => setIsIconicHovered(false)}
          >
            iconic
          </span>{" "}
          companies
        </h2>
        {/* Only show toggle button on medium screens and up */}
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="hidden md:block text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          {isGridView ? '[L] List view' : '[G] Grid view'}
        </button>
      </div>

      <div className="relative">
        {/* Grid intersections (only show in grid view and on medium screens and up) */}
        {isGridView && (
          <div className="hidden md:block">
            {renderGridIntersections()}
          </div>
        )}
        
        {/* List view - Changed condition to show by default */}
        {(!isGridView) && (
          <div className="flex flex-col gap-4">
            {portfolio.map((client, index) => (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="flex items-center gap-2 text-sm group"
              >
                <span className="text-gray-800 dark:text-gray-400">+</span>
                <span className="group-hover:underline">{client.title}</span>
              </a>
            ))}
          </div>
        )}

        {/* Grid view */}
        {isGridView && (
          <div className="hidden md:grid grid-cols-4">
            {portfolio.map((client, index) => (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-28 relative flex items-center justify-center">
                  <img
                    src={client.icon}
                    alt={client.title}
                    className="h-8 w-auto object-contain group-hover:opacity-0 transition-opacity dark:invert hidden md:block"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center hidden md:flex">
                    {hoveredIndex === index ? (
                      <ScrambleText text={client.title} />
                    ) : (
                      <span className="text-2xl font-bold tracking-wide font-geist">
                        {client.title}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ScrambleText = ({ text }: { text: string }) => {
  const { ref } = useScramble({
    text,
    speed: 0.4,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 3,
  });

  return (
    <span ref={ref} className="text-2xl font-bold tracking-wide font-geist" />
  );
};