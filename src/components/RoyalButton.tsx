import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  showArrow?: boolean;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", showArrow = false, ...props }, ref) => {
    
    const sizes = {
      sm: "px-6 py-2.5 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-10 py-4 text-base",
    };

    // Ghost Capsule style - transparent with gold border, fills on hover
    const baseStyles = `
      bg-transparent border border-[#D4AF37] text-[#D4AF37]
      hover:bg-[#D4AF37] hover:text-[#1A0F0A]
    `;

    const variantStyles = {
      primary: baseStyles,
      secondary: `bg-transparent border border-[#D4AF37]/70 text-[#D4AF37]
        hover:bg-[#D4AF37] hover:text-[#1A0F0A] hover:border-[#D4AF37]`,
      ghost: `bg-transparent border border-[#D4AF37]/50 text-[#D4AF37]
        hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]`,
    };

    const showArrowIcon = showArrow || variant === "primary";

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center gap-2
          font-royal tracking-[0.2em] uppercase
          rounded-full
          transition-all duration-300 ease-in-out
          group
          active:scale-[0.98]
          ${variantStyles[variant]}
          ${sizes[size]} 
          ${className}
        `}
        {...props}
      >
        {/* Button text */}
        <span className="relative z-10 font-medium">
          {children}
        </span>
        
        {/* Arrow icon - slides right on hover */}
        {showArrowIcon && (
          <ArrowRight 
            className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" 
            strokeWidth={2}
          />
        )}
      </button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
