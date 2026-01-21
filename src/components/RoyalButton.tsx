import { forwardRef } from "react";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    
    const sizes = {
      sm: "px-6 py-2.5 text-xs",
      md: "px-10 py-3.5 text-sm",
      lg: "px-14 py-4.5 text-base",
    };

    const variantStyles = {
      // Solid gold ingot
      primary: `bg-gradient-to-br from-[#D4AF37] via-[#C9A227] to-[#AA8A2D] text-[#F8F5E4]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.15),0_4px_16px_rgba(170,138,45,0.35)]
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.1),0_6px_24px_rgba(170,138,45,0.45)]`,
      // Dark espresso with gold accents
      secondary: `bg-gradient-to-br from-[#3E2723] via-[#2C1A12] to-[#1A0F0A] text-[#D4AF37] border border-[#D4AF37]/40
        shadow-[inset_0_1px_0_rgba(212,175,55,0.1),inset_0_-2px_0_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.4)]
        hover:border-[#D4AF37]/70 hover:shadow-[inset_0_1px_0_rgba(212,175,55,0.15),0_6px_24px_rgba(0,0,0,0.5)]`,
      // Ghost: transparent with gold outline only
      ghost: `bg-transparent text-[#D4AF37] border border-[#D4AF37]/50
        hover:border-[#D4AF37] hover:bg-[#D4AF37]/10`,
    };

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center 
          font-royal tracking-[0.2em] uppercase
          rounded-sm
          overflow-hidden
          transition-all duration-300 ease-out
          group
          active:scale-[0.98]
          ${variantStyles[variant]}
          ${sizes[size]} 
          ${className}
        `}
        {...props}
      >
        {/* Brushed metal texture overlay */}
        <span 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              105deg,
              transparent,
              transparent 1px,
              rgba(255,255,255,0.15) 1px,
              rgba(255,255,255,0.15) 2px
            )`
          }}
          aria-hidden="true"
        />
        
        {/* Metallic sheen sweep on hover */}
        <span 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out
            bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        
        {/* Button text */}
        <span className="relative z-10 font-medium">
          {children}
        </span>
      </button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
