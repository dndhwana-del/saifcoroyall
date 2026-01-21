import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import CalligraphyAccent from "./CalligraphyAccent";

interface LocationMarker {
  name: string;
  position: { top: string; left: string };
  description: string;
}

const LocationsSection = () => {
  const locations: LocationMarker[] = [
    {
      name: "Palm Jumeirah",
      position: { top: "35%", left: "25%" },
      description: "Iconic waterfront living",
    },
    {
      name: "Downtown Dubai",
      position: { top: "45%", left: "55%" },
      description: "Heart of the metropolis",
    },
    {
      name: "Emirates Hills",
      position: { top: "28%", left: "68%" },
      description: "The Beverly Hills of Dubai",
    },
    {
      name: "The Pearl, Doha",
      position: { top: "65%", left: "78%" },
      description: "Qatar's luxury island",
    },
  ];

  return (
    <section className="relative py-24 bg-espresso-dark mashrabiya-pattern overflow-hidden">
      {/* Ambient lighting overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/50 via-transparent to-espresso/80 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
          <h2 className="text-3xl md:text-5xl font-royal mb-6 text-gold">
            Prime Coordinates
          </h2>
          <p className="font-body text-lg text-sand/70 leading-relaxed">
            Our portfolio spans the most coveted addresses across the Arabian Gulf, 
            from iconic waterfronts to exclusive private enclaves.
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
                  </svg>

                  {/* Location Markers */}
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      className="absolute group cursor-pointer"
                      style={{ top: location.position.top, left: location.position.left }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
                    >
                      {/* Pulsing Ring */}
                      <motion.div
                        className="absolute inset-0 -m-4 rounded-full border border-gold/50"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                      
                      {/* Marker Dot */}
                      <div className="relative w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_4px_hsla(42,55%,58%,0.5)] group-hover:scale-125 transition-transform duration-300" />
                      
                      {/* Tooltip */}
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                        <div className="bg-espresso/95 backdrop-blur-sm border border-bronze/40 px-4 py-2 whitespace-nowrap">
                          <p className="font-royal text-sm text-gold tracking-wide">
                            {location.name}
                          </p>
                          <p className="font-body text-xs text-sand/60 mt-0.5">
                            {location.description}
                          </p>
                        </div>
                        {/* Arrow */}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-espresso/95 border-l border-b border-bronze/40 rotate-45" />
                      </div>
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
        <ScrollReveal delay={0.4} className="mt-12">
          <div className="flex flex-wrap justify-center gap-8">
            {locations.map((location) => (
              <div key={location.name} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gold rounded-full" />
                <span className="font-body text-sm text-sand/60">{location.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationsSection;
