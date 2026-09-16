import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  count?: number;
};

const POSITIONS = [
  { top: "8%", left: "12%", size: 14, delay: "0s" },
  { top: "18%", left: "78%", size: 10, delay: "0.7s" },
  { top: "62%", left: "6%", size: 12, delay: "1.4s" },
  { top: "74%", left: "88%", size: 16, delay: "0.3s" },
  { top: "38%", left: "55%", size: 8, delay: "1.9s" },
  { top: "88%", left: "38%", size: 10, delay: "1.1s" },
];

function SparkleIcon({ style, className }: { style: React.CSSProperties; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("absolute animate-sparkle", className)}
      style={style}
    >
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function Sparkles({ className, count = 6 }: SparklesProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {POSITIONS.slice(0, count).map((p, i) => (
        <SparkleIcon
          key={i}
          className="text-primary-glow"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
