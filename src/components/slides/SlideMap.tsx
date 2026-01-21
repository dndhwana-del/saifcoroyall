import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CalligraphyAccent from "@/components/CalligraphyAccent";
import GlassPanel from "@/components/GlassPanel";
import MagneticText from "@/components/MagneticText";

const locations = [
  { name: "Palm Jumeirah", position: { top: "30%", left: "52%" }, delay: 0 },
  { name: "Downtown Dubai", position: { top: "40%", left: "55%" }, delay: 0.2 },
  { name: "Emirates Hills", position: { top: "35%", left: "48%" }, delay: 0.4 },
  { name: "The Pearl, Doha", position: { top: "55%", left: "70%" }, delay: 0.6 },
  { name: "KAFD, Riyadh", position: { top: "50%", left: "35%" }, delay: 0.8 },
  { name: "Abu Dhabi", position: { top: "45%", left: "45%" }, delay: 1 },
];

const SlideMap = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-start bg-espresso"
    >
      {/* Blueprint grid background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `
            linear-gradient(hsla(42, 55%, 58%, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, hsla(42, 55%, 58%, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Mashrabiya overlay */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <CalligraphyAccent className="mx-auto mb-4 w-24 h-6" />
          <MagneticText 
            as="h2" 
            className="text-3xl md:text-5xl font-royal text-gold"
          >
            Command Center
          </MagneticText>
          <p className="font-body text-lg text-sand/60 mt-4">
            Strategic presence across the Gulf's prime coordinates
          </p>
        </motion.div>

        {/* Map Container - Unfolding animation */}
        <motion.div
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
        >
          <GlassPanel intensity="medium" className="p-4">
            <div className="relative aspect-[16/9] overflow-hidden">
              {/* Map background */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-espresso-dark via-espresso to-espresso-dark"
              />
              
              {/* Stylized Arabian Peninsula */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 800 450"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Peninsula outline */}
                <motion.path
                  d="M300,80 Q350,60 420,70 L500,90 Q560,100 600,150 L640,220 Q670,280 660,340 L640,390 Q600,430 520,450 L400,460 Q340,465 280,440 L200,380 Q140,320 130,240 L150,160 Q180,100 250,80 Z"
                  fill="none"
                  stroke="hsl(42, 55%, 58%)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                
                {/* Inner detail lines */}
                <motion.path
                  d="M350,120 L400,150 L380,200 M420,180 L480,200 L500,260"
                  fill="none"
                  stroke="hsla(42, 55%, 58%, 0.3)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
              </svg>

              {/* Location Markers with "sound effect" visual */}
              {locations.map((location, index) => (
                <motion.div
                  key={location.name}
                  className="absolute"
                  style={{ top: location.position.top, left: location.position.left }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 1.5 + location.delay, type: "spring", stiffness: 200 }}
                >
                  {/* Sound wave rings */}
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="absolute rounded-full border border-gold/40"
                      style={{
                        width: ring * 20,
                        height: ring * 20,
                        top: `calc(50% - ${ring * 10}px)`,
                        left: `calc(50% - ${ring * 10}px)`,
                      }}
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={isInView ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 0, 0.6],
                      } : { scale: 0, opacity: 0 }}
                      transition={{
                        delay: 2 + location.delay + ring * 0.1,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                  
                  {/* Core marker */}
                  <motion.div
                    className="relative w-4 h-4 rounded-full bg-gold cursor-pointer group"
                    whileHover={{ scale: 1.5 }}
                    style={{
                      boxShadow: "0 0 20px hsla(42, 55%, 58%, 0.8), 0 0 40px hsla(42, 55%, 58%, 0.4)"
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      <GlassPanel intensity="heavy" className="px-4 py-2">
                        <span className="font-royal text-sm text-gold tracking-wide">
                          {location.name}
                        </span>
                      </GlassPanel>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-gold/30" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-gold/30" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/30" />
            </div>
          </GlassPanel>
        </motion.div>

        {/* Location list */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          {locations.map((location) => (
            <div 
              key={location.name}
              className="flex items-center gap-2 text-sand/70 hover:text-gold transition-colors cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-gold" />
              <span className="font-body text-sm tracking-wide">{location.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SlideMap;
