"use client";

const BASECASE_ASCII = `
██████╗  █████╗ ███████╗███████╗ ██████╗ █████╗ ███████╗███████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██████╔╝███████║███████╗█████╗  ██║     ███████║███████╗█████╗
██╔══██╗██╔══██║╚════██║██╔══╝  ██║     ██╔══██║╚════██║██╔══╝
██████╔╝██║  ██║███████║███████╗╚██████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝
`;

export const Hero = () => {
  return (
    <div className="max-w-3xl py-10">
      <div className="font-mono">
        <pre className="whitespace-pre text-base">
          <span className="font-bold text-purple-600">alanagoyal@Alanas-MacBook-Air basecase %</span>
          {" curl -L https://basecase.sh"}
        </pre>
        <pre className="font-mono whitespace-pre text-purple-600 mb-8">
          {BASECASE_ASCII}
        </pre>
      </div>
      <h1 className="text-2xl text-purple-600 md:text-black font-bold">
        A builder backing builders
      </h1>
      <p className="text-xl">
        Basecase invests in founders before their companies exist. We write the
        first check to technical founders who are often still in the dreaming,
        building, and exploring phase of their journey.
      </p>
    </div>
  );
};
