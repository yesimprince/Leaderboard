export default function Button({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        h-12
        px-5
        rounded-xl
        font-semibold
        transition-all
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}