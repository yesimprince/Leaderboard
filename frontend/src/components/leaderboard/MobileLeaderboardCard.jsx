export default function MobileLeaderboardCard({
  user,
}) {
  return (
    <div className="
      md:hidden
      p-4
      border-b border-white/10
      flex
      items-center
      justify-between
    ">

      <div className="flex gap-3 items-center">

        <div className="
          w-10 h-10
          rounded-full
          bg-yellow-500/10
          border border-yellow-500/20
          flex items-center justify-center
          text-yellow-400
          font-bold
        ">
          #{user.rank}
        </div>

        <div>

          <div className="font-semibold">
            {user.name}
          </div>

          <div className="
            text-xs
            text-zinc-500
          ">
            {user.leetcode}
          </div>

        </div>
      </div>

      <div className="
        text-yellow-400
        font-bold
      ">
        {user.score}
      </div>

    </div>
  );
}