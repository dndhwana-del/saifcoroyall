import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Maximize2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import CalligraphyAccent from "./CalligraphyAccent";
import FullscreenMapExplorer from "./FullscreenMapExplorer";

interface LocationMarker {
  name: string;
  position: { top: string; left: string };
  description: string;
  avgPrice: string;
  properties: number;
  availableUnits: number;
  backgroundImage: string;
}

const LocationsSection = () => {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const locations: LocationMarker[] = [
    {
      name: "Palm Jumeirah",
      position: { top: "35%", left: "25%" },
      description: "Iconic waterfront living",
      avgPrice: "AED 85M",
      properties: 12,
      availableUnits: 3,
      backgroundImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80",
    },
    {
      name: "Downtown Dubai",
      position: { top: "45%", left: "55%" },
      description: "Heart of the metropolis",
      avgPrice: "AED 65M",
      properties: 8,
      availableUnits: 5,
      backgroundImage: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=80",
    },
    {
      name: "Emirates Hills",
      position: { top: "28%", left: "68%" },
      description: "The Beverly Hills of Dubai",
      avgPrice: "AED 120M",
      properties: 15,
      availableUnits: 2,
      backgroundImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80",
    },
    {
      name: "The Pearl, Doha",
      position: { top: "65%", left: "78%" },
      description: "Qatar's luxury island",
      avgPrice: "AED 95M",
      properties: 6,
      availableUnits: 4,
      backgroundImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
    },
  ];

  // Default abstract background
  const defaultBackground = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80";

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Cinematic Video-Style Background Container */}
      <div className="absolute inset-0">
        {/* Default Background with Slow Zoom */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: activeLocation ? 1 : 1.1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${defaultBackground})` }}
          />
        </motion.div>

        {/* Location-Specific Background with Cross-Fade */}
        <AnimatePresence>
          {activeLocation && (
            <motion.div
              key={activeLocation}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 1, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" }
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${locations.find(l => l.name === activeLocation)?.backgroundImage})` 
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dark Gold/Brown Gradient Overlay (80% opacity) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              135deg,
              hsla(8, 27%, 12%, 0.85) 0%,
              hsla(30, 40%, 15%, 0.80) 50%,
              hsla(8, 27%, 10%, 0.90) 100%
            )`
          }}
        />

        {/* Gold Dust Particle Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20],
                x: [-10, 10],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Seamless pattern continuation */}
      <div className="absolute inset-0 mashrabiya-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <CalligraphyAccent className="mx-auto mb-6 w-32 h-8" />
          <h2 className="text-3xl md:text-5xl font-royal mb-4 text-primary drop-shadow-[0_2px_10px_hsla(42,55%,58%,0.3)]">
            Prime Coordinates
          </h2>
          <p className="font-body text-lg text-secondary/70 leading-relaxed">
            Our portfolio spans the most coveted addresses across the Arabian Gulf
          </p>
        </ScrollReveal>

        {/* Command Center Map Container */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-5xl mx-auto">
            {/* Map Frame with Enhanced Border */}
            <div className="relative border-2 border-primary/40 p-2 shadow-[0_0_60px_-20px_hsla(42,55%,58%,0.4)]">
              <div className="border border-primary/20 p-1">
                {/* Map Area */}
                <div className="relative aspect-[16/9] bg-foreground/40 backdrop-blur-sm overflow-hidden">
                  {/* Enhanced Map Grid Pattern */}
                  <div 
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, hsl(var(--primary) / 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--primary) / 0.4) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                  
                  {/* Decorative Coastline SVG */}
                  <svg 
                    className="absolute inset-0 w-full h-full opacity-40" 
                    viewBox="0 0 800 450" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="lineGradientV2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                        <stop offset="50%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(42, 55%, 58%)" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    <path
                      d="M0,200 Q100,180 200,220 T400,200 T600,240 T800,200 L800,450 L0,450 Z"
                      fill="hsl(var(--primary) / 0.1)"
                      stroke="hsl(var(--primary) / 0.5)"
                      strokeWidth="1"
                      filter="url(#glow)"
                    />
                    <path
                      d="M0,280 Q150,260 300,300 T500,270 T700,290 T800,260 L800,450 L0,450 Z"
                      fill="hsl(var(--primary) / 0.08)"
                      stroke="hsl(var(--primary) / 0.3)"
                      strokeWidth="0.5"
                    />
                    
                    {/* Animated Connecting Lines */}
                    <motion.path
                      d="M200,157 Q350,180 440,202"
                      fill="none"
                      stroke="url(#lineGradientV2)"
                      strokeWidth="1"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <motion.path
                      d="M440,202 Q500,150 544,126"
                      fill="none"
                      stroke="url(#lineGradientV2)"
                      strokeWidth="1"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 1.3 }}
                    />
                    <motion.path
                      d="M544,126 Q600,200 624,292"
                      fill="none"
                      stroke="url(#lineGradientV2)"
                      strokeWidth="1"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 1.6 }}
                    />
                    <motion.path
                      d="M200,157 Q400,250 624,292"
                      fill="none"
                      stroke="url(#lineGradientV2)"
                      strokeWidth="1"
                      filter="url(#glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 2.5, delay: 1.9 }}
                    />
                  </svg>

                  {/* Location Markers with Enhanced Effects */}
                  {locations.map((location, index) => (
                    <HolographicMarker
                      key={location.name}
                      location={location}
                      index={index}
                      isActive={activeLocation === location.name}
                      onHover={() => setActiveLocation(location.name)}
                      onLeave={() => setActiveLocation(null)}
                    />
                  ))}

                  {/* Compass Rose */}
                  <div className="absolute bottom-6 right-6 opacity-50">
                    <motion.svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 60 60" 
                      className="text-primary"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M30,5 L33,25 L30,15 L27,25 Z" fill="currentColor" opacity="0.8" />
                      <path d="M30,55 L33,35 L30,45 L27,35 Z" fill="currentColor" opacity="0.4" />
                      <path d="M5,30 L25,27 L15,30 L25,33 Z" fill="currentColor" opacity="0.4" />
                      <path d="M55,30 L35,27 L45,30 L35,33 Z" fill="currentColor" opacity="0.4" />
                      <text x="30" y="3" textAnchor="middle" fontSize="6" fill="currentColor" className="font-royal">N</text>
                    </motion.svg>
                  </div>

                  {/* Map Title Cartouche */}
                  <div className="absolute top-6 left-6">
                    <motion.div 
                      className="border border-primary/40 bg-foreground/60 backdrop-blur-md px-4 py-2"
                      whileHover={{ borderColor: "hsla(42, 55%, 58%, 0.8)" }}
                    >
                      <p className="font-royal text-xs tracking-[0.2em] text-primary/90 uppercase">
                        Arabian Gulf Region
                      </p>
                    </motion.div>
                  </div>

                  {/* Fullscreen Button */}
                  <motion.button
                    className="absolute top-6 right-6 w-10 h-10 border border-primary/40 bg-foreground/60 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/60 transition-colors z-30"
                    onClick={() => setIsFullscreen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Open Fullscreen Map Explorer"
                  >
                    <Maximize2 size={16} />
                  </motion.button>

                  {/* Active Location Indicator */}
                  <AnimatePresence>
                    {activeLocation && (
                      <motion.div
                        className="absolute bottom-6 left-6 flex items-center gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="font-body text-sm text-primary/80">
                          Viewing: {activeLocation}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-primary/50" />
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
                onHoverStart={() => setActiveLocation(location.name)}
                onHoverEnd={() => setActiveLocation(null)}
              >
                <motion.div 
                  className="w-2.5 h-2.5 bg-primary rounded-full relative"
                  animate={{ 
                    boxShadow: activeLocation === location.name 
                      ? ["0 0 0px hsla(42,55%,58%,0)", "0 0 20px hsla(42,55%,58%,1)", "0 0 0px hsla(42,55%,58%,0)"]
                      : ["0 0 0px hsla(42,55%,58%,0)", "0 0 12px hsla(42,55%,58%,0.8)", "0 0 0px hsla(42,55%,58%,0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className={`font-body text-sm transition-colors ${
                  activeLocation === location.name ? 'text-primary' : 'text-secondary/60 group-hover:text-primary'
                }`}>
                  {location.name}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Map Explorer Modal */}
      <FullscreenMapExplorer
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        locations={locations}
        initialLocation={activeLocation}
      />
    </section>
  );
};

// Holographic Marker Component with 3D Tilt Effect
interface HolographicMarkerProps {
  location: LocationMarker;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const HolographicMarker = ({ location, index, isActive, onHover, onLeave }: HolographicMarkerProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 20, y: x * -20 });
  }, []);

  const handleMouseEnter = () => {
    onHover();
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);
  };

  const handleMouseLeave = () => {
    onLeave();
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="absolute group cursor-pointer z-20"
      style={{ top: location.position.top, left: location.position.left }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.15, duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ripple/Shockwave Effect on Hover */}
      <AnimatePresence>
        {showRipple && (
          <>
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 -m-2 rounded-full border-2 border-primary/60"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 4 + ring, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: ring * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Pulsing Concentric Rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute inset-0 -m-4 rounded-full border border-primary/30"
          animate={{
            scale: [1, 2 + ring * 0.5, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2 + ring * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2 + ring * 0.15,
          }}
        />
      ))}
      
      {/* Marker Dot with Enhanced Glow */}
      <motion.div 
        className="relative w-4 h-4 bg-primary rounded-full transition-transform duration-300"
        style={{
          boxShadow: isActive 
            ? '0 0 30px 10px hsla(42, 55%, 58%, 0.8)' 
            : '0 0 25px 6px hsla(42, 55%, 58%, 0.6)',
        }}
        animate={isActive ? { scale: 1.5 } : { scale: 1 }}
      />
      
      {/* Holographic 3D Glass Card Tooltip */}
      <motion.div 
        ref={cardRef}
        className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-auto z-30"
        style={{
          perspective: "1000px",
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
        }}
        initial={{ opacity: 0, x: -20, scale: 0.9 }}
        animate={isActive ? { 
          opacity: 1, 
          x: 0, 
          scale: 1,
        } : { 
          opacity: 0, 
          x: -20, 
          scale: 0.9 
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          className="relative min-w-[240px] overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Glass Background */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              background: "hsla(8, 27%, 12%, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
            }}
          />
          
          {/* Holographic Shimmer Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(
                ${135 + tilt.y * 2}deg,
                transparent 0%,
                hsla(42, 55%, 70%, 0.1) 45%,
                hsla(42, 55%, 80%, 0.15) 50%,
                hsla(42, 55%, 70%, 0.1) 55%,
                transparent 100%
              )`,
            }}
          />
          
          {/* Card Content */}
          <div className="relative p-5 rounded-lg">
            {/* Header with Live Pulse */}
            <div className="flex items-center justify-between mb-2">
              <p className="font-royal text-base text-primary tracking-wide">
                {location.name}
              </p>
              {/* Live Pulse Indicator */}
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(74, 222, 128, 0.7)",
                      "0 0 0 4px rgba(74, 222, 128, 0)",
                      "0 0 0 0 rgba(74, 222, 128, 0)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-body text-[10px] text-green-400 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>
            
            <p className="font-display text-xs text-secondary/60 italic mb-4">
              {location.description}
            </p>
            
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-4" />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">
                  Avg. Price
                </p>
                <p className="font-royal text-lg text-primary">
                  {location.avgPrice}
                </p>
              </div>
              <div className="text-right">
                <p className="font-body text-[10px] text-secondary/50 uppercase tracking-wider mb-1">
                  Listings
                </p>
                <p className="font-royal text-lg text-secondary">
                  {location.properties}
                </p>
              </div>
            </div>

            {/* Available Units Badge */}
            <div 
              className="flex items-center justify-center gap-2 py-2 rounded"
              style={{
                background: "hsla(42, 55%, 58%, 0.1)",
                border: "1px solid hsla(42, 55%, 58%, 0.2)",
              }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="font-body text-xs text-primary">
                Available Units: {location.availableUnits}
              </span>
            </div>
          </div>
          
          {/* Arrow Connector */}
          <div 
            className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-4 h-4 rotate-45"
            style={{
              background: "hsla(8, 27%, 12%, 0.7)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(212, 175, 55, 0.3)",
              borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LocationsSection;
