import { useState } from "react";
import PageGlow from "../components/common/PageGlow";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import FilterBar from "../components/leaderboard/FilterBar";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  return (
    <div className="
      min-h-screen
      bg-black
      text-white
      relative
      overflow-hidden
      px-4
      py-8
    ">

      <PageGlow />

      <div className="
        relative
        z-10
        max-w-6xl
        mx-auto
        flex flex-col
        gap-6
      ">

        <LeaderboardHeader />

        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
        />

        <LeaderboardTable 
          searchQuery={searchQuery}
          yearFilter={yearFilter}
        />

      </div>
    </div>
  );
}