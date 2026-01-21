import { useRef, useState } from "react";
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
    <div
      className="relative flex-shrink-0 w-[340px] md:w-[400px] cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card Container - No scale, just subtle glow on hover */}
      <div
        className={`relative bg-cardstock overflow-hidden transition-all duration-700 ease-out ${
          isHovered ? "shadow-[0_20px_60px_-15px_hsla(42,55%,50%,0.4)]" : "shadow-[0_10px_30px_-10px_hsla(42,55%,50%,0.15)]"
        }`}
      >
        {/* Border - subtle glow on hover */}
        <div 
          className={`absolute inset-0 border-2 transition-all duration-700 ${
            isHovered 
              ? "border-gold/60 shadow-[inset_0_0_15px_hsla(42,55%,58%,0.1)]" 
              : "border-bronze/30"
          }`}
        />
        
        {/* Inner Border */}
        <div 
          className={`absolute inset-[4px] border transition-colors duration-700 ${
            isHovered ? "border-gold/80" : "border-bronze/50"
          }`}
        />

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-t-[50%_15%] mx-[4px] mt-[4px]">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                isHovered ? "brightness-110" : "brightness-100"
              }`}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent" />
          </div>

          {/* Exclusive Badge - Static */}
          <div className="absolute top-4 left-4 bg-espresso/95 backdrop-blur-sm px-4 py-1.5 border border-gold/50">
            <span className="font-royal text-[10px] tracking-[0.25em] text-gold uppercase">
              Exclusive
            </span>
          </div>

          {/* Quick View Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso via-espresso/95 to-transparent px-6 py-5 transition-all duration-700 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
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
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pb-6 relative">
          <h3 
            className={`font-royal text-xl tracking-wide mb-1 transition-colors duration-700 ${
              isHovered ? "text-bronze" : "text-foreground"
            }`}
          >
            {property.title}
          </h3>
          <p className="font-display text-sm text-muted-foreground mb-3 italic">
            {property.location}
          </p>
          
          {/* Divider */}
          <div 
            className={`h-px bg-gradient-to-r from-bronze via-gold to-bronze mb-3 transition-all duration-700 origin-left ${
              isHovered ? "scale-x-100 opacity-100" : "scale-x-50 opacity-50"
            }`}
          />
          
          {/* Price */}
          <div className="flex items-baseline justify-between pt-3 border-t border-bronze/20">
            <span className="font-body text-xs tracking-wider text-muted-foreground/70 uppercase">
              From
            </span>
            <span 
              className={`font-royal text-xl text-primary tracking-wide transition-all duration-700 ${
                isHovered ? "text-gold" : ""
              }`}
            >
              {property.price}
            </span>
          </div>
        </div>

        {/* View Button */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex items-center justify-center overflow-hidden transition-all duration-500 ${
            isHovered ? "h-12" : "h-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-bronze/30 via-gold/50 to-bronze/30" />
          <span className="relative font-royal text-xs tracking-[0.2em] text-espresso uppercase flex items-center gap-2">
            View Estate →
          </span>
        </div>
      </div>
    </div>
  );
};

const PropertyCarousel = ({ properties }: PropertyCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Duplicate properties for infinite scroll effect
  const duplicatedProperties = [...properties, ...properties, ...properties];

  return (
    <section id="collection" className="relative py-10 -mt-24 z-20">
      {/* Section overlaps the hero */}
      <div className="relative">
        {/* Glass header floating above */}
        <div className="container mx-auto px-6 mb-6">
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

        {/* Static Carousel - No Auto-Scroll */}
        <div className="relative overflow-hidden">
          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-30 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-30 pointer-events-none" />

          {/* Static Container - User scrolls manually */}
          <div
            ref={containerRef}
            className="flex gap-8 py-8 px-4 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {properties.map((property, index) => (
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
          </div>
        </div>

        {/* Navigation Hint - Static */}
        <div className="container mx-auto px-6 mt-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground/60">
            <div className="w-8 h-px bg-primary/40" />
            <span className="font-body text-xs tracking-widest uppercase">
              Scroll to explore
            </span>
            <div className="w-8 h-px bg-primary/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCarousel;
