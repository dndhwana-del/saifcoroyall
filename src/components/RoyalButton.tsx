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

    const baseStyles = "relative inline-flex items-center justify-center font-royal tracking-[0.2em] uppercase overflow-hidden rounded-sm";

    // Destructure conflicting event handlers for motion.button
    const { onAnimationStart, onDrag, onDragEnd, onDragStart, ...safeProps } = props as any;

    // Style configurations for each variant
    const variantStyles = {
      primary: {
        background: "rgba(44, 26, 18, 0.85)",
        border: "1px solid #D4AF37",
        shadowDefault: "0 0 15px 0px rgba(212, 175, 55, 0.2), inset 0 1px 1px rgba(255, 248, 220, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)",
        shadowHover: "0 0 30px 2px rgba(212, 175, 55, 0.4), inset 0 1px 1px rgba(255, 248, 220, 0.15), inset 0 -1px 2px rgba(0, 0, 0, 0.3)",
        textColor: "#E8D5A3",
        textShadow: "0 0 10px rgba(232, 213, 163, 0.3), 0 1px 2px rgba(0, 0, 0, 0.5)",
        highlightColor: "rgba(255, 248, 220, 0.08)",
        sheenColor: "rgba(255, 248, 220, 0.25)",
        pulseColor: "rgba(212, 175, 55, 0.15)",
      },
      secondary: {
        background: "rgba(62, 39, 35, 0.7)",
        border: "1px solid rgba(212, 175, 55, 0.4)",
        shadowDefault: "0 0 12px 0px rgba(212, 175, 55, 0.1), inset 0 1px 1px rgba(255, 248, 220, 0.05), inset 0 -1px 2px rgba(0, 0, 0, 0.15)",
        shadowHover: "0 0 20px 2px rgba(212, 175, 55, 0.25), inset 0 1px 1px rgba(255, 248, 220, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)",
        textColor: "#CCA35A",
        textShadow: "0 0 8px rgba(204, 163, 90, 0.2), 0 1px 2px rgba(0, 0, 0, 0.4)",
        highlightColor: "rgba(255, 248, 220, 0.04)",
        sheenColor: "rgba(212, 175, 55, 0.2)",
        pulseColor: "rgba(212, 175, 55, 0.1)",
      },
      outline: {
        background: "rgba(248, 245, 228, 0.05)",
        border: "2px solid #D4AF37",
        shadowDefault: "0 0 10px 0px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(212, 175, 55, 0.05)",
        shadowHover: "0 0 25px 3px rgba(212, 175, 55, 0.35), inset 0 0 30px rgba(212, 175, 55, 0.1)",
        textColor: "#D4AF37",
        textShadow: "0 0 12px rgba(212, 175, 55, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)",
        highlightColor: "rgba(212, 175, 55, 0.05)",
        sheenColor: "rgba(212, 175, 55, 0.3)",
        pulseColor: "rgba(212, 175, 55, 0.12)",
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
        {/* Glossy top highlight */}
        <div 
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${styles.highlightColor} 0%, transparent 100%)`,
            borderRadius: "1px 1px 50% 50%",
          }}
        />
        
        {/* Light sweep sheen animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(120deg, transparent 0%, transparent 30%, ${styles.sheenColor} 45%, rgba(255, 255, 255, 0.35) 50%, ${styles.sheenColor} 55%, transparent 70%, transparent 100%)`,
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
            background: `radial-gradient(circle at center, ${styles.pulseColor} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isPressed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Text with appropriate color and glow */}
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
