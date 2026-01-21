import { forwardRef } from "react";

interface CalligraphyAccentProps {
  className?: string;
}

const CalligraphyAccent = forwardRef<SVGSVGElement, CalligraphyAccentProps>(({ className = "" }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 60"
      className={`w-32 h-10 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Arabic-inspired calligraphic decorative element */}
      <path
        d="M10 30 Q30 10, 50 30 T90 30 T130 30 T170 30 Q190 30, 190 40"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M20 35 Q40 55, 60 35 T100 35 T140 35 T180 35"
        stroke="url(#goldGradient)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Decorative dots */}
      <circle cx="50" cy="25" r="2" fill="url(#goldGradient)" />
      <circle cx="100" cy="45" r="2" fill="url(#goldGradient)" />
      <circle cx="150" cy="25" r="2" fill="url(#goldGradient)" />
      
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(42, 55%, 58%)" />
          <stop offset="50%" stopColor="hsl(45, 70%, 70%)" />
          <stop offset="100%" stopColor="hsl(42, 55%, 58%)" />
        </linearGradient>
      </defs>
    </svg>
  );
});

CalligraphyAccent.displayName = "CalligraphyAccent";

export default CalligraphyAccent;
