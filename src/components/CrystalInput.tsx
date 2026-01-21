import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CrystalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const CrystalInput = forwardRef<HTMLInputElement, CrystalInputProps>(
  ({ label, error, icon, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="relative w-full">
        {label && (
          <label 
            className={cn(
              "block mb-2 font-royal text-xs tracking-[0.15em] uppercase transition-colors duration-300",
              isFocused ? "text-[#D4AF37]" : "text-[#D4AF37]/70",
              error && "text-red-400"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative group">
          {/* Glow backdrop on focus */}
          <div 
            className={cn(
              "absolute -inset-1 rounded-lg bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 blur-md transition-opacity duration-500 pointer-events-none",
              isFocused ? "opacity-100" : "opacity-0"
            )}
          />
          
          {/* Main input container */}
          <div 
            className={cn(
              "relative flex items-center overflow-hidden rounded-lg transition-all duration-500",
              /* Crystal glass surface */
              "bg-gradient-to-b from-[#1a1510]/80 via-[#0d0a08]/90 to-[#1a1510]/80",
              "backdrop-blur-md",
              /* Gold border */
              "border",
              isFocused 
                ? "border-[#D4AF37]/80 shadow-[0_0_20px_rgba(212,175,55,0.4),0_0_40px_rgba(212,175,55,0.15),inset_0_1px_2px_rgba(255,255,255,0.1)]" 
                : "border-[#D4AF37]/30 shadow-[0_0_10px_rgba(212,175,55,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)]",
              error && "border-red-400/60 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            )}
          >
            {/* Inner crystal reflection */}
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none" />
            
            {/* Shimmer animation */}
            <span 
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(212,175,55,0.08) 50%, transparent 60%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: isFocused ? 'buttonShimmer 3s ease-in-out infinite' : 'none',
              }}
            />
            
            {/* Top edge highlight */}
            <span className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
            
            {/* Icon */}
            {icon && (
              <span className={cn(
                "pl-4 transition-colors duration-300",
                isFocused ? "text-[#D4AF37]" : "text-[#D4AF37]/50"
              )}>
                {icon}
              </span>
            )}
            
            {/* Input field */}
            <input
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(
                "relative z-10 w-full px-4 py-4 bg-transparent",
                "font-body text-[#F5E6C8] placeholder:text-[#D4AF37]/40",
                "focus:outline-none",
                "[text-shadow:0_0_8px_rgba(212,175,55,0.3)]",
                icon && "pl-2",
                className
              )}
              {...props}
            />
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <p className="mt-2 text-xs text-red-400 font-body animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CrystalInput.displayName = "CrystalInput";

export default CrystalInput;
