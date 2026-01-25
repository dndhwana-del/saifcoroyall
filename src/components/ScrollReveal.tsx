import { motion, useInView, useSpring, useTransform, useScroll } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  blur?: boolean;
  scale?: boolean;
  parallax?: boolean;
  parallaxIntensity?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
  direction = "up",
  distance = 50,
  blur = true,
  scale = true,
  parallax = false,
  parallaxIntensity = 0.2,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  
  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  
  const parallaxY = useTransform(
    smoothProgress, 
    [0, 1], 
    [`${parallaxIntensity * 50}px`, `-${parallaxIntensity * 50}px`]
  );

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { y: 0, x: distance };
      case "right":
        return { y: 0, x: -distance };
      case "none":
        return { y: 0, x: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={parallax ? { y: parallaxY } : undefined}
      initial={{ 
        opacity: 0, 
        scale: scale ? 0.97 : 1,
        filter: blur ? "blur(6px)" : "blur(0px)",
        ...initial 
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        scale: 1,
        filter: "blur(0px)",
      } : { 
        opacity: 0, 
        scale: scale ? 0.97 : 1,
        filter: blur ? "blur(6px)" : "blur(0px)",
        ...initial 
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Luxury smooth easing
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
