import { motion, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import PropertyCard from "./PropertyCard";

interface PropertyData {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

interface InfiniteCarouselProps {
  properties: PropertyData[];
}

const InfiniteCarousel = ({ properties }: InfiniteCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const baseVelocity = -0.5;
  
  // Duplicate properties for seamless loop
  const duplicatedProperties = [...properties, ...properties, ...properties];
  const cardWidth = 380;
  const gap = 16;
  const totalWidth = properties.length * (cardWidth + gap);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      
      if (hoveredIndex === null) {
        const currentX = x.get();
        let newX = currentX + baseVelocity * (delta / 16);
        
        // Reset position when we've scrolled one full set
        if (newX <= -totalWidth) {
          newX = 0;
        }
        
        x.set(newX);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [hoveredIndex, x, totalWidth]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-8"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-4"
        style={{ x }}
      >
        {duplicatedProperties.map((property, index) => {
          const actualIndex = index % properties.length;
          const isHovered = hoveredIndex === actualIndex;
          const isDimmed = hoveredIndex !== null && !isHovered;
          
          return (
            <motion.div
              key={`${property.title}-${index}`}
              className="flex-shrink-0"
              style={{ width: cardWidth }}
              onMouseEnter={() => setHoveredIndex(actualIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                opacity: isDimmed ? 0.3 : 1,
                filter: isDimmed ? "blur(4px)" : "blur(0px)",
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <PropertyCard {...property} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
