export default function RegistrationInput({
  label,
  icon: Icon,
  ...props
}) {
  return (
    <div className="
      flex flex-col
      gap-2
    ">

      <label className="
        text-xs
        uppercase
        tracking-widest
        text-zinc-500
      ">
        {label}
      </label>

      <div className="relative">

        <Icon
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
          className="
            w-full
            h-12
            rounded-xl
            bg-zinc-950
            border border-white/10
            pl-10
            pr-4
            text-sm
            outline-none
          "
          {...props}
        />

      </div>
    </div>
  );
}