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
  return <article className="group relative bg-cardstock transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_60px_-10px_hsla(42,55%,50%,0.35)]">
      {/* Double Border - Outer */}
      <div className="absolute inset-0 border border-bronze/30" />
      
      {/* Double Border - Inner (4px offset) */}
      <div className="absolute inset-[4px] border border-bronze/50" />

      {/* Content Container */}
      <div className="relative p-[4px] border-primary-foreground border shadow-royal">
        {/* Image with Arch Shape */}
        <div className="relative overflow-hidden rounded-t-[50%_20%] mx-[4px] mt-[4px]">
          <div className="aspect-[4/3] overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Vignette Shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_10px_rgba(62,39,35,0.3)]" />
            {/* Bottom gradient for blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-cardstock/80 via-transparent to-transparent" />
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
        <div className="absolute bottom-0 left-0 right-0 h-0 bg-bronze/10 group-hover:h-12 transition-all duration-300 overflow-hidden flex items-center justify-center">
          <span className="font-royal text-xs tracking-[0.2em] text-bronze uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            View Estate →
          </span>
        </div>
      </div>
    </article>;
};
export default PropertyCard;