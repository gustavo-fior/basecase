"use client";

export const Portfolio = () => {
  const portfolio = [
    {
      title: "ashby",
      icon: "/portfolio/ashby.png",
      description:
        "ashby helps scaling companies achieve their ambitious growth targets. with ashby, teams of all sizes can run a fast and efficient hiring process.",
      url: "https://www.ashbyhq.com/",
    },
    {
      title: "astral",
      icon: "/portfolio/astral.png",
      description:
        "astral's mission is to make the python ecosystem more productive by building high-performance developer tools, starting with ruff.",
      url: "https://www.astral.sh/",
    },
    {
      title: "baseten",
      icon: "/portfolio/baseten.png",
      description:
        "baseten provides all the infrastructure you need to deploy and serve ml models performantly, scalably, and cost-efficiently.",
      url: "https://www.baseten.co/",
    },
    {
      title: "braintrust",
      icon: "/portfolio/braintrust.png",
      description:
        "braintrust is the enterprise-grade stack for building ai products. from evaluations, to prompt playground, to data management, braintrust takes uncertainty and tedium out of incorporating ai into your business.",
      url: "https://www.braintrustdata.com/",
    },
    {
      title: "browserbase",
      icon: "/portfolio/browserbase.png",
      description:
        "browserbase is the all-in-one platform developers need to host, manage, and monitor headless browsers in the cloud.",
      url: "https://www.browserbase.com/",
    },
    {
      title: "codeium",
      icon: "/portfolio/codeium.png",
      description:
        "codeium is the modern coding superpower, a code acceleration toolkit built on cutting edge ai technology.",
      url: "https://codeium.com/",
    },
    {
      title: "default",
      icon: "/portfolio/default.png",
      description:
        "default is the all-in-one inbound lead platform that helps modern companies make the most of every lead by consolidating the usually fragmented inbound sales stack into one deeply integrated platform.",
      url: "https://www.default.com/",
    },
    {
      title: "diagram",
      icon: "/portfolio/diagram.png",
      description: (
        <>
          <span className="text-plum text-sm block mb-2 lowercase">
            acquired by figma
          </span>
          diagram is a design tools company reimagining ui design in the era of
          generative ai.
        </>
      ),
      url: "https://diagram.com/",
    },
    {
      title: "doss",
      icon: "/portfolio/doss.png",
      description:
        "doss is a lightweight erp and data platform that helps teams manage their operations from purchase order to point of sale.",
      url: "https://doss.com/",
    },
    {
      title: "graphite",
      icon: "/portfolio/graphite.png",
      description:
        "graphite is a fast, simple code review platform designed for engineers who want to write and review smaller pull requests, stay unblocked, and ship faster.",
      url: "https://graphite.dev/",
    },
    {
      title: "orb",
      icon: "/portfolio/orb.png",
      description:
        "orb is developer-first billing infrastructure built to help companies succeed with usage-based pricing.",
      url: "https://www.withorb.com/",
    },
    {
      title: "pyroscope",
      icon: "/portfolio/pyroscope.png",
      description: (
        <>
          <span className="text-plum text-sm block mb-2 lowercase">
            acquired by grafana
          </span>
          pyroscope is an open source continuous profiling platform that helps
          you find performance issues in your code, locate and fix memory leaks,
          and track changes over time.
        </>
      ),
      url: "https://pyroscope.io/",
    },
    {
      title: "replo",
      icon: "/portfolio/replo.png",
      description:
        "replo is the fastest way to modify, customize, and build on every part of your shopify store pages, down to the pixel.",
      url: "https://www.replo.app/",
    },
    {
      title: "resend",
      icon: "/portfolio/resend.png",
      description:
        "resend is the email api for developers to build, test, and deliver transactional emails at scale.",
      url: "https://resend.com/",
    },
    {
      title: "supabase",
      icon: "/portfolio/supabase.png",
      description:
        "supabase is an open source firebase alternative. start your project with a postgres database, authentication, instant apis, edge functions, realtime subscriptions, and storage.",
      url: "https://supabase.com/",
    },
    {
      title: "vercel",
      icon: "/portfolio/vercel.png",
      description:
        "vercel's frontend cloud provides the developer experience and infrastructure to build, scale, and secure a faster, more personalized web.",
      url: "https://vercel.com/",
    },
  ];

  return (
    <div className="mt-20">
      <h2 className="text-2xl mb-8">Early partner to iconic companies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {portfolio.map((client, index) => (
          <a
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="cursor-default"
          >
            <div className="border border-gray-800 hover:border-orange-500 p-8 rounded flex items-center justify-center group relative">
              <img 
                src={client.icon} 
                alt={client.title} 
                className="h-8 group-hover:opacity-0 transition-opacity" 
              />
              <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center">
                <span className="text-sm">{client.title}</span>
                {typeof client.description === 'object' && (
                  <span className="text-orange-500 text-xs mt-1">
                    {client.description.props.children[0].props.children}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
