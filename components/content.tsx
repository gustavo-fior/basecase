"use client";

import { Hero } from "./hero";
import About from "./about";
import GitHistory from "./git";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";

export default function Content() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <Hero />
      <About />
      <GitHistory />
      <Portfolio />
      <Quotes />
    </div>
  );
}
