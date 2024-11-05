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
Basecase writes the first check to builders who are still dreaming, tinkering,
and exploring what they want to create.

HOW I WORK
-----------
* I write the very first check into companies
* I lead rounds with $1-2M checks and don't take board seats
* I work with founders from early ideation through validation & product development
* I am often an early beta tester, active user, & paying customer of founders' products
* I provide tactical support by making customer & candidate introductions from pre-product to post-IPO

WHO I WORK WITH
---------------
I may be a good fit for you if:
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
* Browserbase - Headless browser infrastructure (browserbase.com)
* Default - Inbound lead platform (default.com)
* Diagram [Acquired by Figma] - Design tools
* Doss - Next-gen ERP (doss.com)
* Graphite - Developer productivity platform (graphite.dev)
* Mainframe - Generative computing (mainfra.me)
* Orb - Usage-based billing infrastructure (withorb.com)
* Pyroscope [Acquired by Grafana] - Open source profiling platform
* Replo - Tools for Shopify teams (replo.app)
* Resend - Email API (resend.com)
* SF Compute - Affordable pre-training clusters (sfcompute.com)
* Supabase - Open source Firebase alternative (supabase.com)
* Vercel - Frontend cloud (vercel.com)

QUOTES
------
"Alana is a rare breed of investor who genuinely cares to understand, use your
product, and recommend it. I still get great feedback from her and her network
to improve Vercel, Next.js, v0, and more."
- Guillermo Rauch, Founder & CEO, Vercel

"Alana is building something special at Basecase. What sets her apart is her
ability to get down into the details. She's constantly exploring new features,
helping us identify edge cases, and connecting us with developers."
- Paul Copplestone, Co-Founder & CEO, Supabase

"Having an investor who actually uses your product daily is rare. Alana's deep
understanding of developer tools has helped shape Resend's roadmap and her bug
reports are as detailed as they come. She's been an instrumental part of our
journey."
- Zeno Rocha, Founder & CEO, Resend

"Alana was the first check into Browserbase and has been an integral partner
to us since. She is always tinkering with the product, reporting bugs, and
jamming with the entire team to help us build a better product."
- Paul Klein IV, Founder & CEO, Browserbase

"Alana has a unique ability to believe in people before they believe in
themselves. She was the first check into Braintrust and has supported us in
hiring our first engineers, closing our first customers, and building a great
product."
- Ankur Goyal, Founder & CEO, Braintrust

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
