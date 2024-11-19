"use client";

import Navigation from "./nav";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <main className="px-4 max-w-4xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
