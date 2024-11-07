import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Import the ASCII art from animation.tsx
const FULL_ASCII = `
██████╗  █████╗ ███████╗███████╗ ██████╗ █████╗ ███████╗███████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██████╔╝███████║███████╗█████╗  ██║     ███████║███████╗█████╗  
██╔══██╗██╔══██║╚════██║██╔══╝  ██║     ██╔══██║╚════██║██╔══╝  
██████╔╝██║  ██║███████║███████╗╚██████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝`;

const FULL_CONTENT = `${FULL_ASCII}

FIRST CHECK TO FUTURE FOUNDERS
------------------------------
Basecase writes the first check to builders who are still dreaming, tinkering, and exploring what they want to create.

HOW I WORK
-----------
* I write the very first check into companies
* I lead rounds with $1-2M checks, no board seat
* I work with founders pre-traction, pre-product, and pre-idea
* I am often an early beta tester, active user, and paying customer of the products founders build
* I put my network to work for founders, making introductions to candidates, customers, and investors
* I spend most of my time with people who have not yet started companies and don't take pitch meetings

WHO I WORK WITH
---------------
+ Former founders who are driven to make a comeback
+ Solo founders who've been told they need a co-founder
+ Underdogs who feel deeply compelled to prove people wrong
+ Builders who can't help themselves from bringing ideas to life
+ Futurists who have strong convictions about where the world is going
+ Anyone who has been told they are too intense, too curious, or too impatient

PORTFOLIO
---------
* Ashby - Hiring software (ashbyhq.com)
* Astral - Python developer tools (astral.sh)
* Baseten - ML infrastructure (baseten.co)
* Braintrust - Enterprise AI stack (braintrust.dev)
* Browserbase - Headless browser infrastructure (browserbase.com)
* Default - Inbound lead platform (default.com)
* Doss - Next-gen ERP (doss.com)
* Graphite - Developer productivity platform (graphite.dev)
* Mainframe - Generative computing (mainfra.me)
* Orb - Usage-based billing infrastructure (withorb.com)
* Replo - Tools for Shopify teams (replo.app)
* Resend - Email API (resend.com)
* SF Compute - Affordable pre-training clusters (sfcompute.com)
* Supabase - Open source Firebase alternative (supabase.com)
* Vercel - Frontend cloud (vercel.com)

LINKS
-----
[W] Website : https://alanagoyal.com
[T] Twitter : https://x.com/alanaagoyal
[G] GitHub  : https://github.com/alanagoyal

Made with ♥ by Alana Goyal

`;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  // Handle curl requests for both apex and www domains
  if (userAgent.toLowerCase().includes("curl")) {
    // Return the ASCII content directly for both domains
    return new NextResponse(FULL_CONTENT, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // For non-curl requests, proceed with normal routing
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
