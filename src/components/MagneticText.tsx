import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, MouseEvent } from "react";

interface MagneticTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
}

const MagneticText = ({ children, className = "", as: Component = "h2" }: MagneticTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * 0.1;
    const distanceY = (e.clientY - centerY) * 0.1;
    
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Split text into characters for individual animation
  const characters = children.split("");

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block cursor-default"
      style={{ x: xSpring, y: ySpring }}
    >
      <Component className={className}>
        {characters.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            whileHover={{
              scale: 1.2,
              color: "hsl(42, 55%, 70%)",
              textShadow: "0 0 20px hsla(42, 55%, 58%, 0.6)",
            }}
            transition={{ duration: 0.2 }}
            style={{ 
              display: char === " " ? "inline" : "inline-block",
              marginRight: char === " " ? "0.3em" : "0"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Component>
    </motion.div>
  );
};

export default MagneticText;
