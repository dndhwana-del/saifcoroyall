import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Car, 
  Trees, 
  Waves, 
  Shield, 
  Sparkles,
  Home,
  Building2,
  Expand
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CalligraphyAccent from "./CalligraphyAccent";
import RoyalButton from "./RoyalButton";

interface Property {
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

// Extended property data for the modal
const getExtendedPropertyData = (property: Property) => ({
  ...property,
  gallery: [property.image, property.image, property.image, property.image],
  description: `Experience unparalleled luxury in this magnificent ${property.title}. This extraordinary residence offers breathtaking views, world-class amenities, and the finest craftsmanship throughout. Every detail has been meticulously curated to provide an exceptional living experience befitting royalty.`,
  features: [
    "Private Infinity Pool",
    "Smart Home Automation",
    "Italian Marble Flooring",
    "Private Cinema Room",
    "Wine Cellar",
    "Spa & Wellness Center",
    "Chef's Kitchen",
    "Grand Majlis Hall",
  ],
  amenities: [
    { icon: Car, label: "8-Car Garage" },
    { icon: Trees, label: "Landscaped Gardens" },
    { icon: Waves, label: "Private Beach Access" },
    { icon: Shield, label: "24/7 Security" },
    { icon: Sparkles, label: "Concierge Service" },
    { icon: Building2, label: "Guest Quarters" },
  ],
  floorPlan: {
    levels: 3,
    totalArea: property.area,
    plotSize: "25,000 sqft",
    builtUp: property.area,
  },
});

const PropertyDetailModal = ({ property, isOpen, onClose }: PropertyDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);

  if (!property) return null;

  const extendedData = getExtendedPropertyData(property);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === extendedData.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? extendedData.gallery.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-cardstock border-2 border-bronze/30 shadow-2xl">
          <DialogTitle className="sr-only">{property.title} - Property Details</DialogTitle>
          
          {/* Custom Close Button */}
          <motion.button
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-espresso/90 border border-gold/40 flex items-center justify-center text-gold hover:bg-espresso hover:border-gold transition-all"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={18} />
          </motion.button>

