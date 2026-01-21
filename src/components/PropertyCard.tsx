import { motion } from "framer-motion";
import { Bed, Bath, Key } from "lucide-react";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

const PropertyCard = ({
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area
}: PropertyCardProps) => {
  return (
    <motion.article 
      className="group relative bg-cardstock cursor-pointer"
      whileHover={{ 
        y: -12,
        transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
      }}
      initial={{ boxShadow: "0 4px 20px -4px hsla(42, 55%, 50%, 0.15)" }}
      whileTap={{ scale: 0.98 }}
      style={{
        boxShadow: "0 4px 20px -4px hsla(42, 55%, 50%, 0.15)",
      }}
      onHoverStart={(e) => {
        (e.target as HTMLElement).style.boxShadow = "0 25px 60px -10px hsla(42, 55%, 50%, 0.4)";
      }}
      onHoverEnd={(e) => {
        (e.target as HTMLElement).style.boxShadow = "0 4px 20px -4px hsla(42, 55%, 50%, 0.15)";
      }}
    >
      {/* Double Border - Outer */}
      <div className="absolute inset-0 border border-bronze/30 group-hover:border-bronze/60 transition-colors duration-500" />
      
      {/* Double Border - Inner (4px offset) */}
      <div className="absolute inset-[4px] border border-bronze/50 group-hover:border-bronze/80 transition-colors duration-500" />

      {/* Content Container */}
      <div className="relative p-[4px] border-primary-foreground border shadow-royal">
        {/* Image with Arch Shape */}
        <div className="relative overflow-hidden rounded-t-[50%_20%] mx-[4px] mt-[4px]">
          <div className="aspect-[4/3] overflow-hidden">
            {/* Image zoom happens on card hover, not image hover */}
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
            {/* Vignette Shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_10px_rgba(62,39,35,0.3)] pointer-events-none" />
            {/* Bottom gradient for blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-cardstock/80 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Exclusive Badge */}
          <div className="absolute top-4 left-4 bg-espresso/90 backdrop-blur-sm px-4 py-1.5 border border-bronze/40">
            <span className="font-royal text-[10px] tracking-[0.2em] text-gold uppercase">
              Exclusive
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 pt-4">
          {/* Title */}
          <h3 className="font-royal text-xl text-espresso tracking-wide mb-1 group-hover:text-bronze transition-colors duration-300">
            {title}
          </h3>
          
          {/* Location */}
          <p className="font-body text-sm text-muted-foreground mb-4 italic">
            {location}
          </p>

          {/* Decorative Line */}
          <div className="w-16 h-px bg-gradient-to-r from-bronze via-bronze/50 to-transparent mb-4" />

          {/* Amenities with Engraved Icons */}
          <div className="flex items-center gap-6 mb-5">
            <div className="flex items-center gap-2">
              <Bed size={18} strokeWidth={1} className="text-bronze" />
              <span className="font-body text-sm text-foreground/70">
                {bedrooms} Beds
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={18} strokeWidth={1} className="text-bronze" />
              <span className="font-body text-sm text-foreground/70">
                {bathrooms} Baths
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Key size={18} strokeWidth={1} className="text-bronze" />
              <span className="font-body text-sm text-foreground/70">
                {area}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between border-t border-bronze/20 pt-4">
            <span className="font-body text-xs tracking-wider text-muted-foreground uppercase">
              Starting From
            </span>
            <span className="font-royal text-2xl text-primary tracking-wide">
              {price}
            </span>
          </div>
        </div>

        {/* View Details Link */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-bronze/20 via-gold/30 to-bronze/20 flex items-center justify-center overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          whileHover={{ height: 48, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="font-royal text-xs tracking-[0.2em] text-espresso uppercase flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.span
              animate={{ 
                textShadow: ["0 0 0px hsla(42, 55%, 58%, 0)", "0 0 12px hsla(42, 55%, 58%, 0.8)", "0 0 0px hsla(42, 55%, 58%, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              View Estate
            </motion.span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default PropertyCard;