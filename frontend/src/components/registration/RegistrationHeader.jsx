import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegistrationHeader() {
  return (
    <div className="
      flex items-center
      gap-3
      mb-6
    ">

      <Link
        to="/"
        className="
          w-10 h-10
          rounded-xl
          border border-white/10
          flex items-center justify-center
        "
      >
        <ArrowLeft size={18} />
      </Link>

      <div>

        <h1 className="
          text-2xl
          font-bold
          font-mono
        ">
          Join CP King
        </h1>

        <p className="
          text-sm
          text-zinc-400
        ">
          Register for leaderboard
        </p>

      </div>

    </div>
  );
}