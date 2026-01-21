import { forwardRef } from "react";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const baseStyles = `
      relative inline-flex items-center justify-center 
      font-royal tracking-[0.2em] uppercase
      rounded-full
      backdrop-blur-md
      border border-[#D4AF37]/70
      text-[#D4AF37]
      overflow-hidden
      transition-all duration-500 ease-out
      group
    `;
    
    // Glass crystal tube effect - semi-transparent with inner glow
    const glassEffect = `
      bg-gradient-to-b from-white/10 via-[#D4AF37]/5 to-white/5
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.1)]
    `;

    const variants = {
      primary: glassEffect,
      secondary: "bg-white/5 border-[#D4AF37]/50",
      outline: "bg-transparent border-[#D4AF37]/80",
    };

    const sizes = {
      sm: "px-8 py-2.5 text-xs min-w-[160px]",
      md: "px-12 py-3.5 text-sm min-w-[200px]",
      lg: "px-16 py-4.5 text-base min-w-[240px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}
          hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]
          hover:scale-[1.02]
          active:scale-[0.98]
        `}
        {...props}
      >
        {/* Shine sweep animation on hover */}
        <span 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
            bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          aria-hidden="true"
        />
        
        {/* Inner edge highlight for glass effect */}
        <span 
          className="absolute inset-[1px] rounded-full pointer-events-none
            bg-gradient-to-b from-white/10 via-transparent to-transparent"
          aria-hidden="true"
        />
        
        {/* Text with drop shadow for readability */}
        <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          {children}
        </span>
      </button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
