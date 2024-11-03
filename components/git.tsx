import React, { useState, useEffect } from "react";
import { GitCommit, Clock } from "lucide-react";

interface Commit {
  id: string;
  message: string;
  repo: string;
  timestamp: Date;
}

interface GitHubCommit {
  sha: string;
  message: string;
}

interface GitHubPayload {
  commits: GitHubCommit[];
}

interface GitHubRepo {
  name: string;
}

interface GitHubEvent {
  type: string;
  payload: GitHubPayload;
  repo: GitHubRepo;
  created_at: string;
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
          "https://api.github.com/users/alanagoyal/events/public"
        );
        const data: GitHubEvent[] = await response.json();

        const pushEvents = data
          .filter((event: GitHubEvent) => event.type === "PushEvent")
          .slice(0, 30)
          .flatMap((event: GitHubEvent) =>
            event.payload.commits.map((commit) => ({
              id: commit.sha,
              message: commit.message,
              repo: event.repo.name,
              timestamp: new Date(event.created_at),
            }))
          );

        setCommits(pushEvents);
        setLoading(false);
      } catch {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  if (loading) {
    return (
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-black">
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-500">
          <Clock size={16} className="animate-spin" />
          <span>Loading commit history...</span>
        </div>
      </div>
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
        className="fixed bottom-4 right-4 w-48 h-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-lg cursor-pointer hover:scale-105 transition-all duration-200"
      >
        <div className="h-full flex items-center space-x-2 px-3">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400 font-geist">Git History</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${
      isFullscreen 
        ? 'fixed inset-0 z-50 flex flex-col overflow-hidden' 
        : ''
      } border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-black`}>
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 p-3">
        <div 
          className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" 
          onClick={() => setIsClosed(true)} 
        />
        <div 
          className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" 
          onClick={() => setIsMinimized(true)} 
        />
        <div 
          className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" 
          onClick={() => setIsFullscreen(!isFullscreen)} 
        />
        <div className="flex items-center">
          <a
            href="https://github.com/alanagoyal"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-300"
          >
            Commit history (last updated {lastUpdated.toLocaleTimeString()})
          </a>
          <div
            className={`ml-2 w-2 h-2 rounded-full ${
              isRefreshing || isBlinking
                ? "bg-emerald-500 animate-pulse"
                : "bg-gray-400 dark:bg-gray-500"
            }`}
          />
        </div>
      </div>

      <div className={`p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800 scrollbar-track-transparent ${
        isFullscreen ? 'flex-1' : 'max-h-[400px]'
      }`}>
        {commits.map((commit) => (
          <div key={commit.id} className="space-y-0.5">
            <div className="flex items-center space-x-2 text-xs text-pink-300">
              <GitCommit size={12} />
              <span className="font-bold text-pink-300">{commit.repo}</span>
              <span className="text-gray-600 dark:text-gray-500">
                {commit.timestamp.toLocaleDateString()}{" "}
                {commit.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 pl-6 text-xs">{commit.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHistory;
