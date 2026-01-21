import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";
import CalligraphyAccent from "./CalligraphyAccent";

const locations = [
  { name: "Palm Jumeirah", position: { top: "35%", left: "55%" } },
  { name: "Downtown Dubai", position: { top: "45%", left: "58%" } },
  { name: "Emirates Hills", position: { top: "40%", left: "52%" } },
  { name: "The Pearl, Doha", position: { top: "50%", left: "70%" } },
  { name: "KAFD, Riyadh", position: { top: "55%", left: "42%" } },
];

const LocationsSection = () => {
  return (
    <section className="relative py-24 bg-espresso overflow-hidden">
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/95 to-espresso" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
          <h2 className="text-3xl md:text-5xl font-royal mb-6 text-gold">
            Prime Coordinates
          </h2>
          <p className="font-body text-lg text-sand/70 leading-relaxed">
            Strategic presences across the Gulf's most coveted addresses, 
            where legacy properties command the skyline.
          </p>
        </ScrollReveal>

        {/* Map Container */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto aspect-[16/9] rounded-lg overflow-hidden border-2 border-gold/30 shadow-gold">
            {/* Stylized Map Background */}
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(135deg, hsl(30, 20%, 15%) 0%, hsl(25, 25%, 12%) 50%, hsl(30, 20%, 15%) 100%)
                `,
              }}
            />
            
            {/* Grid overlay for map effect */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(42, 55%, 58%) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(42, 55%, 58%) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            {/* Decorative Arabian Peninsula silhouette */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 800 450"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M350,100 Q400,80 450,90 L500,100 Q550,110 580,150 L620,200 Q650,250 640,300 L630,350 Q600,400 550,420 L450,430 Q400,435 350,420 L280,380 Q230,340 220,280 L230,200 Q250,140 300,110 Z"
                fill="hsl(42, 55%, 58%)"
                className="drop-shadow-lg"
              />
            </svg>

            {/* Pulsing Location Markers */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className="absolute"
                style={{ top: location.position.top, left: location.position.left }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Outer pulse ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gold/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                {/* Inner pulse ring */}
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gold/30"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.2, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3 + 0.2,
                  }}
                />
                {/* Core marker */}
                <div className="relative w-4 h-4 rounded-full bg-gold shadow-[0_0_20px_hsl(42,55%,58%)] cursor-pointer group">
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-cardstock px-4 py-2 rounded shadow-royal whitespace-nowrap">
                      <span className="font-royal text-sm text-espresso tracking-wide">
                        {location.name}
                      </span>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-cardstock" />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold/40" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold/40" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold/40" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold/40" />
          </div>
        </ScrollReveal>

        {/* Location Cards */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 max-w-5xl mx-auto" staggerDelay={0.1}>
          {locations.map((location) => (
            <StaggerItem key={location.name}>
              <div className="text-center p-4 border border-gold/20 bg-espresso-dark/50 hover:border-gold/40 transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-gold mx-auto mb-3" />
                <span className="font-body text-sm text-sand/80 tracking-wide">
                  {location.name}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default LocationsSection;
