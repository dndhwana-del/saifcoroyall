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
      md: "px-10 py-4 text-sm",
      lg: "px-12 py-5 text-base",
    };

    const showArrowIcon = showArrow || variant === "primary";

    return (
      <button
        ref={ref}
        className={`
          crystal-button
          relative inline-flex items-center justify-center gap-3
          font-royal tracking-[0.15em] uppercase
          rounded-full
          overflow-hidden
          
          /* Crystal glass surface */
          bg-gradient-to-b from-[#D4AF37]/25 via-[#C9A227]/15 to-[#B8960F]/20
          backdrop-blur-md
          
          /* Intense gold glowing border */
          border border-[#D4AF37]/80
          shadow-[0_0_20px_rgba(212,175,55,0.5),0_0_40px_rgba(212,175,55,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)]
          
          /* Text styling with stronger glow */
          text-[#F5E6C8]
          [text-shadow:0_0_12px_rgba(212,175,55,0.7),0_0_24px_rgba(212,175,55,0.3)]
          
          /* Smooth transitions */
          transition-all duration-500 ease-out
          
          /* 3D hover lift with intense glow */
          hover:translate-y-[-4px]
          hover:shadow-[0_10px_40px_rgba(212,175,55,0.6),0_0_30px_rgba(212,175,55,0.5),0_0_60px_rgba(212,175,55,0.25),inset_0_1px_3px_rgba(255,255,255,0.4)]
          hover:border-[#F5D76E]
          hover:bg-gradient-to-b hover:from-[#D4AF37]/40 hover:via-[#C9A227]/25 hover:to-[#B8960F]/30
          
          /* Active press effect */
          active:translate-y-[1px]
          active:shadow-[0_2px_10px_rgba(212,175,55,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
          active:scale-[0.98]
          
          group
          ${sizes[size]} 
          ${className}
        `}
        {...props}
      >
        {/* Inner crystal reflection layer */}
        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />
        
        {/* Continuous subtle shimmer animation */}
        <span 
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'buttonShimmer 4s ease-in-out infinite',
          }}
        />
        
        {/* Light sweep effect on hover */}
        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
        
        {/* Top edge highlight */}
        <span className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#F5E6C8]/50 to-transparent pointer-events-none" />
        
        {/* Button text with glow */}
        <span className="relative z-10 font-medium">
          {children}
        </span>
        
        {/* Arrow icon with glow */}
        {showArrowIcon && (
          <ArrowRight 
            className="w-4 h-4 relative z-10 transition-all duration-300 ease-out group-hover:translate-x-1.5 drop-shadow-[0_0_4px_rgba(212,175,55,0.6)]" 
            strokeWidth={2}
          />
        )}
        
        {/* Glow pulse on active */}
        <span className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 bg-[#D4AF37]/20 group-active:animate-pulse pointer-events-none" />
      </button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
