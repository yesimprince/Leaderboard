export default function RegistrationSelect({
  label,
  options,
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

      <select
        className="
          w-full
          h-12
          rounded-xl
          bg-zinc-950
          border border-white/10
          px-4
          text-sm
          outline-none
        "
        {...props}
      >

        {options.map((item) => (
          <option key={item}>
            {item}
          </option>
        ))}

      </select>
    </div>
  );
}