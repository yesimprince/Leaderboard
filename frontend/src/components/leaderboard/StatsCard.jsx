export default function StatsCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="
      bg-white/[0.03]
      border border-yellow-500/10
      rounded-2xl
      p-4
      backdrop-blur-xl
      flex items-center
      gap-4
    ">

      <div className="
        w-12 h-12
        rounded-xl
        bg-yellow-500/10
        text-yellow-400
        flex items-center justify-center
      ">
        <Icon size={22} />
      </div>

      <div>

        <p className="
          text-sm
          text-zinc-400
        ">
          {title}
        </p>

        <h3 className="
          text-xl
          font-bold
        ">
          {value}
        </h3>

      </div>
    </div>
  );
}