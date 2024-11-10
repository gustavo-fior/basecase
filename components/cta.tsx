"use client";

import Balancer from "react-wrap-balancer";

export default function CTA() {
  return (
    <div className="mx-auto px-4 py-5 text-center">
      <h2 className="text-xl md:text-2xl">
        <Balancer>
          too early to talk to an investor?
          <br />
          <a
            href="https://x.com/alanaagoyal"
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            talk to a developer.
          </a>
        </Balancer>
      </h2>
    </div>
  );
}
