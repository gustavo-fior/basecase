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

A builder backing builders
-------------------------
Basecase invests in founders before their companies exist. We write the first check 
to technical founders who are often still in the dreaming, building, and exploring 
phase of their journey.

HOW WE WORK
-----------
* I don't take pitch meetings. My conviction comes before you have a deck.
* I write the very first check into companies
* I lead rounds with $1-2M checks and don't take board seats
* I work with founders from formation through ideation, validation, & product development
* I am often an early beta tester, active user, & paying customer of my founders' products
* I provide purely tactical support by making customer & candidate introductions

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