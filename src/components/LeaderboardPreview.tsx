import { useLeaderboard } from '../hooks/useLeaderboard';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  medal?: string;
}

export default function LeaderboardPreview() {
  const { topScores, isLoading, error, retry } = useLeaderboard();

  // Transform API data to display format with medals
  const leaderboardData: LeaderboardEntry[] = topScores.slice(0, 5).map((score, index) => ({
    rank: index + 1,
    username: score.username,
    score: score.score,
    medal: index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : undefined
  }));

  // Fallback data when server is unavailable
  const fallbackData: LeaderboardEntry[] = [
    { rank: 1, username: "DizzyTheFarmer", score: 10000, medal: "🥇" },
    { rank: 2, username: "Anonymous", score: 8750, medal: "🥈" },
    { rank: 3, username: "Anonymous", score: 7200, medal: "🥉" },
    { rank: 4, username: "Anonymous", score: 6850 },
    { rank: 5, username: "Anonymous", score: 6100 }
  ];

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/40 rounded-lg p-4 min-w-[280px] max-w-[320px]">
        <div className="text-center mb-3">
          <h3 className="text-xl font-bold glow-red mb-1">🧠 IQ Leaderboard</h3>
          <p className="text-sm text-red-300/80">Connection Error</p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xs opacity-70">{error.message || 'Failed to load leaderboard'}</p>
          <button
            onClick={retry}
            className="text-xs bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded px-3 py-1 transition-all"
          >
            🔄 Retry
          </button>
        </div>
        <div className="mt-3 pt-3 border-t border-red-500/20">
          <p className="text-xs text-red-300/60 text-center mb-2">Last Known Rankings:</p>
          <div className="space-y-1">
            {fallbackData.slice(0, 3).map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between p-1 rounded-md bg-black/20">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{entry.medal || `#${entry.rank}`}</span>
                  <span className="text-xs opacity-60 truncate max-w-[100px]">{entry.username}</span>
                </div>
                <span className="text-xs opacity-60">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-black/90 border border-amber-500/40 rounded-lg p-4 min-w-[280px] max-w-[320px]">
        <div className="text-center mb-3">
          <h3 className="text-xl font-bold glow-text mb-1">🧠 IQ Leaderboard</h3>
          <p className="text-sm text-amber-300/80">Loading Rankings...</p>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-700/20 rounded-md p-2">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-600/40 rounded w-24"></div>
                <div className="h-4 bg-gray-600/40 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayData = leaderboardData.length > 0 ? leaderboardData : fallbackData;

  return (
    <div className="bg-black/90 border border-amber-500/40 rounded-lg p-4 min-w-[280px] max-w-[320px]">
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold glow-text mb-1">🧠 IQ Leaderboard</h3>
        <p className="text-sm text-amber-300/80">
          {leaderboardData.length > 0 ? 'Top Brain Power Rankings' : 'Sample Rankings'}
        </p>
      </div>
      
      <div className="space-y-2">
        {displayData.map((entry) => (
          <div 
            key={entry.rank}
            className={`flex items-center justify-between p-2 rounded-md transition-all ${
              entry.rank === 1 
                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30' 
                : 'bg-black/40 hover:bg-black/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold min-w-[24px]">
                {entry.medal || `#${entry.rank}`}
              </span>
              <span className={`font-medium truncate max-w-[140px] ${
                entry.rank === 1 ? 'text-amber-300 glow-gold' : 'text-white'
              }`}>
                {entry.username}
              </span>
            </div>
            <span className={`text-sm font-bold ${
              entry.rank === 1 ? 'text-amber-400 glow-gold' : 'text-amber-200'
            }`}>
              {entry.score.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-amber-500/20 text-center">
        <p className="text-xs text-amber-300/60">
          Test your brain power to join the ranks!
        </p>
      </div>
    </div>
  );
}