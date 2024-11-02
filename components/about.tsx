"use client";

export default function About() {
  return (
    <div className="max-w-6xl py-10">
      <h2 className="text-2xl mb-8">A different way of working</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-6 text-orange-500">
            I don&apos;t take pitch meetings. My conviction comes before you
            have a deck.
          </p>
          <p className="text-gray-400">
            To build that conviction, I spend all of my time with people who are
            not yet starting companies. If we haven&apos;t met yet and
            you&apos;re already fundraising, I probably won&apos;t be the right
            investor for you.
          </p>
        </div>
        <div className="space-y-4">
          {[
            "I write the very first check into companies",
            "I lead rounds with $1-2M checks",
            "I don't take board seats",
            "I work with founders through ideation, validation, and scaling",
            "I am often an early beta tester, active user, and true champion of my founders' products",
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3">
              <span>* {item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
