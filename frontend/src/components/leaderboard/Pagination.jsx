import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination() {
  return (
    <div className="
      flex
      flex-col
      sm:flex-row
      gap-4
      sm:items-center
      sm:justify-between
      p-4
      border-t border-white/10
      bg-white/[0.02]
    ">

      {/* Entries Info */}
      <p className="
        text-sm
        text-zinc-500
        text-center
        sm:text-left
      ">
        Showing 1 to 7 of 1432 entries
      </p>

      {/* Pagination Buttons */}
      <div className="
        flex
        items-center
        justify-center
        gap-2
      ">

        {/* Previous */}
        <button
          className="
            w-9 h-9
            rounded-lg
            border border-white/10
            bg-white/[0.03]
            flex items-center justify-center
            text-zinc-400
            hover:bg-white/[0.06]
            transition-all
          "
        >
          <ChevronLeft size={16} />
        </button>

        {/* Active Page */}
        <button
          className="
            w-9 h-9
            rounded-lg
            bg-yellow-500
            text-black
            font-semibold
          "
        >
          1
        </button>

        {/* Other Pages */}
        <button
          className="
            w-9 h-9
            rounded-lg
            border border-white/10
            bg-white/[0.03]
            hover:bg-white/[0.06]
            transition-all
          "
        >
          2
        </button>

        <button
          className="
            w-9 h-9
            rounded-lg
            border border-white/10
            bg-white/[0.03]
            hover:bg-white/[0.06]
            transition-all
          "
        >
          3
        </button>

        {/* Dots */}
        <div className="
          w-9 h-9
          flex items-center justify-center
          text-zinc-500
        ">
          ...
        </div>

        {/* Next */}
        <button
          className="
            w-9 h-9
            rounded-lg
            border border-white/10
            bg-white/[0.03]
            flex items-center justify-center
            text-zinc-400
            hover:bg-white/[0.06]
            transition-all
          "
        >
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
}