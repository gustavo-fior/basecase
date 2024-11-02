"use client";
import { Star } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl mb-12">How I Work</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl mb-4 text-orange-500">
            I don&apos;t take pitch meetings
          </h3>
          <p className="text-lg mb-6">
            Most VCs want to see your pitch deck. We want to see your commit
            history.
          </p>
          <p className="text-gray-400">
            I&apos;m a solo GP who still writes code every day. Not because
            it&apos;s a credential, but because building things is in my DNA.
          </p>
        </div>
        <div className="space-y-4">
          {[
            "We write $1-2M checks as your first investor",
            "We get involved before you have a pitch deck",
            "We build genuine relationships that start with code, not cap tables",
            "We&apos;re active developers who understand your challenges firsthand",
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Star className="text-orange-500 shrink-0 w-5 h-5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
