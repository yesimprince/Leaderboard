import { Search } from "lucide-react";

export default function FilterBar({ searchQuery, setSearchQuery, yearFilter, setYearFilter }) {
  return (
    <div className="
      bg-white/[0.03]
      border border-yellow-500/10
      rounded-2xl
      p-4
      backdrop-blur-xl
      flex flex-col
      gap-4
    ">

      <div className="flex gap-2">

        <button className="
          flex-1
          h-10
          rounded-xl
          bg-yellow-500
          text-black
          font-semibold
        ">
          CP King
        </button>

        <button className="
          flex-1
          h-10
          rounded-xl
          border border-white/10
        ">
          Alumni
        </button>

      </div>

      <div className="
        flex
        gap-2
        overflow-x-auto
        hide-scrollbar
      ">

        {[
          "All",
          "1st Year",
          "2nd Year",
          "3rd Year",
          "4th Year",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setYearFilter(item)}
            className={`
              whitespace-nowrap
              px-4
              h-9
              rounded-lg
              border
              text-sm
              ${yearFilter === item 
                ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500' 
                : 'border-white/10 text-white hover:bg-white/5'}
            `}
          >
            {item}
          </button>
        ))}

      </div>

      <div className="relative">

        <Search
          size={16}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-zinc-500
          "
        />

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search user..."
          className="
            w-full
            h-11
            rounded-xl
            bg-zinc-950
            border border-white/10
            pl-10
            pr-4
            text-sm
            outline-none
          "
        />

      </div>
    </div>
  );
}