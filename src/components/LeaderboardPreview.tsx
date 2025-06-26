interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  medal?: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "DizzyTheFarmer", score: 10000, medal: "🥇" },
  { rank: 2, username: "CryptoBagHolder", score: 8750, medal: "🥈" },
  { rank: 3, username: "MemeKingpin", score: 7200, medal: "🥉" },
  { rank: 4, username: "DeFiDegen", score: 6850 },
  { rank: 5, username: "BagBrainiac", score: 6100 }
];

export default function LeaderboardPreview() {
  return (
    <div className="bg-black/90 border border-amber-500/40 rounded-lg p-4 min-w-[280px] max-w-[320px]">
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold glow-text mb-1">🧠 IQ Leaderboard</h3>
        <p className="text-sm text-amber-300/80">Top Brain Power Rankings</p>
      </div>
      
      <div className="space-y-2">
        {mockLeaderboard.map((entry) => (
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