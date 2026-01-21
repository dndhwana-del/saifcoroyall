import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SmoothScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale" | "rotate";
  distance?: number;
  blur?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

/**
 * Enhanced scroll reveal with luxury timing and smooth physics
 */
const SmoothScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
  direction = "up",
  distance = 60,
  blur = true,
  stagger = false,
  staggerDelay = 0.1,
}: SmoothScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0, scale: 1, rotate: 0 };
      case "down":
        return { y: -distance, x: 0, scale: 1, rotate: 0 };
      case "left":
        return { y: 0, x: distance, scale: 1, rotate: 0 };
      case "right":
        return { y: 0, x: -distance, scale: 1, rotate: 0 };
      case "scale":
        return { y: 0, x: 0, scale: 0.9, rotate: 0 };
      case "rotate":
        return { y: 20, x: 0, scale: 0.98, rotate: 3 };
      case "none":
        return { y: 0, x: 0, scale: 1, rotate: 0 };
    }
  };

  const initial = getInitialState();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        filter: blur ? "blur(8px)" : "blur(0px)",
        ...initial 
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        x: 0, 
        scale: 1, 
        rotate: 0,
        filter: "blur(0px)",
      } : { 
        opacity: 0, 
        filter: blur ? "blur(8px)" : "blur(0px)",
        ...initial 
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Luxury easing
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Parallax text that reveals character by character
 */
export const TextReveal = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const Tag = tag;
  const words = text.split(" ");

  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 30, rotateX: 90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + (wordIndex * word.length + charIndex) * staggerDelay,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

/**
 * Scroll-linked reveal that animates based on scroll position
 */
export const ScrollLinkedReveal = ({
  children,
  className = "",
  parallaxIntensity = 0.3,
  scaleRange = [0.95, 1],
  opacityRange = [0.3, 1],
  rotateRange = [2, 0],
}: {
  children: ReactNode;
  className?: string;
  parallaxIntensity?: number;
  scaleRange?: [number, number];
  opacityRange?: [number, number];
  rotateRange?: [number, number];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [`${parallaxIntensity * 100}px`, `-${parallaxIntensity * 100}px`]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [scaleRange[0], 1, 1, scaleRange[0]]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [opacityRange[0], opacityRange[1], opacityRange[1], opacityRange[0]]);
  const rotate = useTransform(smoothProgress, [0, 0.5, 1], [rotateRange[0], rotateRange[1], -rotateRange[0]]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, scale, opacity, rotate }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Mask reveal animation - content slides in from behind a mask
 */
export const MaskReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const clipPaths = {
    up: {
      initial: "inset(100% 0 0 0)",
      animate: "inset(0 0 0 0)",
    },
    down: {
      initial: "inset(0 0 100% 0)",
      animate: "inset(0 0 0 0)",
    },
    left: {
      initial: "inset(0 100% 0 0)",
      animate: "inset(0 0 0 0)",
    },
    right: {
      initial: "inset(0 0 0 100%)",
      animate: "inset(0 0 0 0)",
    },
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ 
          clipPath: clipPaths[direction].initial,
          opacity: 0,
        }}
        animate={isInView ? { 
          clipPath: clipPaths[direction].animate,
          opacity: 1,
        } : {}}
        transition={{
          duration: 1,
          delay,
          ease: [0.76, 0, 0.24, 1], // Expo easing for dramatic reveal
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Split reveal - elements split apart then come together
 */
export const SplitReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ 
          scaleY: 0,
          originY: 1,
        }}
        animate={isInView ? { 
          scaleY: 1,
        } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + 0.2,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * Floating parallax element with smooth physics
 */
export const FloatingElement = ({
  children,
  className = "",
  intensity = 0.5,
  direction = "vertical",
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  direction?: "vertical" | "horizontal" | "both";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const yRange = intensity * 100;
  const xRange = intensity * 50;

  const y = useTransform(smoothProgress, [0, 1], [yRange, -yRange]);
  const x = useTransform(smoothProgress, [0, 1], [xRange, -xRange]);
  const rotate = useTransform(smoothProgress, [0, 1], [intensity * 5, -intensity * 5]);

  const getStyle = () => {
    switch (direction) {
      case "vertical":
        return { y };
      case "horizontal":
        return { x };
      case "both":
        return { x, y, rotate };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={getStyle()}
    >
      {children}
    </motion.div>
  );
};

export default SmoothScrollReveal;