"use client";

import AsciiAnimation from "./animation";
import Content from "./content";
import CTA from "./cta";
import Navigation from "./nav";

export default function HomePage() {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <div className="max-w-6xl px-4 mx-auto">
        <Content />
        <CTA />
        <AsciiAnimation />
      </div>
    </div>
  );
}