"use client";

import Content from "./content";
import CTA from "./cta";
import Marquee from "./marquee";
import Navigation from "./nav";

export default function HomePage() {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <div className="px-4 max-w-5xl mx-auto">
        <Content />
        <CTA />
      </div>
      <Marquee />
    </div>
  );
}