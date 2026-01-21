import { forwardRef } from "react";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}, ref) => {
  // Royal Ingot Style - Solid metallic weight
  const baseStyles = `
    group
    relative inline-flex items-center justify-center 
    font-royal tracking-[0.2em] uppercase
    rounded-sm
    overflow-hidden
    transition-all duration-700 ease-out
    text-[#F8F5E4]
  `;

  // Solid brushed metallic bronze/gold - no transparency
  const variants = {
    primary: "bg-gradient-to-br from-[#D4AF37] via-[#C9A227] to-[#AA8A2D] shadow-[0_4px_12px_rgba(170,138,45,0.4)]",
    secondary: "bg-gradient-to-br from-[#8B7355] via-[#7A6548] to-[#5C4D3A] shadow-[0_4px_12px_rgba(92,77,58,0.4)]",
    outline: "bg-gradient-to-br from-[#3E2723] via-[#4A3228] to-[#2C1A12] shadow-[0_4px_12px_rgba(44,26,18,0.5)] border border-[#D4AF37]/40"
  };

  const sizes = {
    sm: "px-6 py-2.5 text-xs min-w-[140px]",
    md: "px-10 py-3.5 text-sm min-w-[180px]",
    lg: "px-14 py-4 text-base min-w-[220px]"
  };

  return (
    <button 
      ref={ref} 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
        hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)]
      `} 
      {...props}
    >
      {/* Brushed metal texture overlay */}
      <span 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            115deg,
            transparent,
            transparent 1px,
            rgba(255,255,255,0.03) 1px,
            rgba(255,255,255,0.03) 2px
          )`
        }}
        aria-hidden="true" 
      />
      
      {/* Metallic sheen sweep on hover */}
      <span 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(
            110deg,
            transparent 20%,
            rgba(255,255,255,0.15) 40%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0.15) 60%,
            transparent 80%
          )`,
          transform: 'translateX(-100%)',
          animation: 'none'
        }}
        aria-hidden="true" 
      />
      <style>{`
        .group:hover span[aria-hidden="true"]:last-of-type {
          animation: sheenSweep 1s ease-out forwards;
        }
        @keyframes sheenSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      
      {/* Text - cream colored for contrast */}
      <span className="relative z-10 text-center font-royal">
        {children}
      </span>
    </button>
  );
});

RoyalButton.displayName = "RoyalButton";
export default RoyalButton;