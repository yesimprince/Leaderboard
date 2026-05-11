import { useState, useEffect } from "react";
import LeaderboardRow from "./LeaderboardRow";
import MobileLeaderboardCard from "./MobileLeaderboardCard";

export default function LeaderboardTable({ searchQuery, yearFilter }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("https://leaderboard-tojd.onrender.com/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-zinc-400">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  const filteredData = leaderboardData.filter((user) => {
    const matchesSearch = (user.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (user.uniqueUsername || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    // Some users might have '1' instead of '1st Year' from the old backend code, so we handle both
    const yearMatch = yearFilter === "All" || 
                      user.year === yearFilter || 
                      user.year === yearFilter.replace("st Year", "").replace("nd Year", "").replace("rd Year", "").replace("th Year", "");
    
    return matchesSearch && yearMatch;
  });

  return (
    <div className="
      bg-white/[0.03]
      border border-yellow-500/10
      rounded-2xl
      overflow-hidden
      backdrop-blur-xl
    ">

      {/* Desktop Header */}
      <div className="
        hidden md:flex
        p-4
        border-b border-white/10
        text-zinc-400
        text-sm
      ">

        <div className="w-16">Rank</div>

        <div className="flex-1">
          Programmer
        </div>

        <div className="w-32 text-right">
          Score
        </div>

      </div>

      {filteredData.length === 0 ? (
        <div className="text-center p-8 text-zinc-400">No users found matching your filters.</div>
      ) : (
        filteredData.map((user, idx) => {
          // Keep original rank or re-calculate rank based on filtered order
          const displayRank = user.rank || idx + 1;
          return (
            <div key={user._id || displayRank}>
              <MobileLeaderboardCard user={{...user, rank: displayRank}} />
              <LeaderboardRow user={{...user, rank: displayRank}} />
            </div>
          );
        })
      )}

    </div>
  );
}