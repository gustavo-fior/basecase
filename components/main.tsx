"use client"

import About from "./about";
import { Features } from "./features";
import GitHistory from "./git";
import { Hero } from "./hero";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";

export default function Main() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Hero />
      <Features />
      <About />
      <GitHistory />
      <Portfolio />
      <Quotes />
    </div>
  );
}