          <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
            {/* Header with Gallery */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-[45vh] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={extendedData.gallery[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-cardstock via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-espresso/30 via-transparent to-espresso/30" />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_20px_rgba(62,39,35,0.5)]" />

                {/* Navigation Arrows */}
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-espresso/80 border border-gold/40 flex items-center justify-center text-gold backdrop-blur-sm"
                  onClick={prevImage}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-espresso/80 border border-gold/40 flex items-center justify-center text-gold backdrop-blur-sm"
                  onClick={nextImage}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>

                {/* Fullscreen Button */}
                <motion.button
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-espresso/80 border border-gold/40 flex items-center justify-center text-gold backdrop-blur-sm"
                  onClick={() => setIsGalleryFullscreen(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Expand size={18} />
                </motion.button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {extendedData.gallery.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex 
                          ? "bg-gold w-6" 
                          : "bg-sand/50 hover:bg-sand"
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                {/* Title Overlay */}
                <motion.div 
                  className="absolute bottom-8 left-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-gold" />
                    <span className="font-body text-sm text-sand/80">{property.location}</span>
                  </div>
                  <h2 className="font-royal text-3xl md:text-4xl text-sand text-shadow-lg">
                    {property.title}
                  </h2>
                </motion.div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 p-4 bg-espresso/20 border-y border-bronze/20">
                {extendedData.gallery.map((img, idx) => (
                  <motion.button
                    key={idx}
                    className={`relative w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex 
                        ? "border-gold" 
                        : "border-transparent hover:border-bronze/50"
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                    whileHover={{ y: -2 }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {idx === currentImageIndex && (
                      <motion.div 
                        className="absolute inset-0 bg-gold/20"
                        layoutId="activeThumb"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Price and Key Stats */}
              <motion.div 
                className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-8 border-b border-bronze/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <span className="font-body text-xs tracking-widest text-muted-foreground uppercase block mb-1">
                    Asking Price
                  </span>
                  <motion.span 
                    className="font-royal text-4xl text-primary"
                    animate={{ 
                      textShadow: ["0 0 0px hsla(42, 55%, 58%, 0)", "0 0 20px hsla(42, 55%, 58%, 0.5)", "0 0 0px hsla(42, 55%, 58%, 0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {property.price}
                  </motion.span>
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <Bed size={24} className="text-bronze mx-auto mb-1" />
                    <span className="font-royal text-xl text-foreground block">{property.bedrooms}</span>
                    <span className="font-body text-xs text-muted-foreground">Bedrooms</span>
                  </div>
                  <div className="text-center">
                    <Bath size={24} className="text-bronze mx-auto mb-1" />
                    <span className="font-royal text-xl text-foreground block">{property.bathrooms}</span>
                    <span className="font-body text-xs text-muted-foreground">Bathrooms</span>
                  </div>
                  <div className="text-center">
                    <Maximize2 size={24} className="text-bronze mx-auto mb-1" />
                    <span className="font-royal text-xl text-foreground block">{property.area}</span>
                    <span className="font-body text-xs text-muted-foreground">Total Area</span>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CalligraphyAccent className="w-16 h-4" />
                  <h3 className="font-royal text-xl text-foreground">About This Estate</h3>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {extendedData.description}
                </p>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CalligraphyAccent className="w-16 h-4" />
                  <h3 className="font-royal text-xl text-foreground">Premium Features</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {extendedData.features.map((feature, idx) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-2 p-3 bg-espresso/5 border border-bronze/20 rounded"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      whileHover={{ 
                        backgroundColor: "hsla(42, 55%, 58%, 0.1)",
                        borderColor: "hsla(42, 55%, 58%, 0.4)",
                      }}
                    >
                      <Sparkles size={14} className="text-gold flex-shrink-0" />
                      <span className="font-body text-sm text-foreground/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <CalligraphyAccent className="w-16 h-4" />
                  <h3 className="font-royal text-xl text-foreground">Estate Amenities</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {extendedData.amenities.map((amenity, idx) => (
                    <motion.div
                      key={amenity.label}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-espresso/10 to-transparent border-l-2 border-gold/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <amenity.icon size={24} className="text-bronze" strokeWidth={1.5} />
                      <span className="font-body text-foreground/80">{amenity.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floor Plan Section */}
              <motion.div 
                className="mb-8 p-6 bg-espresso/5 border border-bronze/20 rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Home size={20} className="text-bronze" />
                  <h3 className="font-royal text-xl text-foreground">Floor Plan Overview</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 border border-bronze/20 bg-cardstock">
                    <span className="font-royal text-2xl text-primary block">{extendedData.floorPlan.levels}</span>
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Levels</span>
                  </div>
                  <div className="text-center p-4 border border-bronze/20 bg-cardstock">
                    <span className="font-royal text-2xl text-primary block">{extendedData.floorPlan.plotSize}</span>
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Plot Size</span>
                  </div>
                  <div className="text-center p-4 border border-bronze/20 bg-cardstock">
                    <span className="font-royal text-2xl text-primary block">{extendedData.floorPlan.builtUp}</span>
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Built-Up Area</span>
                  </div>
                  <div className="text-center p-4 border border-bronze/20 bg-cardstock">
                    <span className="font-royal text-2xl text-primary block">2024</span>
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Year Built</span>
                  </div>
                </div>
                
                {/* Placeholder Floor Plan Diagram */}
                <motion.div 
                  className="mt-6 h-48 border-2 border-dashed border-bronze/30 rounded flex items-center justify-center bg-espresso/5"
                  whileHover={{ borderColor: "hsla(42, 55%, 58%, 0.5)" }}
                >
                  <div className="text-center">
                    <Building2 size={32} className="text-bronze/50 mx-auto mb-2" />
                    <span className="font-body text-sm text-muted-foreground">Interactive Floor Plan</span>
                    <span className="font-body text-xs text-muted-foreground block">Coming Soon</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-bronze/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <RoyalButton className="flex-1">
                  Schedule Private Viewing
                </RoyalButton>
                <RoyalButton variant="outline" className="flex-1">
                  Request Brochure
                </RoyalButton>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isGalleryFullscreen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-espresso/98 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-espresso border border-gold/40 flex items-center justify-center text-gold"
              onClick={() => setIsGalleryFullscreen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            <motion.button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-espresso/80 border border-gold/40 flex items-center justify-center text-gold"
              onClick={prevImage}
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={28} />
            </motion.button>

            <motion.img
              key={currentImageIndex}
              src={extendedData.gallery[currentImageIndex]}
              alt={`${property.title} - Fullscreen ${currentImageIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />

            <motion.button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-espresso/80 border border-gold/40 flex items-center justify-center text-gold"
              onClick={nextImage}
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={28} />
            </motion.button>

            {/* Fullscreen Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              {extendedData.gallery.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentImageIndex 
                      ? "bg-gold w-8" 
                      : "bg-sand/30 hover:bg-sand/60"
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyDetailModal;
