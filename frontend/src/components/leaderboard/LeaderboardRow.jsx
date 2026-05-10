export default function LeaderboardRow({
  user,
}) {
  return (
    <div className="
      hidden md:flex
      items-center
      p-4
      border-b border-white/10
    ">

      <div className="w-16">
        #{user.rank}
      </div>

      <div className="flex-1">
        {user.name}
      </div>

      <div className="
        w-32
        text-right
        text-yellow-400
        font-bold
      ">
        {user.score}
      </div>

    </div>
  );
}