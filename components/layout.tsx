"use client";

import Navigation from "./nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <div className="px-4 max-w-4xl mx-auto mb-8">
        {children}
      </div>
    </div>
  );
}
