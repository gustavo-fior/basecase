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

const GitHistory: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/alanagoyal/events/public"
        );
        const data: GitHubEvent[] = await response.json();

        const pushEvents = data
          .filter((event: GitHubEvent) => event.type === "PushEvent")
          .slice(0, 5)
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
      } catch (err) {
        setError("Failed to load commit history");
        setLoading(false);
      }
    };

    fetchCommits();
    const interval = setInterval(fetchCommits, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="border border-gray-800 rounded-lg p-6 bg-black">
        <div className="flex items-center space-x-2 text-emerald-500">
          <Clock size={16} className="animate-spin" />
          <span>Loading commit history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-800 rounded-lg p-6 bg-black">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-800 rounded-lg bg-black">
      <div className="flex items-center space-x-2 border-b border-gray-800 p-3">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <a
          href="https://github.com/alanagoyal"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-gray-400 cursor-pointer hover:text-gray-300"
        >
          Commit history (last updated {new Date().toLocaleTimeString()})
        </a>
      </div>

      <div className="p-4 space-y-4">
        {commits.map((commit) => (
          <div key={commit.id} className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-emerald-500">
              <GitCommit size={14} />
              <span className="font-bold">{commit.repo.split("/")[1]}</span>
              <span className="text-gray-500">
                {commit.timestamp.toLocaleDateString()}{" "}
                {commit.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-300 pl-6">{commit.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHistory;
