import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CrystalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const CrystalSelect = forwardRef<HTMLSelectElement, CrystalSelectProps>(
  ({ label, error, options, placeholder, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
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
          
          {/* Main select container */}
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
            
            {/* Select field */}
            <select
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(
                "relative z-10 w-full px-4 py-4 bg-transparent appearance-none cursor-pointer",
                "font-body text-[#F5E6C8]",
                "focus:outline-none",
                "[text-shadow:0_0_8px_rgba(212,175,55,0.3)]",
                /* Style for placeholder/default option */
                "[&>option]:bg-[#1a1510] [&>option]:text-[#F5E6C8]",
                className
              )}
              {...props}
            >
              {placeholder && (
                <option value="" disabled className="text-[#D4AF37]/40">
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Custom dropdown arrow */}
            <span className={cn(
              "absolute right-4 transition-all duration-300 pointer-events-none",
              isFocused ? "text-[#D4AF37] rotate-180" : "text-[#D4AF37]/50"
            )}>
              <ChevronDown className="w-5 h-5" />
            </span>
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

CrystalSelect.displayName = "CrystalSelect";

export default CrystalSelect;
