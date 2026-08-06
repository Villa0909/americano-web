interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        bg-white
        shadow-md
        border
        border-zinc-200
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}