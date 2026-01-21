import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import GlassPanel from "@/components/GlassPanel";
import MagneticText from "@/components/MagneticText";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const SlideVault = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const properties = [
    { image: property1, title: "Al Qasr Palace", location: "Emirates Hills, Dubai", price: "AED 185M", bedrooms: 12, bathrooms: 15, area: "45,000 sqft" },
    { image: property2, title: "Pearl Bay Estate", location: "The Pearl, Doha", price: "AED 142M", bedrooms: 9, bathrooms: 12, area: "38,000 sqft" },
    { image: property3, title: "Skyline Majlis", location: "Downtown, Dubai", price: "AED 98M", bedrooms: 6, bathrooms: 8, area: "22,000 sqft" },
    { image: property1, title: "Desert Rose Villa", location: "Palm Jumeirah", price: "AED 210M", bedrooms: 14, bathrooms: 16, area: "52,000 sqft" },
    { image: property2, title: "Marina Heights", location: "Dubai Marina", price: "AED 125M", bedrooms: 8, bathrooms: 10, area: "32,000 sqft" },
    { image: property3, title: "Creek Palace", location: "Dubai Creek", price: "AED 175M", bedrooms: 11, bathrooms: 13, area: "42,000 sqft" },
    { image: property1, title: "Burj Residence", location: "Downtown Dubai", price: "AED 320M", bedrooms: 15, bathrooms: 18, area: "60,000 sqft" },
    { image: property2, title: "Island Sanctuary", location: "World Islands", price: "AED 280M", bedrooms: 10, bathrooms: 12, area: "48,000 sqft" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden snap-start bg-background"
    >
      {/* Mashrabiya pattern */}
      <div className="absolute inset-0 mashrabiya-pattern" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Header with overlap from previous section */}
      <div className="relative z-10 -mt-20 mb-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <GlassPanel intensity="heavy" className="inline-block px-16 py-10 mx-auto">
            <CalligraphyAccent className="mx-auto mb-4 w-24 h-6" />
            <MagneticText 
              as="h2" 
              className="text-3xl md:text-5xl font-royal text-shimmer"
            >
              The Royal Vault
            </MagneticText>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
              An infinite gallery of distinction. Hover to focus.
            </p>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Infinite Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <InfiniteCarousel properties={properties} />
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-64 h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </section>
  );
};

export default SlideVault;
