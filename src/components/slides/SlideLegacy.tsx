import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import RoyalButton from "@/components/RoyalButton";
import GlassPanel from "@/components/GlassPanel";
import MagneticText from "@/components/MagneticText";

const SlideLegacy = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  // Old Dubai sketch SVG as background
  const sketchPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cpath d='M50,250 L50,150 L80,120 L110,150 L110,250 M130,250 L130,180 L160,150 L190,180 L190,250 M210,250 L210,130 L250,90 L290,130 L290,250 M310,250 L310,200 L340,170 L370,200 L370,250' stroke='%23CD7F32' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M20,250 L380,250' stroke='%23CD7F32' stroke-width='1' opacity='0.2'/%3E%3Cpath d='M160,80 Q200,40 240,80' stroke='%23CD7F32' stroke-width='1' fill='none' opacity='0.1'/%3E%3C/svg%3E")`;

  const stats = [
    { value: "50+", label: "Royal Estates" },
    { value: "25", label: "Years of Excellence" },
    { value: "100%", label: "Private & Exclusive" },
    { value: "∞", label: "Legacy Value" },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden snap-start bg-espresso"
    >
      {/* Background sketch pattern */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{ backgroundImage: sketchPattern, backgroundSize: "cover" }}
        animate={{ opacity: isInView ? 0.3 : 0 }}
        transition={{ duration: 2 }}
      />
      
      {/* Mashrabiya overlay */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-20" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-transparent to-espresso" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <GlassPanel intensity="medium" className="p-10">
              <CalligraphyAccent className="mb-6 w-32 h-8" />
              
              <MagneticText 
                as="h2" 
                className="text-3xl md:text-5xl font-royal mb-6 text-gold"
              >
                A Legacy of Distinction
              </MagneticText>

              <p className="font-body text-lg text-sand/80 leading-relaxed mb-6">
                For over two decades, Royal Gulf Estates has been the trusted custodian 
                of the Arabian Peninsula's most extraordinary properties. Our heritage 
                is woven into the very fabric of Gulf luxury.
              </p>
              
              <p className="font-body text-lg text-sand/80 leading-relaxed mb-8">
                We understand that acquiring a royal residence is not merely a transaction—
                it is the beginning of a legacy that will endure for generations.
              </p>

              <RoyalButton 
                variant="outline" 
                className="border-gold text-gold hover:bg-gold hover:text-espresso"
              >
                Our Story
              </RoyalButton>
            </GlassPanel>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
              >
                <GlassPanel intensity="light" className="p-8 text-center h-full">
                  <motion.div 
                    className="font-royal text-4xl md:text-5xl text-gold mb-3"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.6 + index * 0.15, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-body text-sm text-sand/60 tracking-wider uppercase">
                    {stat.label}
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-gold/20" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold/20" />
    </section>
  );
};

export default SlideLegacy;
