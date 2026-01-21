import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Bed, Bath, Maximize2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CalligraphyAccent from "./CalligraphyAccent";

// Stagger reveal animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

interface Property {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCard = ({ 
  property, 
  isHovered,
  onHover,
  onLeave,
  index
}: { 
  property: Property; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  index: number;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  // Calculate 3D tilt based on mouse position
  const rotateX = isHovered ? (mousePos.y - 0.5) * -10 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 10 : 0;

  return (
    <motion.div
      className="relative flex-shrink-0 w-[340px] md:w-[400px] cursor-pointer perspective-1000"
      animate={{
        scale: isHovered ? 1.05 : 1,
        zIndex: isHovered ? 20 : 10,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
    >
      {/* 3D Tilt Container */}
      <motion.div
        className="relative bg-cardstock overflow-hidden group"
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ duration: 0.1, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated Border Glow */}
        <motion.div 
          className="absolute inset-0 border-2 transition-colors duration-500"
          animate={{
            borderColor: isHovered 
              ? "hsla(42, 55%, 58%, 0.8)" 
              : "hsla(30, 41%, 51%, 0.3)",
            boxShadow: isHovered 
              ? "inset 0 0 20px hsla(42, 55%, 58%, 0.15)" 
              : "inset 0 0 0px hsla(42, 55%, 58%, 0)",
          }}
        />
        
        {/* Inner Border with Animation */}
        <motion.div 
          className="absolute inset-[4px] border transition-colors duration-500"
          animate={{
            borderColor: isHovered 
              ? "hsla(42, 55%, 58%, 1)" 
              : "hsla(30, 41%, 51%, 0.5)",
          }}
        />

        {/* Shimmer Sweep Effect */}
        <motion.div
          className="absolute inset-0 z-50 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ 
            x: isHovered ? "200%" : "-100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(90deg, transparent, hsla(42, 55%, 70%, 0.2), transparent)",
            width: "50%",
          }}
        />

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-[50%_15%] mx-[4px] mt-[4px]">
          <div className="aspect-[4/3] overflow-hidden">
            <motion.img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                filter: isHovered ? "brightness(1.15) saturate(1.1)" : "brightness(1) saturate(1)",
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            />
            {/* Dynamic Vignette - intensifies on hover */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                boxShadow: isHovered 
                  ? "inset 0 0 80px 20px rgba(62,39,35,0.5)"
                  : "inset 0 0 60px 15px rgba(62,39,35,0.4)",
              }}
            />
            {/* Gradient overlay */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: isHovered 
                  ? "linear-gradient(to top, hsla(8, 27%, 19%, 0.9), transparent 60%)"
                  : "linear-gradient(to top, hsla(8, 27%, 19%, 0.8), transparent 50%)",
              }}
            />
          </div>

