"use client";

import Content from "./content";
import CTA from "./cta";
import Navigation from "./nav";

export default function HomePage() {
  return (
    <div className="min-h-screen font-mono mb-8">
      <Navigation />
      <div className="px-4 max-w-4xl mx-auto">
        <Content />
        <CTA />
      </div>
    </div>
  );
}