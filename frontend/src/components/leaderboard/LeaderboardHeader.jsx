import { Link } from "react-router-dom";

export default function LeaderboardHeader() {
  return (
    <div className="
      flex
      flex-col
      md:flex-row
      gap-4
      md:items-center
      md:justify-between
    ">

      <div>

        <h1 className="
          text-3xl
          md:text-4xl
          font-bold
          font-mono
        ">
          CP King Leaderboard
        </h1>

        <p className="text-zinc-400">
          Track top competitive programmers in BIT Sindri
        </p>

      </div>

      <Link
        to="/register"
        className="
          h-12
          px-6
          rounded-xl
          bg-yellow-500
          text-black
          flex items-center
          justify-center
          font-bold
        "
      >
        Register Now
      </Link>

    </div>
  );
}