import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Bed, Bath, Maximize2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CalligraphyAccent from "./CalligraphyAccent";

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
  return (
    <motion.div
      className="relative flex-shrink-0 w-[340px] md:w-[400px] cursor-pointer"
      animate={{
        scale: isHovered ? 1.05 : 1,
        filter: isHovered ? "brightness(1.1)" : "brightness(1)",
        zIndex: isHovered ? 20 : 10,
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card Container */}
      <div className="relative bg-cardstock overflow-hidden group">
        {/* Double Border */}
        <div className="absolute inset-0 border border-bronze/30 transition-colors duration-500 group-hover:border-bronze/70" />
        <div className="absolute inset-[4px] border border-bronze/50 transition-colors duration-500 group-hover:border-bronze" />

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-[50%_15%] mx-[4px] mt-[4px]">
          <div className="aspect-[4/3] overflow-hidden">
            <motion.img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            />
            {/* Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_15px_rgba(62,39,35,0.4)]" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />
          </div>

          {/* Exclusive Badge */}
          <motion.div 
            className="absolute top-4 left-4 bg-espresso/95 backdrop-blur-sm px-4 py-1.5 border border-gold/50"
            animate={{ y: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.9 }}
          >
            <span className="font-royal text-[10px] tracking-[0.25em] text-gold uppercase">
              Exclusive
            </span>
          </motion.div>

          {/* Quick View Overlay - slides up on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso via-espresso/95 to-transparent px-6 py-5"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 80, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Bed size={16} strokeWidth={1.5} className="text-gold" />
                  <span className="font-body text-sm text-sand">{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bath size={16} strokeWidth={1.5} className="text-gold" />
                  <span className="font-body text-sm text-sand">{property.bathrooms} Baths</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 size={14} strokeWidth={1.5} className="text-gold" />
                <span className="font-body text-xs text-sand/80">{property.area}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 pb-6">
          <h3 className="font-royal text-xl text-espresso tracking-wide mb-1 group-hover:text-bronze transition-colors duration-300">
            {property.title}
          </h3>
          <p className="font-display text-sm text-muted-foreground mb-3 italic">
            {property.location}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline justify-between pt-3 border-t border-bronze/20">
            <span className="font-body text-xs tracking-wider text-muted-foreground/70 uppercase">
              From
            </span>
            <motion.span 
              className="font-royal text-xl text-primary tracking-wide"
              animate={{ 
                textShadow: isHovered 
                  ? "0 0 20px hsla(42, 55%, 58%, 0.5)" 
                  : "0 0 0px hsla(42, 55%, 58%, 0)" 
              }}
            >
              {property.price}
            </motion.span>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? "0 25px 80px -15px hsla(42, 55%, 50%, 0.5), 0 0 40px -10px hsla(42, 55%, 58%, 0.3)"
              : "0 10px 30px -10px hsla(42, 55%, 50%, 0.2)"
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Duplicate properties for infinite scroll effect
  const duplicatedProperties = [...properties, ...properties, ...properties];

  return (
    <section id="collection" className="relative py-20 -mt-24 z-20">
      {/* Section overlaps the hero */}
      <div className="relative">
        {/* Glass header floating above */}
        <div className="container mx-auto px-6 mb-12">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
            <h2 className="text-3xl md:text-5xl font-royal mb-4 text-shimmer">
              The Royal Vault
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              An exclusive gallery of the Gulf's most prestigious estates
            </p>
          </ScrollReveal>
        </div>

        {/* Infinite Carousel */}
        <div 
          className="relative overflow-hidden"
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
        </div>

        {/* Navigation Hint */}
        <div className="container mx-auto px-6 mt-8">
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
        </div>
      </div>
    </section>
  );
};

export default PropertyCarousel;