          {/* Exclusive Badge with Pulse */}
          <motion.div 
            className="absolute top-4 left-4 bg-espresso/95 backdrop-blur-sm px-4 py-1.5 border border-gold/50 overflow-hidden"
            animate={{ 
              y: isHovered ? 0 : -5, 
              opacity: isHovered ? 1 : 0.9,
              borderColor: isHovered ? "hsla(42, 55%, 58%, 0.8)" : "hsla(42, 55%, 58%, 0.5)",
            }}
          >
            {/* Badge Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
              animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
              transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
            />
            <span className="relative font-royal text-[10px] tracking-[0.25em] text-gold uppercase">
              Exclusive
            </span>
          </motion.div>

          {/* Quick View Overlay - Enhanced slide up */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso via-espresso/95 to-transparent px-6 py-5"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 100, 
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div 
              className="flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 10,
              }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="flex items-center gap-1.5"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Bed size={16} strokeWidth={1.5} className="text-gold" />
                  <span className="font-body text-sm text-sand">{property.bedrooms} Beds</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-1.5"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Bath size={16} strokeWidth={1.5} className="text-gold" />
                  <span className="font-body text-sm text-sand">{property.bathrooms} Baths</span>
                </motion.div>
              </div>
              <motion.div 
                className="flex items-center gap-1.5"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.25 }}
              >
                <Maximize2 size={14} strokeWidth={1.5} className="text-gold" />
                <span className="font-body text-xs text-sand/80">{property.area}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 pb-6 relative">
          {/* Title with color transition */}
          <motion.h3 
            className="font-royal text-xl tracking-wide mb-1 transition-colors duration-300"
            animate={{ color: isHovered ? "hsl(30, 41%, 51%)" : "hsl(8, 27%, 19%)" }}
          >
            {property.title}
          </motion.h3>
          <p className="font-display text-sm text-muted-foreground mb-3 italic">
            {property.location}
          </p>
          
          {/* Animated Divider */}
          <motion.div 
            className="h-px bg-gradient-to-r from-bronze via-gold to-bronze mb-3"
            animate={{ 
              scaleX: isHovered ? 1 : 0.3,
              opacity: isHovered ? 1 : 0.5,
            }}
            style={{ originX: 0 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Price with Glow */}
          <div className="flex items-baseline justify-between pt-3 border-t border-bronze/20">
            <span className="font-body text-xs tracking-wider text-muted-foreground/70 uppercase">
              From
            </span>
            <motion.span 
              className="font-royal text-xl text-primary tracking-wide"
              animate={{ 
                textShadow: isHovered 
                  ? "0 0 30px hsla(42, 55%, 58%, 0.7), 0 0 60px hsla(42, 55%, 58%, 0.4)" 
                  : "0 0 0px hsla(42, 55%, 58%, 0)",
                scale: isHovered ? 1.05 : 1,
              }}
            >
              {property.price}
            </motion.span>
          </div>
        </div>

        {/* View Button - Reveals on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isHovered ? 48 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-bronze/30 via-gold/50 to-bronze/30"
            animate={{ opacity: isHovered ? 1 : 0 }}
          />
          <motion.span
            className="relative font-royal text-xs tracking-[0.2em] text-espresso uppercase flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ delay: 0.1 }}
          >
            View Estate
            <motion.span
              animate={{ x: isHovered ? [0, 5, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.span>
        </motion.div>

        {/* Outer Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm"
          animate={{
            boxShadow: isHovered 
              ? "0 30px 100px -20px hsla(42, 55%, 50%, 0.6), 0 0 50px -15px hsla(42, 55%, 58%, 0.4), 0 0 0 1px hsla(42, 55%, 58%, 0.2)"
              : "0 10px 30px -10px hsla(42, 55%, 50%, 0.2)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Duplicate properties for infinite scroll effect
  const duplicatedProperties = [...properties, ...properties, ...properties];

  return (
    <motion.section 
      ref={sectionRef}
      id="collection" 
      className="relative py-10 -mt-24 z-20"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Section overlaps the hero */}
      <div className="relative">
        {/* Glass header floating above */}
        <div className="container mx-auto px-6 mb-6">
          <motion.div variants={cardVariants}>
            <ScrollReveal className="text-center max-w-3xl mx-auto">
              <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
              <h2 className="text-3xl md:text-5xl font-royal mb-4 text-shimmer">
                The Royal Vault
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                An exclusive gallery of the Gulf's most prestigious estates
              </p>
            </ScrollReveal>
          </motion.div>
        </div>

        {/* Infinite Carousel with staggered reveal */}
        <motion.div 
          className="relative overflow-hidden"
          variants={cardVariants}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-30 pointer-events-none" />

          {/* Scrolling Container */}
          <motion.div
            ref={containerRef}
            className="flex gap-8 py-8 px-4"
            animate={{
              x: isPaused ? undefined : [0, -1 * (440 * properties.length)],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{ width: "fit-content" }}
          >
            {duplicatedProperties.map((property, index) => (
              <PropertyCard
                key={`${property.title}-${index}`}
                property={property}
                index={index}
                isHovered={hoveredIndex === index}
                onHover={() => {
                  setHoveredIndex(index);
                }}
                onLeave={() => {
                  setHoveredIndex(null);
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Navigation Hint */}
        <motion.div 
          className="container mx-auto px-6 mt-8"
          variants={cardVariants}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground/60">
            <motion.div
              className="w-8 h-px bg-primary/40"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-body text-xs tracking-widest uppercase">
              Hover to explore
            </span>
            <motion.div
              className="w-8 h-px bg-primary/40"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PropertyCarousel;
