import React, { useState, useEffect } from "react";
import { GitCommit, X, Minus, Maximize2, Minimize2 } from "lucide-react";

interface Commit {
  id: string;
  message: string;
  repo: string;
  timestamp: Date;
}

interface GitHubRepo {
  full_name: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

export const GitHistory: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const fetchCommits = async () => {
      setIsRefreshing(true);
      try {
        const response = await fetch(
          "https://api.github.com/user/repos?per_page=100",
          {
            headers: {
              Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `GitHub API responded with status ${response.status}`
          );
        }

        const repos = await response.json();

        if (!Array.isArray(repos)) {
          throw new Error("GitHub API did not return an array of repositories");
        }

        const allCommits = await Promise.all(
          repos.map(async (repo: GitHubRepo) => {
            try {
              const commitsResponse = await fetch(
                `https://api.github.com/repos/${repo.full_name}/commits?per_page=10`,
                {
                  headers: {
                    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                    Accept: "application/vnd.github.v3+json",
                  },
                }
              );

              if (!commitsResponse.ok) {
                console.warn(
                  `Failed to fetch commits for ${repo.full_name}:`,
                  await commitsResponse.json()
                );
                return [];
              }

              const commits = await commitsResponse.json();
              return commits.map((commit: GitHubCommit) => ({
                id: commit.sha,
                message: commit.commit.message,
                repo: repo.full_name,
                timestamp: new Date(commit.commit.author.date),
              }));
            } catch (error) {
              console.warn(
                `Error fetching commits for ${repo.full_name}:`,
                error
              );
              return [];
            }
          })
        );

        const flattenedCommits = allCommits
          .flat()
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 30);

        setCommits(flattenedCommits);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching commits:", err);
        setError("Failed to load commit history");
        setLoading(false);
      }
      setTimeout(() => setIsRefreshing(false), 1000);
    };

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setLastUpdated(new Date());
      setTimeout(() => setIsBlinking(false), 1000);
    }, 3000); // Blink every 3 seconds

    fetchCommits();
    const fetchInterval = setInterval(fetchCommits, 300000); // Refresh every 5 minutes

    return () => {
      clearInterval(fetchInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  if (loading) {
    return (
      <>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black">
          <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 p-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">Git Activity</span>
              <span className="h-4"></span>
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
            </div>
          </div>

          <div className="p-4 space-y-3 h-[400px] overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="pl-6">
                  <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-5"></div>
      </>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-white dark:bg-black">
        <div className="text-red-600 dark:text-red-500">{error}</div>
      </div>
    );
  }

  if (isClosed) {
    return null;
  }

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 w-48 h-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-lg cursor-pointer hover:scale-105 transition-all duration-200 z-50"
      >
        <div className="h-full flex items-center space-x-2 px-3">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 font-geist">
            Git Activity
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          isFullscreen ? "fixed inset-0 z-50 flex flex-col overflow-hidden" : ""
        } border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black`}
      >
        <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 p-3">
          <div className="flex space-x-2">
            <div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer flex items-center justify-center group"
              onClick={() => setIsClosed(true)}
            >
              <X
                size={8}
                className="text-red-800 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer flex items-center justify-center group"
              onClick={() => setIsMinimized(true)}
            >
              <Minus
                size={8}
                className="text-yellow-800 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div
              className="w-3 h-3 rounded-full bg-green-500 cursor-pointer flex items-center justify-center group"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2
                  size={8}
                  className="text-green-800 opacity-0 group-hover:opacity-100 transform -rotate-90"
                />
              ) : (
                <Maximize2
                  size={8}
                  className="text-green-800 opacity-0 group-hover:opacity-100 transform -rotate-90"
                />
              )}
            </div>
          </div>
          <div className="flex items-center flex-wrap">
            <a
              href="https://github.com/alanagoyal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm cursor-pointer hover:text-gray-800 dark:hover:text-gray-300 mr-1"
            >
              Git Activity
            </a>
            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400 mr-1">
              (Updated{" "}
              <span className="hidden sm:inline">
                {lastUpdated.toLocaleDateString()}
              </span>{" "}
              <span className="hidden sm:inline">
                {lastUpdated.toLocaleTimeString()}
              </span>
              )
            </span>
            <div
              className={`w-2 h-2 rounded-full ${
                isRefreshing || isBlinking
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-gray-400 dark:bg-gray-500"
              }`}
            />
          </div>
        </div>

        <div
          className={`p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800 scrollbar-track-transparent ${
            isFullscreen ? "flex-1" : "max-h-[400px]"
          }`}
        >
          {commits.map((commit) => (
            <div key={commit.id} className="space-y-0.5">
              <div className="flex items-center space-x-2 text-xs text-pink-300">
                <GitCommit size={12} />
                <span className="font-bold text-pink-300">{commit.repo}</span>
                <span className="text-gray-600 dark:text-gray-500">
                  {commit.timestamp.toLocaleDateString()}{" "}
                  <span className="hidden sm:inline">
                    {commit.timestamp.toLocaleTimeString()}
                  </span>
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 pl-6 text-xs">
                {commit.message}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-5"></div>
    </>
  );
};

export default GitHistory;
