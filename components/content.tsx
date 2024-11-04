"use client";

import { Hero } from "./hero";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";
import { About } from "./about";
import { GitHistory } from "./git";

export default function Content() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <Hero />
      <GitHistory />
      <About />
      <Portfolio />
      <Quotes />
    </div>
  );
}
