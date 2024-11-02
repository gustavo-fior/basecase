"use client"

import About from "./about";
import GitHistory from "./git";
import { Hero } from "./hero";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";

export default function Main() {
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
