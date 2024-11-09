"use client";

import { useState, useEffect } from "react";
import { useScramble } from "use-scramble";

const getDomainFromUrl = (url: string) => {
  const domain = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  return domain.charAt(0).toUpperCase() + domain.slice(1);
};

export const Portfolio = () => {
  const portfolio = [
    {
      title: "Ashby",
      icon: "/portfolio/ashby.png",
      description:
        "Ashby helps scaling companies achieve their ambitious growth targets. With Ashby, teams of all sizes can run a fast and efficient hiring process.",
      url: "https://www.ashbyhq.com/",
      status: null,
    },
    {
      title: "Astral",
      icon: "/portfolio/astral.png",
      description:
        "Astral's mission is to make the Python ecosystem more productive by building high-performance developer tools, starting with Ruff.",
      url: "https://www.astral.sh/",
      status: null,
    },
    {
      title: "Baseten",
      icon: "/portfolio/baseten.png",
      description:
        "Baseten provides all the infrastructure you need to deploy and serve ML models performantly, scalably, and cost-efficiently.",
      url: "https://www.baseten.co/",
      status: null,
    },
    {
      title: "Braintrust",
      icon: "/portfolio/braintrust.png",
      description:
        "Braintrust is the enterprise-grade stack for building AI products. From evaluations, to prompt playground, to data management, Braintrust takes uncertainty and tedium out of incorporating AI into your business.",
      url: "https://www.braintrust.dev/",
      status: null,
    },
    {
      title: "Browserbase",
      icon: "/portfolio/browserbase.png",
      description:
        "Browserbase is the all-in-one platform developers need to host, manage, and monitor headless browsers in the cloud.",
      url: "https://www.browserbase.com/",
      status: null,
    },
    {
      title: "Default",
      icon: "/portfolio/default.png",
      description:
        "Default is the all-in-one inbound lead platform that helps modern companies make the most of every lead by consolidating the usually fragmented inbound sales stack into one deeply integrated platform.",
      url: "https://www.default.com/",
      status: null,
    },
    {
      title: "Diagram",
      icon: "/portfolio/diagram.png",
      description:
        "Diagram is a design tools company reimagining UI design in the era of generative AI.",
      url: "https://diagram-figma.webflow.io/",
      status: "Acquired by Figma",
    },
    {
      title: "Doss",
      icon: "/portfolio/doss.png",
      description:
        "Doss is a lightweight ERP and data platform that helps teams manage their operations from purchase order to point of sale.",
      url: "https://doss.com/",
      status: null,
    },
    {
      title: "Graphite",
      icon: "/portfolio/graphite.png",
      description:
        "Graphite is a fast, simple code review platform designed for engineers who want to write and review smaller pull requests, stay unblocked, and ship faster.",
      url: "https://graphite.dev/",
      status: null,
    },
    {
      title: "Mainframe",
      icon: "/portfolio/mainframe.png",
      description:
        "Mainframe's mission is to change the world's relationship with computers.",
      url: "https://mainfra.me/",
      status: null,
    },
    {
      title: "Orb",
      icon: "/portfolio/orb.png",
      description:
        "Orb is developer-first billing infrastructure built to help companies succeed with usage-based pricing.",
      url: "https://www.withorb.com/",
      status: null,
    },
    {
      title: "Pyroscope",
      icon: "/portfolio/pyroscope.png",
      description:
        "Pyroscope is an open source continuous profiling platform that helps you find performance issues in your code, locate and fix memory leaks, and track changes over time.",
      url: "https://pyroscope.io/",
      status: "Acquired by Grafana",
    },
    {
      title: "Resend",
      icon: "/portfolio/resend.png",
      description:
        "Resend is the email API for developers to build, test, and deliver transactional emails at scale.",
      url: "https://resend.com/",
      status: null,
    },
    {
      title: "SF Compute",
      icon: "/portfolio/sfcompute.png",
      description:
        "SF Compute runs affordable pre-training clusters for startups, grad students, and research labs.",
      url: "https://sfcompute.com/",
      status: null,
    },
    {
      title: "Supabase",
      icon: "/portfolio/supabase.png",
      description:
        "Supabase is an open source Firebase alternative. Start your project with a Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, and storage.",
      url: "https://supabase.com/",
      status: null,
    },
    {
      title: "Vercel",
      icon: "/portfolio/vercel.png",
      description:
        "Vercel's frontend cloud provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.",
      url: "https://vercel.com/",
      status: null,
    },
  ];

  const ITEM_HEIGHT = 112; // Height of each grid item in pixels
  const GRID_COLS = 4;
  const gridRows = Math.ceil(portfolio.length / GRID_COLS);
  const totalHeight = ITEM_HEIGHT * gridRows;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isIconicHovered, setIsIconicHovered] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

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
    const rows = Math.ceil(portfolio.length / 4);
    const intersections = [];
    const horizontalPoints = 4 + 1;
    const verticalPoints = rows + 1;

    for (let row = 0; row < verticalPoints; row++) {
      for (let col = 0; col < horizontalPoints; col++) {
        const isHighlighted = hoveredIndex !== null && (
          // Check if this intersection point is one of the four corners of the hovered item
          (row === Math.floor(hoveredIndex / 4) && col === hoveredIndex % 4) || // top-left
          (row === Math.floor(hoveredIndex / 4) && col === (hoveredIndex % 4) + 1) || // top-right
          (row === Math.floor(hoveredIndex / 4) + 1 && col === hoveredIndex % 4) || // bottom-left
          (row === Math.floor(hoveredIndex / 4) + 1 && col === (hoveredIndex % 4) + 1) // bottom-right
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
                    `${(col * 100) / 4}%`,
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
    <div className="py-10">
      <div className={`flex justify-between items-center mb-8`}>
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
          className="hidden md:block text-sm px-1.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
        >
          {isGridView ? '[L] List view' : '[G] Grid view'}
        </button>
      </div>

      <div className="relative" style={{ height: totalHeight }}>
        {/* Grid intersections - only show on md and up when in grid view */}
        {isGridView && (
          <div className="hidden md:block">
            {renderGridIntersections()}
          </div>
        )}
        
        {/* List view - show on mobile OR when list view is selected */}
        <div 
          className={`flex flex-col ${isGridView ? 'md:hidden' : ''}`}
          style={{ height: totalHeight }}
        >
          {portfolio.map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm"
              style={{ height: `${totalHeight / portfolio.length}px` }}
            >
              <span className="text-gray-800 dark:text-gray-400">+</span>
              <div className="flex items-center gap-1">
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="text-sm underline md:hidden">
                    {client.title}
                  </span>
                  <span className="hidden md:inline">
                    {hoveredIndex === index ? (
                      <ScrambleText 
                        text={client.title === "Diagram" ? "Diagram.com" : getDomainFromUrl(client.url)} 
                        className="text-sm underline text-[var(--color-primary)]"
                      />
                    ) : (
                      <span className="text-sm underline">
                        {client.title}
                      </span>
                    )}
                  </span>
                </a>
                {client.status && (
                  <span className="text-sm text-gray-500">
                    ({client.status})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Grid view - only show on md and up when grid view is selected */}
        {isGridView && (
          <div 
            className="hidden md:grid md:grid-cols-4"
            style={{ height: totalHeight }}
          >
            {portfolio.map((client, index) => (
              <a
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="cursor-pointer group"
                style={{ height: '112px' }}
              >
                <div className="h-full relative flex items-center justify-center">
                  <img
                    src={client.icon}
                    alt={client.title}
                    className="h-8 w-auto object-contain group-hover:opacity-0 transition-opacity dark:invert hidden md:block"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center hidden md:flex">
                    {hoveredIndex === index ? (
                      <ScrambleText text={client.title} className="text-2xl font-bold tracking-wide font-geist" />
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

const ScrambleText = ({ text, className = "text-2xl font-bold tracking-wide font-geist" }: { text: string, className?: string }) => {
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