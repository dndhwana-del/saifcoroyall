import { forwardRef, useState, useEffect } from "react";
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
    const [sheenActive, setSheenActive] = useState(false);

    // Periodic sheen animation every 4 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setSheenActive(true);
        setTimeout(() => setSheenActive(false), 800);
      }, 4000);
      return () => clearInterval(interval);
    }, []);

    const sizes = {
      sm: "px-6 py-2 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-12 py-4 text-base",
    };

    const baseStyles = "relative inline-flex items-center justify-center font-royal tracking-[0.2em] uppercase overflow-hidden rounded-sm";

    // Destructure conflicting event handlers for motion.button
    const { onAnimationStart, onDrag, onDragEnd, onDragStart, ...safeProps } = props as any;

    // Style configurations for each variant - Bright Champagne Gold borders
    const variantStyles = {
      primary: {
        background: "rgba(44, 26, 18, 0.85)",
        border: "1px solid #F5E6A3", // Bright champagne gold
        shadowDefault: "0 0 20px 0px rgba(245, 230, 163, 0.25), inset 0 2px 4px rgba(255, 248, 220, 0.15), inset 0 -2px 6px rgba(0, 0, 0, 0.4)",
        shadowHover: "0 0 35px 4px rgba(245, 230, 163, 0.45), inset 0 2px 4px rgba(255, 248, 220, 0.2), inset 0 -2px 6px rgba(0, 0, 0, 0.5)",
        textColor: "#F5E6A3",
        textShadow: "0 0 12px rgba(245, 230, 163, 0.5), 0 1px 2px rgba(0, 0, 0, 0.6)",
        highlightColor: "rgba(255, 248, 220, 0.12)",
        sheenColor: "rgba(255, 250, 230, 0.4)",
        pulseColor: "rgba(245, 230, 163, 0.2)",
      },
      secondary: {
        background: "rgba(62, 39, 35, 0.75)",
        border: "1px solid rgba(245, 230, 163, 0.6)",
        shadowDefault: "0 0 15px 0px rgba(245, 230, 163, 0.15), inset 0 2px 4px rgba(255, 248, 220, 0.08), inset 0 -2px 6px rgba(0, 0, 0, 0.3)",
        shadowHover: "0 0 28px 3px rgba(245, 230, 163, 0.35), inset 0 2px 4px rgba(255, 248, 220, 0.12), inset 0 -2px 6px rgba(0, 0, 0, 0.4)",
        textColor: "#E8D5A3",
        textShadow: "0 0 10px rgba(232, 213, 163, 0.4), 0 1px 2px rgba(0, 0, 0, 0.5)",
        highlightColor: "rgba(255, 248, 220, 0.06)",
        sheenColor: "rgba(245, 230, 163, 0.35)",
        pulseColor: "rgba(245, 230, 163, 0.15)",
      },
      outline: {
        background: "rgba(248, 245, 228, 0.08)",
        border: "2px solid #F5E6A3",
        shadowDefault: "0 0 18px 0px rgba(245, 230, 163, 0.2), inset 0 0 25px rgba(245, 230, 163, 0.08)",
        shadowHover: "0 0 32px 5px rgba(245, 230, 163, 0.4), inset 0 0 35px rgba(245, 230, 163, 0.15)",
        textColor: "#F5E6A3",
        textShadow: "0 0 14px rgba(245, 230, 163, 0.5), 0 1px 2px rgba(0, 0, 0, 0.4)",
        highlightColor: "rgba(245, 230, 163, 0.08)",
        sheenColor: "rgba(245, 230, 163, 0.45)",
        pulseColor: "rgba(245, 230, 163, 0.18)",
      },
    };

    const styles = variantStyles[variant];

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${baseStyles} ${sizes[size]} ${className}`}
        style={{
          background: styles.background,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: styles.border,
          boxShadow: isHovered ? styles.shadowHover : styles.shadowDefault,
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
        {/* Glossy top highlight - permanent inner glow */}
        <div 
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${styles.highlightColor} 0%, transparent 100%)`,
            borderRadius: "1px 1px 50% 50%",
          }}
        />
        
        {/* Diagonal sheen sweep animation - triggers on hover OR every 4 seconds */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(120deg, transparent 0%, transparent 25%, ${styles.sheenColor} 45%, rgba(255, 255, 255, 0.5) 50%, ${styles.sheenColor} 55%, transparent 75%, transparent 100%)`,
          }}
          initial={{ x: "-150%" }}
          animate={{ x: (isHovered || sheenActive) ? "150%" : "-150%" }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        />
        
        {/* Inner light pulse on press */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm"
          style={{
            background: `radial-gradient(circle at center, ${styles.pulseColor} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPressed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Text with bright champagne gold and glow */}
        <span 
          className="relative z-10"
          style={{
            color: styles.textColor,
            textShadow: styles.textShadow,
          }}
        >
          {children}
        </span>
      </motion.button>
    );
  }
);

RoyalButton.displayName = "RoyalButton";

export default RoyalButton;
