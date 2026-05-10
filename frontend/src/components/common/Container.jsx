export default function Container({
  children,
}) {
  return (
    <div className="
      max-w-6xl
      mx-auto
      relative
      z-10
    ">
      {children}
    </div>
  );
}