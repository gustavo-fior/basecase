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

A BUILDER BACKING BUILDERS
-------------------------
Basecase invests in founders before their companies exist. We write the
first check to technical founders who are often still dreaming, building, and
exploring what they want to build. And we're building too.
      

HOW WE WORK
-----------
* We write the very first check into companies
* We lead rounds with $1-2M checks and don't take board seats
* We work with founders from early ideation through validation & product development
* We are often an early beta tester, active user, & paying customer of founders' products
* We provide tactical support by making customer & candidate introductions from pre-product to post-IPO

WHO WE WORK WITH
---------------
We may be a good fit for you if:
+ You're obsessed with building, tinkering, and creating your ideas
+ You've built a company before and think may want to start another
+ You're thinking about what to do next but not sure whether you want to start a company or join one
+ You love trying new products, discovering new markets, and thinking about the direction the world is going

PORTFOLIO
---------
* Ashby - Hiring software (ashbyhq.com)
* Astral - Python developer tools (astral.sh)
* Baseten - ML infrastructure (baseten.co)
* Braintrust - Enterprise AI stack (braintrust.dev)
* Browserbase - Headless browser platform (browserbase.com)
* Codeium - AI code acceleration (codeium.com)
* Default - Inbound lead platform (default.com)
* Diagram - [Acquired by Figma] Design tools
* Doss - Operations platform (doss.com)
* Graphite - Code review platform (graphite.dev)
* Orb - Usage-based billing (withorb.com)
* Pyroscope - [Acquired by Grafana] Profiling platform
* Replo - Shopify customization (replo.app)
* Resend - Email API (resend.com)
* Supabase - Open source Firebase alternative (supabase.com)
* Vercel - Frontend cloud (vercel.com)

LINKS
-----
[G] GitHub  : https://github.com/alanagoyal
[T] Twitter : https://x.com/alanaagoyal
[W] Website : https://alanagoyal.com

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
