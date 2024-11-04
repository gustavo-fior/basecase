import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Import the ASCII art from animation.tsx
const FULL_ASCII = `
██████╗  █████╗ ███████╗███████╗ ██████╗ █████╗ ███████╗███████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██████╔╝███████║███████╗█████╗  ██║     ███████║███████╗█████╗  
██╔══██╗██╔══██║╚════██║██╔══╝  ██║     ██╔══██║╚════██║██╔══╝  
██████╔╝██║  ██║███████║███████╗╚██████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝`;

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  
  if (userAgent.toLowerCase().includes('curl')) {
    const asciiResponse = `${FULL_ASCII}

A BUILDER BACKING BUILDERS
-------------------------
Basecase invests in founders before their companies exist. We write the first check 
to technical founders who are often still in the dreaming, building, and exploring 
phase of their journey.

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
+ You've built a company before and think may want to start another
+ You love building and think you want to build something of your own someday
+ You are thinking about what to do next and not sure whether to start a company or join one

We may not be the best fit for you if:
- You are already fundraising and we have never met before

PORTFOLIO
---------
* Ashby - Hiring software (ashbyhq.com)
* Astral - Python developer tools (astral.sh)
* Baseten - ML infrastructure (baseten.co)
* Braintrust - Enterprise AI stack (braintrustdata.com)
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

`
    return new NextResponse(asciiResponse, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}