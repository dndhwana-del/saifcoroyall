import { forwardRef, useState } from "react";
import { motion } from "framer-motion";

interface RoyalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const RoyalButton = forwardRef<HTMLButtonElement, RoyalButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const sizes = {
      sm: "px-6 py-2 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-12 py-4 text-base",
    };

    // Royal Crystal styling for primary variant
    const isPrimary = variant === "primary";
    
    const baseStyles = isPrimary
      ? "relative inline-flex items-center justify-center font-royal tracking-[0.2em] uppercase overflow-hidden rounded-sm"
      : "relative inline-flex items-center justify-center font-royal tracking-[0.15em] uppercase transition-all duration-500 ease-out overflow-hidden";

    const variants = {
      primary: "", // Custom styling via inline styles
      secondary: "bg-card border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-accent-foreground",
    };

    if (isPrimary) {
      // Destructure conflicting event handlers
      const { onAnimationStart, onDrag, onDragEnd, onDragStart, ...safeProps } = props as any;
      
      return (
        <motion.button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={`${baseStyles} ${sizes[size]} ${className}`}
          style={{
            background: "rgba(44, 26, 18, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid #D4AF37",
            boxShadow: isHovered
              ? "0 0 30px 2px rgba(212, 175, 55, 0.4), inset 0 1px 1px rgba(255, 248, 220, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.3)"
              : "0 0 15px 0px rgba(212, 175, 55, 0.2), inset 0 1px 1px rgba(255, 248, 220, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)",
            transition: "all 0.6s ease-out",
          }}
          initial={false}
          animate={{
            y: isPressed ? 0 : isHovered ? -2 : 0,
            scale: isPressed ? 0.98 : 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          {...safeProps}
        >
          {/* Glossy top highlight */}
          <div 
            className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255, 248, 220, 0.08) 0%, transparent 100%)",
              borderRadius: "1px 1px 50% 50%",
            }}
          />
          
          {/* Light sweep sheen animation */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(120deg, transparent 0%, transparent 30%, rgba(255, 248, 220, 0.25) 45%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 248, 220, 0.25) 55%, transparent 70%, transparent 100%)",
            }}
            initial={{ x: "-150%" }}
            animate={{ x: isHovered ? "150%" : "-150%" }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
          
          {/* Inner light pulse on press */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-sm"
            style={{
              background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isPressed ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Text with champagne gold color and glow */}
          <span 
            className="relative z-10"
            style={{
              color: "#E8D5A3",
              textShadow: "0 0 10px rgba(232, 213, 163, 0.3), 0 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            {children}
          </span>
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
