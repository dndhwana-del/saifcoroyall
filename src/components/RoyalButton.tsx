import { forwardRef } from "react";
import { motion } from "framer-motion";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "crystal";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-royal tracking-[0.15em] uppercase transition-all duration-500 ease-out overflow-hidden";
    
    const variants = {
      primary: "btn-royal",
      secondary: "bg-card border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-accent-foreground",
      crystal: "crystal-tube",
    };

    const sizes = {
      sm: "px-6 py-2 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-12 py-4 text-base",
    };

    // Crystal variant gets special treatment with shine animation
    if (variant === "crystal") {
      return (
        <motion.button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
          whileHover="hover"
          initial="initial"
          {...(props as any)}
        >
          {/* Glass background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-white/10 to-gold/5 rounded-full" />
          
          {/* Inner glow / polished edge effect */}
          <div className="absolute inset-[1px] rounded-full shadow-[inset_0_1px_2px_rgba(212,175,55,0.3),inset_0_-1px_2px_rgba(0,0,0,0.2)]" />
          
          {/* Shine sweep animation on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent rounded-full"
            variants={{
              initial: { x: "-100%", opacity: 0 },
              hover: { 
                x: "100%", 
                opacity: 1,
                transition: { duration: 0.6, ease: "easeInOut" }
              }
            }}
          />
          
          {/* Secondary shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
            variants={{
              initial: { x: "-150%", opacity: 0 },
              hover: { 
                x: "150%", 
                opacity: 1,
                transition: { duration: 0.8, ease: "easeInOut", delay: 0.1 }
              }
            }}
          />
          
          <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{children}</span>
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
