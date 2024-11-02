"use client";

import AsciiAnimation from "./animation";
import Content from "./content";
import Footer from "./footer";
import { Navigation } from "./nav";

export default function HomePage() {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <div className="max-w-6xl px-4 mx-auto">
        <Content />
        <Footer />
        <AsciiAnimation />
      </div>
    </div>
  );
}
