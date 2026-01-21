import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plane, Users, Ship, Car, Building, Crown } from "lucide-react";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import GlassPanel from "@/components/GlassPanel";
import MagneticText from "@/components/MagneticText";

const services = [
  { icon: Plane, title: "Private Aviation", description: "Global jet charter services" },
  { icon: Users, title: "Personal Butler", description: "24/7 dedicated concierge" },
  { icon: Ship, title: "Yacht Access", description: "Mediterranean & Gulf waters" },
  { icon: Car, title: "Luxury Fleet", description: "Chauffeur-driven collection" },
  { icon: Building, title: "Property Management", description: "White-glove estate care" },
  { icon: Crown, title: "VIP Events", description: "Exclusive member gatherings" },
];

const SlideServices = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start bg-background"
    >
      {/* Mashrabiya pattern */}
      <div className="absolute inset-0 mashrabiya-pattern" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/20 via-transparent to-espresso/20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <CalligraphyAccent className="mx-auto mb-4 w-24 h-6" />
          <MagneticText 
            as="h2" 
            className="text-3xl md:text-5xl font-royal text-shimmer"
          >
            Concierge Excellence
          </MagneticText>
          <p className="font-body text-lg text-muted-foreground mt-4 max-w-xl mx-auto">
            Beyond property, a lifestyle of unparalleled service
          </p>
        </motion.div>

        {/* Services Grid with Wave Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const row = Math.floor(index / 3);
            const col = index % 3;
            const waveDelay = (row * 0.1) + (col * 0.15);

            return (
              <motion.div
                key={service.title}
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{
                  delay: waveDelay + 0.3,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <GlassPanel 
                  intensity="medium" 
                  className="p-8 h-full group hover:bg-espresso/70 transition-all duration-300 cursor-pointer"
                >
                  {/* Floating Icon */}
                  <motion.div
                    initial={{ y: 0 }}
                    animate={isInView ? { y: [0, -10, 0] } : { y: 0 }}
                    transition={{
                      delay: waveDelay + 0.8,
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-300">
                      <Icon 
                        size={28} 
                        className="text-gold group-hover:scale-110 transition-transform duration-300" 
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>

                  {/* Title with underline glow on hover */}
                  <h3 className="font-royal text-xl text-gold mb-2 relative inline-block">
                    {service.title}
                    <motion.div 
                      className="absolute -bottom-1 left-0 h-px bg-gold"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </h3>

                  <p className="font-body text-sand/60 text-sm">
                    {service.description}
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-48 h-px mx-auto mt-16 bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
};

export default SlideServices;
