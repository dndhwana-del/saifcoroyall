import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CalligraphyAccent from "./CalligraphyAccent";

interface LocationMarker {
  name: string;
  position: { top: string; left: string };
  description: string;
  avgPrice: string;
  properties: number;
}

const LocationsSection = () => {
  const locations: LocationMarker[] = [
    {
      name: "Palm Jumeirah",
      position: { top: "35%", left: "25%" },
      description: "Iconic waterfront living",
      avgPrice: "AED 85M",
      properties: 12,
    },
    {
      name: "Downtown Dubai",
      position: { top: "45%", left: "55%" },
      description: "Heart of the metropolis",
      avgPrice: "AED 65M",
      properties: 8,
    },
    {
      name: "Emirates Hills",
      position: { top: "28%", left: "68%" },
      description: "The Beverly Hills of Dubai",
      avgPrice: "AED 120M",
      properties: 15,
    },
    {
      name: "The Pearl, Doha",
      position: { top: "65%", left: "78%" },
      description: "Qatar's luxury island",
      avgPrice: "AED 95M",
      properties: 6,
    },
  ];

  return (
    <section className="relative py-20 bg-espresso-dark overflow-hidden">
      {/* Seamless pattern continuation */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-50" />
      
      {/* Ambient lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-transparent to-espresso/50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
          <h2 className="text-3xl md:text-5xl font-royal mb-4 text-gold">
            Prime Coordinates
          </h2>
          <p className="font-body text-lg text-sand/70 leading-relaxed">
            Our portfolio spans the most coveted addresses across the Arabian Gulf
          </p>
        </ScrollReveal>

        {/* Stylized Map Container */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto">
            {/* Map Frame */}
            <div className="relative border-2 border-bronze/30 p-2">
              <div className="border border-bronze/20 p-1">
                {/* Stylized Map Background */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-espresso via-espresso-dark to-espresso overflow-hidden">
                  {/* Map Grid Pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, hsl(var(--bronze) / 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--bronze) / 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  
                  {/* Decorative Coastline */}
                  <svg 
                    className="absolute inset-0 w-full h-full opacity-30" 
                    viewBox="0 0 800 450" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      {/* Gradient for connecting lines */}
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    <path
                      d="M0,200 Q100,180 200,220 T400,200 T600,240 T800,200 L800,450 L0,450 Z"
                      fill="hsl(var(--bronze) / 0.15)"
                      stroke="hsl(var(--bronze) / 0.4)"
                      strokeWidth="1"
                    />
                    <path
                      d="M0,280 Q150,260 300,300 T500,270 T700,290 T800,260 L800,450 L0,450 Z"
                      fill="hsl(var(--bronze) / 0.1)"
                      stroke="hsl(var(--bronze) / 0.25)"
                      strokeWidth="0.5"
                    />
                    
                    {/* Connecting lines between markers - subtle network effect */}
                    <motion.path
                      d="M200,157 Q350,180 440,202"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.path
                      d="M440,202 Q500,150 544,126"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 2, delay: 1.3 }}
                    />
                    <motion.path
                      d="M544,126 Q600,200 624,292"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 2, delay: 1.6 }}
                    />
                    <motion.path
                      d="M200,157 Q400,250 624,292"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.3 }}
                      transition={{ duration: 2.5, delay: 1.9 }}
                    />
                  </svg>

                  {/* Location Markers with Enhanced Tooltips */}
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      className="absolute group cursor-pointer"
                      style={{ top: location.position.top, left: location.position.left }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    >
                      {/* Multiple Pulsing Rings - Concentric circles */}
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={ring}
                          className="absolute inset-0 -m-4 rounded-full border border-gold/40"
                          animate={{
                            scale: [1, 2 + ring * 0.5, 1],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2 + ring * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.2 + ring * 0.15,
                          }}
                        />
                      ))}
                      
                      {/* Marker Dot */}
                      <motion.div 
                        className="relative w-4 h-4 bg-gold rounded-full shadow-[0_0_25px_6px_hsla(42,55%,58%,0.6)] group-hover:scale-150 transition-transform duration-300"
                        whileHover={{ scale: 1.5 }}
                      />
                      
                      {/* Glass Card Tooltip */}
                      <motion.div 
                        className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <div className="bg-espresso/98 backdrop-blur-md border border-gold/50 shadow-[0_10px_40px_-10px_hsla(42,55%,50%,0.4)] min-w-[200px]">
                          {/* Glass highlight */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
                          
                          <div className="relative p-4">
                            <p className="font-royal text-base text-gold tracking-wide mb-1">
                              {location.name}
                            </p>
                            <p className="font-display text-xs text-sand/60 italic mb-3">
                              {location.description}
                            </p>
                            
                            {/* Divider */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-3" />
                            
                            {/* Price Info */}
                            <div className="flex items-baseline justify-between gap-4">
                              <div>
                                <p className="font-body text-[10px] text-sand/50 uppercase tracking-wider">
                                  Avg. Price
                                </p>
                                <p className="font-royal text-lg text-gold">
                                  {location.avgPrice}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-body text-[10px] text-sand/50 uppercase tracking-wider">
                                  Listings
                                </p>
                                <p className="font-royal text-lg text-sand">
                                  {location.properties}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Arrow */}
                        <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 w-3 h-3 bg-espresso/98 border-l border-b border-gold/50 rotate-45" />
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Compass Rose */}
                  <div className="absolute bottom-6 right-6 opacity-40">
                    <svg width="60" height="60" viewBox="0 0 60 60" className="text-bronze">
                      <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M30,5 L33,25 L30,15 L27,25 Z" fill="currentColor" opacity="0.8" />
                      <path d="M30,55 L33,35 L30,45 L27,35 Z" fill="currentColor" opacity="0.4" />
                      <path d="M5,30 L25,27 L15,30 L25,33 Z" fill="currentColor" opacity="0.4" />
                      <path d="M55,30 L35,27 L45,30 L35,33 Z" fill="currentColor" opacity="0.4" />
                      <text x="30" y="3" textAnchor="middle" fontSize="6" fill="currentColor" className="font-royal">N</text>
                    </svg>
                  </div>

                  {/* Map Title Cartouche */}
                  <div className="absolute top-6 left-6">
                    <div className="border border-bronze/40 bg-espresso/80 backdrop-blur-sm px-4 py-2">
                      <p className="font-royal text-xs tracking-[0.2em] text-gold/80 uppercase">
                        Arabian Gulf Region
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-gold/40" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-gold/40" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-gold/40" />
          </div>
        </ScrollReveal>

        {/* Location Legend */}
        <ScrollReveal delay={0.4} className="mt-10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {locations.map((location) => (
              <motion.div 
                key={location.name} 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-2.5 h-2.5 bg-gold rounded-full"
                  animate={{ 
                    boxShadow: ["0 0 0px hsla(42,55%,58%,0)", "0 0 12px hsla(42,55%,58%,0.8)", "0 0 0px hsla(42,55%,58%,0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-body text-sm text-sand/60 group-hover:text-gold transition-colors">
                  {location.name}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationsSection;
