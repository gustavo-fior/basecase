"use client";

import { Hero } from "./hero";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";
import { About } from "./about";

export default function Content() {
  return (
    <div className="mx-auto">
      <Hero />
      <About />
      <Portfolio />
      <Quotes />
    </div>
  );
}
