import { cn } from "@/lib/utils";
import { useRef } from "react";

interface PokeGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  bg: string;
}

export const PokeGlassCard = ({
  children,
  className,
  bg,
  ...props
}: PokeGlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ backgroundImage: bg }}
      className={cn(
        "relative overflow-hidden",
        "rounded-xl border-1 border-white/20",
        "shadow-[inset_0px_0px_12px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.2),_0_0_0_1px_rgba(255,255,255,0.6)]",
        "backdrop-blur-[15px] group",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute top-0 left-[-75%] h-full w-[150%]
        bg-gradient-to-r from-transparent via-white/60 to-transparent
        transform -skew-x-12
        opacity-0 group-hover:animate-shine"
      />
      <span
        className="pointer-events-none absolute top-0 left-[-75%] h-full w-[150%]
        bg-gradient-to-r from-transparent via-white/50 to-transparent
        transform -skew-x-12
        opacity-0 group-hover:animate-shine-delay"
      />
      <span
        className="pointer-events-none absolute top-0 left-0 h-full w-full
        bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.4),transparent_75%)]
        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
