import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode, HTMLAttributes } from "react";

interface ParallaxSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  speed?: number; // -1 to 1, negative = slower than scroll, positive = faster
  overlay?: boolean;
  overlayColor?: string;
  scale?: boolean;
  smoothness?: number; // Spring stiffness (higher = snappier)
}

const ParallaxSection = ({
  children,
  className = "",
  backgroundImage,
  backgroundColor,
  speed = 0.3,
  overlay = true,
  overlayColor = "hsla(8, 27%, 19%, 0.4)",
  scale = false,
  smoothness = 80,
  ...props
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics for buttery parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: smoothness,
    damping: 25,
    restDelta: 0.001,
  });

  // Parallax movement with smooth physics
  const y = useTransform(smoothProgress, [0, 1], [`${-40 * speed}%`, `${40 * speed}%`]);
  
  // Optional scale effect with smooth spring
  const scaleValue = useTransform(smoothProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  
  // Smooth opacity fade at edges
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6]);
  
  // Subtle rotation for depth
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [2, 0, -2]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Parallax Background with enhanced smoothness */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -inset-y-[20%]"
          style={{ 
            y,
            scale: scale ? scaleValue : 1,
            rotateX,
            transformPerspective: 1000,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div 
              className="absolute inset-0" 
              style={{ backgroundColor: overlayColor }}
            />
          )}
        </motion.div>
      )}

      {/* Gradient Background with Parallax */}
      {backgroundColor && !backgroundImage && (
        <motion.div
          className="absolute inset-0 -inset-y-10"
          style={{ 
            y: useTransform(smoothProgress, [0, 1], ["0%", `${15 * speed}%`]),
            backgroundColor,
          }}
        />
      )}

      {/* Content with subtle opacity transition */}
      <motion.div className="relative z-10" style={{ opacity }}>
        {children}
      </motion.div>
    </section>
  );
};

// Floating element that moves independently with smooth physics
export const ParallaxFloat = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
  rotate = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  rotate?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring for natural movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  const movement = 120 * speed;
  
  const transforms = {
    up: { y: useTransform(smoothProgress, [0, 1], [movement, -movement]) },
    down: { y: useTransform(smoothProgress, [0, 1], [-movement, movement]) },
    left: { x: useTransform(smoothProgress, [0, 1], [movement, -movement]) },
    right: { x: useTransform(smoothProgress, [0, 1], [-movement, movement]) },
  };

  const rotation = useTransform(smoothProgress, [0, 1], [-5 * speed, 5 * speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...transforms[direction],
        rotate: rotate ? rotation : 0,
      }}
    >
      {children}
    </motion.div>
  );
};

// Decorative parallax layers with enhanced animations
export const ParallaxLayers = ({
  className = "",
}: {
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const y1 = useTransform(smooth, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(smooth, [0, 1], ["0%", "50%"]);
  const y3 = useTransform(smooth, [0, 1], ["0%", "75%"]);
  const rotate1 = useTransform(smooth, [0, 1], [0, 15]);
  const rotate2 = useTransform(smooth, [0, 1], [0, -20]);
  const scale1 = useTransform(smooth, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1 - Slow moving geometric shape */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 border border-gold/10 rounded-full"
        style={{ y: y1, rotate: rotate1, scale: scale1 }}
      />
      
      {/* Layer 2 - Medium speed diamond */}
      <motion.div
        className="absolute top-1/3 -left-10 w-40 h-40 border border-bronze/10 rotate-45"
        style={{ y: y2, rotate: rotate2 }}
      />
      
      {/* Layer 3 - Fast moving accent with glow */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-gold/8 to-transparent rounded-full blur-2xl"
        style={{ y: y3 }}
      />
      
      {/* Vertical decorative line */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-px h-40 bg-gradient-to-b from-transparent via-gold/15 to-transparent"
        style={{ y: y2 }}
      />
      
      {/* Additional floating orb */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-16 h-16 bg-gradient-radial from-bronze/10 to-transparent rounded-full blur-xl"
        style={{ y: y1, scale: scale1 }}
      />
    </div>
  );
};

// Horizontal scroll reveal with parallax
export const HorizontalParallax = ({
  children,
  className = "",
  direction = "left",
  intensity = 0.3,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
  intensity?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const range = intensity * 100;
  
  const x = useTransform(
    smooth, 
    [0, 1], 
    direction === "left" ? [range, -range] : [-range, range]
  );

  return (
    <motion.div ref={ref} className={className} style={{ x }}>
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
