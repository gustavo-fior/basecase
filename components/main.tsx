"use client"

import { Features } from "./features";
import { Hero } from "./hero";
import { Portfolio } from "./portfolio";
import { Quotes } from "./quotes";

export default function Main() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Hero />
      <Features />
      <Portfolio />
      <Quotes />
    </div>
  );
}
