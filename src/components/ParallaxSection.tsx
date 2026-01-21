import { motion, useScroll, useTransform } from "framer-motion";
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
  ...props
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [`${-30 * speed}%`, `${30 * speed}%`]);
  
  // Optional scale effect
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  
  // Opacity fade at edges
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -inset-y-20"
          style={{ 
            y,
            scale: scale ? scaleValue : 1,
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
            y: useTransform(scrollYProgress, [0, 1], ["0%", `${10 * speed}%`]),
            backgroundColor,
          }}
        />
      )}

      {/* Content */}
      <motion.div className="relative z-10" style={{ opacity }}>
        {children}
      </motion.div>
    </section>
  );
};

// Floating element that moves independently
export const ParallaxFloat = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const movement = 100 * speed;
  
  const transforms = {
    up: { y: useTransform(scrollYProgress, [0, 1], [movement, -movement]) },
    down: { y: useTransform(scrollYProgress, [0, 1], [-movement, movement]) },
    left: { x: useTransform(scrollYProgress, [0, 1], [movement, -movement]) },
    right: { x: useTransform(scrollYProgress, [0, 1], [-movement, movement]) },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={transforms[direction]}
    >
      {children}
    </motion.div>
  );
};

// Decorative parallax layers
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

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1 - Slow moving geometric shape */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 border border-gold/10 rounded-full"
        style={{ y: y1, rotate: rotate1 }}
      />
      
      {/* Layer 2 - Medium speed diamond */}
      <motion.div
        className="absolute top-1/3 -left-10 w-40 h-40 border border-bronze/10 rotate-45"
        style={{ y: y2, rotate: rotate2 }}
      />
      
      {/* Layer 3 - Fast moving accent */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-gold/5 to-transparent rounded-full blur-xl"
        style={{ y: y3 }}
      />
      
      {/* Additional decorative elements */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-px h-32 bg-gradient-to-b from-transparent via-gold/20 to-transparent"
        style={{ y: y2 }}
      />
    </div>
  );
};

export default ParallaxSection;
