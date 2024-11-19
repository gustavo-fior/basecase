"use client";

import { Hero } from "./hero";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";
import { About } from "./about";
import CTA from "./cta";

export default function HomePage() {
  return (
    <div className="mx-auto">
      <Hero />
      <About />
      <Portfolio />
      <Quotes />
      <CTA />
    </div>
  );
}
