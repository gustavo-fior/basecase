"use client";

import { Hero } from "./hero";
import About from "./about";
import Code from "./code";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";

export default function Content() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Hero />
      <About />
      <Code />
      <Portfolio />
      <Quotes />
    </div>
  );
}
